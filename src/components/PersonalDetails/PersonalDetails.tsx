import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Button,
  Grid,
  Container,
  ThemeProvider,
  CircularProgress,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { GreenRadio, GreenButton } from '../FormControl/FormControl';
import { IAddress } from '../../interfaces/address.interface';
import { Theme } from '../../Theme';

import { loadDataService } from '../../services/loadDataService';

import { buttonStyles } from '../../common/Styles';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import './PersonalDetails.css';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';

import { FormSteps, REQUIREDFIELD } from '../../constant/constants';

interface IPersonalDetails {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (input: string) => (e: any) => void;
  handleDataInput: (input: string, dataItem: string) => void;
  handleStatePostalCode: (input: string, value: string) => void;
  values: any;
}

enum FormFields {
  FirstName = 'firstName',
  LastName = 'lastName',
  Phone = 'phone',
  Gender = 'gender',
  Email = 'email',
  StreetAddress = 'streetAddress',
  StreetAddress2 = 'streetAddress2',
  City = 'city',
  State = 'state',
  Postcode = 'postcode',
  DateOfBirth = 'dateOfBirth',
}

enum ValidationTypes {
  PATTERN = 'PATTERN',
  REQUIRED = 'REQUIRED',
}

const PersonalDetails = (props: IPersonalDetails) => {
  const buttonClasses = buttonStyles();
  const [address, setAddress] = useState<IAddress[]>([]);
  const [city, setCity] = useState(props.values.city);
  const [state, setState] = useState(props.values.state);
  const [postCode, setPostCode] = useState(props.values.postcode);
  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    streetAddress: true,
    state: true,
    city: true,
    postcode: true,
    dateOfBirth: true,
  });

  // autocomplete function
  const [changedAddress, setChangedAddress] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextButtoneClicked, setNextButtoneClicked] = useState(false);

  const handleDateChange = (date: any) => {
    props.handleDataInput('dateOfBirth', date);
    setChangedAddress(true);
  };

  const setCityState = (newInputValue: any) => {
    setCity(newInputValue ? newInputValue.name : '');
    setOpen(false);
    let state = '';
    let postcode = '';
    let city = '';
    let suburbId = 0;
    if (newInputValue) {
      state = newInputValue.state;
      postcode = newInputValue.postcode;
      city = newInputValue.name;
      suburbId = newInputValue.id;
    }
    setState(state);
    setPostCode(postcode);
    props.handleChange('state')({ target: { value: state } });
    props.handleChange('postcode')({ target: { value: postcode } });
    props.handleChange('city')({ target: { value: city } });
    props.handleChange('suburbId')({ target: { value: suburbId.toString() } });
    setChangedAddress(true);
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    props.prevStep();
  };

  const validateField = (fieldName: string): boolean => {
    let isValid = true;
    if (
      props.values[fieldName] &&
      props.values[fieldName] !== '' &&
      props.values[fieldName].toString().trim().length > 0
    ) {
      setValidation((preState) => ({ ...preState, [fieldName]: isValid }));
      return true;
    } else {
      isValid = false;
      setValidation((preState) => ({ ...preState, [fieldName]: isValid }));
      return false;
    }
  };

  const inputValidation = (): boolean => {
    let isValid = true;

    isValid = validateField('firstName') && isValid;
    isValid = validateField('lastName') && isValid;
    isValid = validateField('phone') && isValid;
    isValid = validateField('email') && isValid;
    isValid = validateField('streetAddress') && isValid;
    isValid = validateField('dateOfBirth') && isValid;
    isValid = validateField('city') && isValid;
    isValid = validateField('state') && isValid;
    isValid = validateField('postcode') && isValid;
    return isValid;
  };

  const handleNext = (e: any) => {
    e.preventDefault();

    if (inputValidation()) {
      setNextButtoneClicked(true);
      props.nextStep();
    }
  };

  const handleChange = (
    input: FormFields,
    validationTypes: {
      type: ValidationTypes;
      pattern?: any;
    }
  ) => (e: any) => {
    let value = true;
    switch (validationTypes.type) {
      case ValidationTypes.REQUIRED:
        value = e.target.value.length > 1;
        setValidation((preState) => ({ ...preState, [input]: value }));
        break;
      case ValidationTypes.PATTERN:
        value = validationTypes.pattern.test(e.target.value);
        setValidation((preState) => ({ ...preState, [input]: value }));
        break;
      default:
        break;
    }

    props.handleChange(input)(e);
  };

  const fetchAddress = (e: any) => {
    if (e === null || e === undefined) return undefined;

    setCity(e.target.value);

    if (!e.target.value || e.target.value.length <= 2 || e.target.value === 0) {
      return undefined;
    }
    setOpen(true);
    (async () => {
      setLoading(true);
      await loadDataService.loadAddress(e.target.value).then((response) => {
        setLoading(false);
        if (response.suburbs.length === 0) {
          setOpen(false);
        }
        setAddress(response.suburbs);
      });
    })();
  };

  useEffect(() => {
    if (!open) {
      setAddress([]);
    }

    if (changedAddress) {
      // vaildate field
      validateField('state');
      validateField('postcode');
      validateField('city');
      validateField('dateOfBirth');
      setChangedAddress(false);
    }
  }, [open, changedAddress]);

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="lg">
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3">Personal Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Please enter the following information.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="first-name"
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  required={true}
                  error={!validation.firstName}
                  helperText={!validation.firstName && REQUIREDFIELD}
                  onChange={handleChange(FormFields.FirstName, {
                    type: ValidationTypes.REQUIRED,
                  })}
                  defaultValue={props.values.firstName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  required={true}
                  error={!validation.lastName}
                  helperText={!validation.lastName && REQUIREDFIELD}
                  onChange={handleChange(FormFields.LastName, {
                    type: ValidationTypes.REQUIRED,
                  })}
                  defaultValue={props.values.lastName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    onChange={handleChange(FormFields.Gender, {
                      type: ValidationTypes.REQUIRED,
                    })}
                    defaultValue={props.values.gender}
                  >
                    <FormControlLabel
                      value="F"
                      control={<GreenRadio />}
                      label="Female"
                      className={buttonClasses.radioButton}
                    />
                    <FormControlLabel
                      value="M"
                      control={<GreenRadio />}
                      label="Male"
                      className={buttonClasses.radioButton}
                    />

                    <FormControlLabel
                      value="X"
                      control={<GreenRadio />}
                      label="Other or prefer not to answer"
                      className={buttonClasses.radioButton}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  required={true}
                  error={!validation.phone}
                  helperText={
                    !validation.phone &&
                    '* Please provide a valid phone number, e.g. 0402003001'
                  }
                  onChange={handleChange(FormFields.Phone, {
                    type: ValidationTypes.PATTERN,
                    pattern: /^0\d{9}$/,
                  })}
                  defaultValue={props.values.phone}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="Email"
                  required={true}
                  variant="outlined"
                  error={!validation.email}
                  helperText={
                    !validation.email &&
                    '* Please provide a valid email address'
                  }
                  onChange={handleChange(FormFields.Email, {
                    type: ValidationTypes.PATTERN,
                    pattern: /^[^@\s]+@[^@\s]+$/,
                  })}
                  defaultValue={props.values.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="address-line-1"
                  label="Address Line 1"
                  required={true}
                  variant="outlined"
                  error={!validation.streetAddress}
                  helperText={
                    !validation.streetAddress &&
                    '* Please provide a valid address'
                  }
                  onChange={handleChange(FormFields.StreetAddress, {
                    type: ValidationTypes.REQUIRED,
                  })}
                  defaultValue={props.values.streetAddress}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="address-line-2"
                  label="Address Line 2"
                  variant="outlined"
                  onChange={handleChange(FormFields.StreetAddress2, {
                    type: ValidationTypes.REQUIRED,
                  })}
                  defaultValue={props.values.streetAddress2}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="addressAutoComplete"
                  open={open}
                  value={city}
                  inputValue={city}
                  style={{ top: 'unset' }}
                  onInputChange={(event, newInputValue: any) => {
                    fetchAddress(event);
                    setCity(newInputValue);
                  }}
                  onChange={(event, newInputValue: any) => {
                    setCityState(newInputValue);
                  }}
                  getOptionSelected={(option, value) => {
                    return option.id === value.id;
                  }}
                  getOptionLabel={(option: any) =>
                    option.name ? option.name : option
                  }
                  renderOption={(option: any, state: any) =>
                    option.name + ' ' + option.state + ' ' + option.postcode
                  }
                  options={address}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="City / Suburb"
                      variant="outlined"
                      required={true}
                      error={!validation.city}
                      helperText={!validation.city && REQUIREDFIELD}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="state"
                  label="State"
                  variant="outlined"
                  onChange={handleChange(FormFields.State, {
                    type: ValidationTypes.REQUIRED,
                  })}
                  error={!validation.state}
                  helperText={!validation.state && REQUIREDFIELD}
                  defaultValue={props.values.state}
                  value={state}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="postcode"
                  label="Postcode"
                  variant="outlined"
                  onChange={handleChange(FormFields.Postcode, {
                    type: ValidationTypes.REQUIRED,
                  })}
                  error={!validation.postcode}
                  helperText={!validation.postcode && REQUIREDFIELD}
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={props.values.postcode}
                  value={postCode || ''}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    required={true}
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of Birth (DD/MM/YYYY)"
                    format="dd/MM/yyyy"
                    value={props.values.dateOfBirth}
                    error={!validation.dateOfBirth}
                    helperText={
                      !validation.dateOfBirth && '* Please select date'
                    }
                    onChange={handleDateChange}
                    fullWidth
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  * Please fill out required fields
                </Typography>
              </Grid>

              <Grid
                container
                spacing={8}
                justify="space-between"
                className={buttonClasses.paddingBottom}
              >
                <Grid item xs={6} md={4} lg={3}>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleBack}
                    className={buttonClasses.backButton}
                    fullWidth
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <GreenButton
                    size="large"
                    variant="contained"
                    className={buttonClasses.nextButton}
                    fullWidth
                    onClick={handleNext}
                  >
                    Next
                  </GreenButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(PersonalDetails, DefaultLayout, {
  Step: FormSteps.PersonalDetails,
});

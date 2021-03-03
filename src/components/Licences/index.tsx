import React, { useState, useEffect } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Grid,
  Container,
  ThemeProvider,
  Typography,
  Checkbox,
  Radio,
  makeStyles,
} from '@material-ui/core';
import { IFormValue } from '../../interfaces/formValue.interface';
import { Theme } from '../../Theme';
import ThreeButtonsGroup from '../FormControl/ThreeButtonsGroup';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';

interface ILicencesProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleCheckbox: (input: string) => (e: any) => void;
  handleChange: (input: string) => (e: any) => void;
  resetFormControl: (input: string) => void;
  formValues: IFormValue[];
  values: any;
}
const useStyles = makeStyles((theme) => ({
  paddingLeft: {
    paddingLeft: '11px',
  },
}));

const Licences = (props: ILicencesProps) => {
  const [displayList, setDisplayList] = useState<IFormValue[]>([]);

  useEffect(() => {
    setDisplayList(props.formValues);
  }, []);

  useEffect(() => {
    if (!props.values.driverLicence) props.resetFormControl('licenceType');
  }, [props.values.driverLicence]);

  const handleNext = () => {
    props.nextStep();
  };

  const handleBack = () => {
    props.prevStep();
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Licences</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                Please indicate whether you have the following licence. If none,
                skip.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.values.driverLicence}
                    onChange={props.handleCheckbox('driverLicence')}
                    name="driverLicence"
                    color="primary"
                  />
                }
                label="Valid Australian driver licence"
              />
            </Grid>

            {props.values.driverLicence && (
              <Grid item xs={12} container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Please select the class of licence you have:
                  </Typography>
                </Grid>
                <FormControl
                  component="fieldset"
                  fullWidth
                  className={classes.paddingLeft}
                >
                  <RadioGroup
                    row
                    aria-label="modelling"
                    name="licence"
                    onChange={props.handleChange('licenceType')}
                    defaultValue={props.values.licenceType}
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="C"
                        control={<Radio color="primary" />}
                        label="Car licence"
                        // className={classes.radioButton}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="LR"
                        control={<Radio color="primary" />}
                        label="Light Rigid"
                        // className={classes.radioButton}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="MR"
                        control={<Radio color="primary" />}
                        label="Medium Rigid"
                        // className={classes.radioButton}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="HR"
                        control={<Radio color="primary" />}
                        label="Heavy Rigid"
                        // className={classes.radioButton}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlLabel
                        value="HC"
                        control={<Radio color="primary" />}
                        label="Heavy Combination"
                        // className={classes.radioButton}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlLabel
                        value="MC"
                        control={<Radio color="primary" />}
                        label="Multi Combination"
                        // className={classes.radioButton}
                      />
                    </Grid>
                  </RadioGroup>
                </FormControl>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.values.ownsCar}
                        onChange={props.handleCheckbox('ownsCar')}
                        name="ownsCar"
                        color="primary"
                      />
                    }
                    label="I have regular access to a car"
                  />
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h5">
                Please indicate whether you have the following induction cards.
                If none, skip.
              </Typography>
            </Grid>

            {displayList.map((item: IFormValue) => {
              return (
                <Grid item xs={12} md={6} key={item.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          props.values[item.id] ? props.values[item.id] : false
                        }
                        onChange={props.handleCheckbox(item.id)}
                        name={item.id}
                        color="primary"
                      />
                    }
                    label={item.label}
                  />
                </Grid>
              );
            })}

            <ThreeButtonsGroup
              nextStep={handleNext}
              prevStep={handleBack}
              saveAndExit={props.saveAndExit}
            />
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(Licences, DefaultLayout, {
  Step: FormSteps.Licences,
});

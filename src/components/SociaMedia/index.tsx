import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  ThemeProvider,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { IFormValue } from '../../interfaces/formValue.interface';
import ThreeButtonsGroup from '../../components/FormControl/ThreeButtonsGroup';

import { marginStyles } from '../../common/Styles';

import { Theme } from '../../Theme';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps, REQUIREDFIELD } from '../../constant/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paddingZero: {
    padding: '0 !important',
  },
}));

interface ISocialMediaProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleChange: (input: string) => (e: any) => void;
  formValues: IFormValue[];
  values: any;
}

const SocialMedia = (props: ISocialMediaProps) => {
  const [displayList, setDisplayList] = useState<IFormValue[]>([]);
  const [isSelectInputInvalid, setIsSelectInputInvalid] = useState(false);
  const marginClasses = marginStyles();
  const classes = useStyles();

  useEffect(() => {
    setDisplayList(props.formValues);
  }, []);
  useEffect(() => {
    if (props.values.referrer) setIsSelectInputInvalid(false);
  }, [props.values.referrer]);

  const handleNext = () => {
    if (props.values.referrer) {
      props.nextStep();
    } else {
      setIsSelectInputInvalid(true);
    }
  };

  const handleBack = () => {
    props.prevStep();
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Social Media</Typography>

              <Typography variant="h5" className={marginClasses.marginTop}>
                If you’d like to share your social media handles, please do so
                here.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="instagram"
                label="Instagram Handle"
                variant="outlined"
                onChange={props.handleChange('instagram')}
                defaultValue={props.values.instagram}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="tikTok"
                label="TikTok Handle"
                variant="outlined"
                onChange={props.handleChange('tikTok')}
                defaultValue={props.values.tikTok}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="linkedIn"
                label="LinkedIn URL"
                variant="outlined"
                onChange={props.handleChange('linkedIn')}
                defaultValue={props.values.linkedIn}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="facebook"
                label="Facebook URL"
                variant="outlined"
                onChange={props.handleChange('facebook')}
                defaultValue={props.values.facebook}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" className={marginClasses.marginTop}>
                How did you hear about us?
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                value={props.values.referrer}
                onChange={props.handleChange('referrer')}
                variant="outlined"
                label="Please select"
                error={isSelectInputInvalid}
                helperText={isSelectInputInvalid && REQUIREDFIELD}
                select
                fullWidth
              >
                {displayList.map((item: IFormValue) => {
                  return <MenuItem value={item.label}>{item.label}</MenuItem>;
                })}
              </TextField>
            </Grid>

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

export default withLayout(SocialMedia, DefaultLayout, {
  Step: FormSteps.SocialMedia,
});

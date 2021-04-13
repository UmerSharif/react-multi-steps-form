import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Grid,
  Checkbox,
  Container,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { IFormValue } from 'src/interfaces/formValue.interface';
import ThreeButtonsGroup from 'src/components/FormControl/ThreeButtonsGroup';

import { marginStyles } from 'src/common/Styles';

import { Theme } from 'src/Theme';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from 'src/components/Layout/Default';
import { FormSteps } from 'src/constant/constants';

interface ICertificatesProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleCheckbox: (input: string) => (e: any) => void;
  formValues: IFormValue[];
  values: any;
}

const Certificates = (props: ICertificatesProps) => {
  const [displayList, setDisplayList] = useState<IFormValue[]>([]);
  const marginClasses = marginStyles();

  useEffect(() => {
    setDisplayList(props.formValues);
  }, []);

  const handleNext = () => {
    props.nextStep();
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
              <Typography variant="h3">Certificates</Typography>

              <Typography variant="h5" className={marginClasses.marginTop}>
                Please select all of the certificates that you currently hold.
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

export default withLayout(Certificates, DefaultLayout, {
  Step: FormSteps.Certificates,
});

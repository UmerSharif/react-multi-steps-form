import React, { useState, useEffect } from 'react';
import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Grid,
  Container,
  ThemeProvider,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IFormValue } from '../../interfaces/formValue.interface';
import ThreeButtonsGroup from '../FormControl/ThreeButtonsGroup';
import { marginStyles } from '../../common/Styles';
import { Theme } from '../../Theme';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';

const useStyles = makeStyles((theme) => ({
  radioButton: {
    [theme.breakpoints.down('md')]: { margin: 0, width: '100%' },
    [theme.breakpoints.up('md')]: { margin: 0, width: '50%' },
  },
}));

interface IQualificationsProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleChange: (input: string) => (e: any) => void;
  formValues: IFormValue[];
  values: any;
}

const Qualifications = (props: IQualificationsProps) => {
  const [displayList, setDisplayList] = useState<IFormValue[]>([]);
  const marginClasses = marginStyles();
  const classes = useStyles();

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
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Qualifications</Typography>
              <Typography variant="h5" className={marginClasses.marginTop}>
                Please select your level of interest or qualification in each
                category.
              </Typography>
            </Grid>

            {displayList.map((item: IFormValue) => {
              return (
                <Grid item xs={12} lg={6} key={item.id}>
                  <Accordion key={item.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="body1">{item.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                          row
                          aria-label="modelling"
                          name={item.id}
                          onChange={props.handleChange(item.id)}
                          defaultValue={
                            props.values[item.id] ? props.values[item.id] : ''
                          }
                        >
                          <FormControlLabel
                            value="None"
                            control={<Radio color="primary" />}
                            label="None"
                            className={classes.radioButton}
                          />
                          <FormControlLabel
                            value="I am interested"
                            control={<Radio color="primary" />}
                            label="I’m interested"
                            className={classes.radioButton}
                          />
                          <FormControlLabel
                            value="I am seeking a qualification"
                            control={<Radio color="primary" />}
                            label="I’m seeking a qualification"
                            className={classes.radioButton}
                          />
                          <FormControlLabel
                            value="I am currently qualified"
                            control={<Radio color="primary" />}
                            label="I’m currently qualified"
                            className={classes.radioButton}
                          />
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
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

export default withLayout(Qualifications, DefaultLayout, {
  Step: FormSteps.Qualifications,
});

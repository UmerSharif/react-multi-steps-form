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
import TextField from '@material-ui/core/TextField';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IFormValue } from 'src/interfaces/formValue.interface';

import ThreeButtonsGroup from 'src/components/FormControl/ThreeButtonsGroup';
import { marginStyles } from 'src/common/Styles';
import { Theme } from 'src/Theme';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from 'src/constant/constants';

const useStyles = makeStyles((theme) => ({
  radioButton: {
    [theme.breakpoints.up('xs')]: { margin: 0, width: '50%' },
    [theme.breakpoints.up('sm')]: { margin: 0, width: '33%' },
  },
}));

interface IExperienceProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleChange: (input: string) => (e: any) => void;
  formValues: IFormValue[];
  values: any;
}

const Experience = (props: IExperienceProps) => {
  const [displayList, setDisplayList] = useState<IFormValue[]>([]);
  const classes = useStyles();
  const marginClasses = marginStyles();

  useEffect(() => {
    setDisplayList(props.formValues);
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3">Experience</Typography>

                <Typography variant="h5" className={marginClasses.marginTop}>
                  Please select your level of experience with the following
                  options.
                </Typography>
              </Grid>

              {displayList.map((item: IFormValue) => {
                return (
                  <Grid item xs={12} md={6} key={item.id}>
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
                              value="A little bit"
                              control={<Radio color="primary" />}
                              label="A little bit"
                              className={classes.radioButton}
                            />
                            <FormControlLabel
                              value="A lot"
                              control={<Radio color="primary" />}
                              label="A lot"
                              className={classes.radioButton}
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                );
              })}

              <Grid item xs={12}>
                <Typography variant="h5">
                  If you would like to add more details about this experience,
                  please do so here.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="experienceNotes"
                  label="160 characters max."
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 160 }}
                  defaultValue={
                    props.values.experienceNotes
                      ? props.values.experienceNotes
                      : ''
                  }
                  variant="outlined"
                  onChange={props.handleChange('experienceNotes')}
                  fullWidth
                />
              </Grid>

              <ThreeButtonsGroup
                nextStep={props.nextStep}
                prevStep={props.prevStep}
                saveAndExit={props.saveAndExit}
              />
            </Grid>
          </form>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(Experience, DefaultLayout, {
  Step: FormSteps.Experience,
});

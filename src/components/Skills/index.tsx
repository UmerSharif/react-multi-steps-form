import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Grid,
  Checkbox,
  Container,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import ThreeButtonsGroup from '../../components/FormControl/ThreeButtonsGroup';
import { IFormValue } from '../../interfaces/formValue.interface';
import { marginStyles } from '../../common/Styles';
import { Theme } from '../../Theme';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';

interface ISkillsProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleCheckbox: (input: string) => (e: any) => void;
  formValues: IFormValue[];
  values: any;
}

const Skills = (props: ISkillsProps) => {
  const [displayList, setDisplayList] = useState<IFormValue[]>([]);
  const marginClasses = marginStyles();
  console.log('----props=', props);
  useEffect(() => {
    setDisplayList(props.formValues);
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Skills</Typography>

              <Typography variant="h5" className={marginClasses.marginTop}>
                Please choose as many of the skills below that apply to you.
              </Typography>
            </Grid>
            {displayList.map((item: IFormValue) => {
              return (
                <Grid item xs={6} key={item.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          props.values[item.id] ? props.values[item.id] : false
                        }
                        onChange={(e) => props.handleCheckbox(item.id)(e)}
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
              nextStep={props.nextStep}
              prevStep={props.prevStep}
              saveAndExit={props.saveAndExit}
            />
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(Skills, DefaultLayout, { Step: FormSteps.Skills });

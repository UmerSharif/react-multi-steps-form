import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { buttonStyles } from '../../common/Styles';

const useStyles = makeStyles((theme) => ({
  buttonOrder: {
    [theme.breakpoints.up('sm')]: {
      order: '0',
    },
    [theme.breakpoints.up('md')]: {
      order: '2',
    },
  },
}));

const ThreeButtonsGroup = (props: any) => {
  const buttonClasses = buttonStyles();
  const classes = useStyles();

  const handleNext = () => {
    props.nextStep();
  };

  const handleBack = () => {
    props.prevStep();
  };

  const handleSave = () => {
    props.saveAndExit();
  };

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      className={buttonClasses.paddingBottom}
    >
      <Grid item xs={12}></Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Button
          size="large"
          variant="outlined"
          className={buttonClasses.backButton}
          fullWidth
          onClick={handleBack}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={6} md={4} xl={3} className={classes.buttonOrder}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={buttonClasses.nextButton}
          fullWidth
          disabled={props.nextButtonDisabled ? props.nextButtonDisabled : false}
          onClick={handleNext}
        >
          Next
        </Button>
      </Grid>
      <Grid item xs={6} md={4} xl={3}>
        <Button
          size="large"
          variant="outlined"
          className={buttonClasses.yellowButton}
          fullWidth
          onClick={handleSave}
        >
          Save & Exit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ThreeButtonsGroup;

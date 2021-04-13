import React from 'react';
import { Grid, Container, ThemeProvider, Typography } from '@material-ui/core';
import { GreenButton } from '../FormControl/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '../../Theme';
import './Welcome.css';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';

interface IWelcome {
  nextStep: () => void;
  handleChange: (input: string) => (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
  bottomButton: {
    width: '100%',
  },
  nextButton: {
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      position: 'relative',
      width: '173px',
      float: 'right',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: 0,
      position: 'absolute',
      bottom: '30px',
      right: '50px',
      width: '173px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(2),
      marginBottom: 0,
      position: 'absolute',
      bottom: '30px',
      right: '200px',
      width: '173px',
    },
  },
}));

const Welcome = (props: IWelcome) => {
  const classes = useStyles();

  const handleNext = (e: any) => {
    e.preventDefault();
    props.nextStep();
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12}>
              <Typography variant="h3">
                Welcome to Online Registration
              </Typography>

              <p>
                Thank you for visiting Online Registration Form. To complete
                this application, we will ask a few questions about yourself and
                your background.
              </p>
              <p>
                We also ask that you <strong>provide a headshot photo</strong>,
                as well as a recorded <strong>1 min video of yourself</strong>,
                letting us know a bit about you. &nbsp;&nbsp;
                <u>
                  We recommend you have the video and photo on file before you
                  commence the application form.
                </u>
                &nbsp;This is optional but strongly suggested for the best
                outcome of your application.
              </p>
              <p>
                It will take approximately <strong>10-15 min</strong> to
                complete this application.
              </p>
              <p>When you are ready, please click Next.</p>
            </Grid>
            <div className={classes.bottomButton}>
              <GreenButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.nextButton}
                onClick={handleNext}
              >
                Next
              </GreenButton>
            </div>
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(Welcome, DefaultLayout, { Step: FormSteps.Welcome });

import React from 'react';
import { ThemeProvider, Typography } from '@material-ui/core';
import { HomePageURL } from '../../constant/constants';
import { WhiteButton } from '../FormControl/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '../../Theme';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  bottom: {
    bottom: '40px',
    right: '100px',
    position: 'absolute',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    padding: '0 20px',
  },
  content: {
    padding: '30px',
    textAlign: 'center',
    color: 'white',
  },
}));

const ThankYou = (props: any) => {
  const classes = useStyles();

  return (
    <div className="container">
      <ThemeProvider theme={Theme}>
        <div className="body">
          <Typography variant="h3" className={classes.title}>
            Thank you for your application!
          </Typography>

          <Typography variant="h5" className={classes.content}>
            We have received your information and will review it shortly.
          </Typography>

          <Typography variant="h5" className={classes.content}>
            Should your application be successful, we will be in touch with next
            steps.
          </Typography>
        </div>

        <WhiteButton
          size="large"
          variant="outlined"
          className={classes.bottom}
          fullWidth
          onClick={() => (window.location.href = HomePageURL)}
        >
          Home
        </WhiteButton>
      </ThemeProvider>
    </div>
  );
};

export default ThankYou;

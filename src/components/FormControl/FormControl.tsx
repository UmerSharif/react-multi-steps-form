import React from 'react';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Radio, Button } from '@material-ui/core';

export const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: '#71bf43',
    '&:hover': {
      backgroundColor: '#71bf43',
    },
  },
}))(Button);

export const WhiteButton = withStyles((theme) => ({
  root: {
    width: '150px',
    color: 'white',
    border: '3px solid #FFFFFF',
    boxSizing: 'border-box',
    borderRadius: '5px',
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
}))(Button);

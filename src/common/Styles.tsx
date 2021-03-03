import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { green, red, grey } from '@material-ui/core/colors';

export const buttonStyles = makeStyles((theme) => ({
  yellowButton: {
    border: '3px solid #FFCB04',
    color: '#FFCB04',
    borderRadius: '5px',
  },
  backButton: {
    border: '3px solid #00ADEF',
    color: '#00ADEF',
    borderRadius: '5px',
  },
  nextButton: {
    color: 'white',
  },
  radioButton: {
    margin: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '33%',
    },
  },
  fileUploadButton: {
    background: '#00ADEF',
    color: 'white',
    marginTop: theme.spacing(2),
  },
  paddingBottom: {
    paddingBottom: '15px',
  },
  select: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectPlaceholder: {
    color: '#000',
  },
  dropZone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageCropper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
    marginBottom: 10,
  },
  imageCropperPreview: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  imageActionButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  videoActionButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

export const marginStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));
export const textStyles = makeStyles((theme) => ({
  error: {
    color: red[700],
    fontSize: '0.75rem',
  },
  succeed: {
    color: green[500],
    padding: '20px 0 30px 20px',
  },
  warning: {
    color: grey[800],
    fontSize: '12px',
  },
}));

export const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


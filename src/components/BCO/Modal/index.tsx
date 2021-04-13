import React from 'react';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ConfirmationNumberTwoToneIcon from '@material-ui/icons/ConfirmationNumberTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import { grey, orange } from '@material-ui/core/colors';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  makeStyles,
  withStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { createStyles, useTheme } from '@material-ui/core';

import { WhiteButton } from '../../FormControl/FormControl';
import { Theme } from '../../../Theme';

export enum ModalTypes {
  ERROR = 'ERROR',
  CONFIRM = 'CONFIRM',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

interface ModalInterface {
  open: boolean;
  type: ModalTypes;
  title: string;
  content: string;
  handleClose?: () => any;
  handleConfirm?: () => any;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    CONFIRM: {
      color: grey[50],
      paddingTop: 0,
      paddingBottom: 0,
    },
    ERROR: {
      color: grey[50],
      paddingTop: 0,
      paddingBottom: 0,
    },
    SUCCESS: {
      color: grey[50],
      paddingTop: 0,
      paddingBottom: 0,
    },
    WARNING: {
      color: 'white',
      background: orange[800],
      paddingTop: 0,
      paddingBottom: 0,
    },
    icon: {
      color: grey[50],
    },
    actionButtons: {
      paddingBottom: '30px',
      justifyContent: 'center',
    },
    title: {
      color: 'white',
      textAlign: 'center',
      padding: '0 20px',
      marginTop: '20%',
    },
    content: {
      padding: '30px',
      textAlign: 'center',
      color: 'white',
    },
  })
);

let StyledDialog = withStyles({
  paper: {
    background:
      'linear-gradient(180deg, #ffcb04 0%, #71bf43 41.15%, #00adef 100%)',
  },
})(Dialog);

const iconStyle = { fontSize: 30, color: grey[50] };

const Modal = (props: ModalInterface) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let confirmButton;
  let icon;
  let defaultButtontext: string = '';

  switch (props.type) {
    case ModalTypes.ERROR:
      icon = <ErrorTwoToneIcon style={iconStyle} />;
      defaultButtontext = 'OK';
      StyledDialog = withStyles({
        paper: {
          background:
            'linear-gradient(180deg, #ff5504 0%, #bf4354 41.15%, #0076efc2 100%)',
        },
      })(Dialog);
      break;
    case ModalTypes.CONFIRM:
      StyledDialog = withStyles({
        paper: {
          background:
            'linear-gradient(180deg, #ffcb04 0%, #71bf43 41.15%, #00adef 100%)',
        },
      })(Dialog);
      confirmButton = (
        <WhiteButton onClick={props.handleConfirm} id="ok">
          OK
        </WhiteButton>
      );
      icon = <ConfirmationNumberTwoToneIcon style={iconStyle} />;
      defaultButtontext = 'CANCEL';
      break;
    case ModalTypes.WARNING:
      icon = <WarningTwoToneIcon style={iconStyle} />;
      defaultButtontext = 'OK';
      break;
    case ModalTypes.SUCCESS:
      icon = <CheckCircleTwoToneIcon style={iconStyle} />;
      defaultButtontext = 'OK';
      break;
    default:
      break;
  }
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <StyledDialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.root}
          fullScreen={fullScreen}
        >
          <DialogTitle id="alert-dialog-title" className={classes[props.type]}>
            <Typography variant="h2" className={classes.title}>
              {props.title}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="h5" className={classes.content}>
                {props.content}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actionButtons}>
            <WhiteButton onClick={props.handleClose}>
              {defaultButtontext}
            </WhiteButton>
            {confirmButton}
          </DialogActions>
        </StyledDialog>
      </ThemeProvider>
    </div>
  );
};

export default Modal;

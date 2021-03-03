import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#71bf43',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Poppins',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: [
        'Poppins',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 48,
      fontWeight: 700,
    },
    h2: {
      fontFamily: [
        'Poppins',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 36,
      fontWeight: 700,
    },
    h3: {
      fontFamily: [
        'Poppins',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 26,
      fontWeight: 700,
    },
    h4: {
      fontFamily: [
        'Poppins',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 22,
      fontWeight: 400,
    },
    h5: {
      fontFamily: [
        'Poppins',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 18,
      fontWeight: 300,
    },
    h6: {
      fontFamily: [
        'Poppins',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 15,
      fontWeight: 300,
    },
    body1: {
      fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
        ','
      ),
      fontSize: 17,
      fontWeight: 400,
    },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        width: '1.5em',
        height: '1.5em',
      },
    },
    MuiSelect: {
      icon: {
        top: 'unset'
      },
    },
    MuiAccordion: {
      root: {
        border: '0px solid rgba(0, 0, 0, .125)',
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
      },
    },
  },
});

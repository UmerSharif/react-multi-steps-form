import React from 'react';
import './styles.css';
import '../../../App.css';
import { ThemeProvider } from '@material-ui/core';
import { Theme } from '../../../Theme';

const steps = [
  'Welcome',
  'Personal Details',
  'Skills',
  'Experience',
  'Qualifications',
  'Certificates',
  'Licences',
  'Social Media',
  'Photo Upload',
  'Video Upload',
  'Terms & Conditions',
];

const SideNav = (props: any) => {
  const { Step } = props;

  const getCSSClass = (props) => {
    return `white-bar-step-${props.Step}`;
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className="nav-container">
        <div className="progress-bar-container">
          <div className="progress-bar progress-bar-color"></div>
          <div
            className={`progress-bar progress-bar-white ${getCSSClass(props)}`}
          ></div>
        </div>

        <div className="side-menu">
          {steps.map((item, index) => {
            return (
              <div className={index <= Step - 1 ? 'white-text' : 'grey-text'}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SideNav;

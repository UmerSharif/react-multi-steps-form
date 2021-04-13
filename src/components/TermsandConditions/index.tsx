import React, { useState } from 'react';
import {
  FormControlLabel,
  Grid,
  Checkbox,
  Container,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import ThreeButtonsGroup from '../../components/FormControl/ThreeButtonsGroup';
import Modal, { ModalTypes } from '../BCO/Modal';

import { marginStyles } from '../../common/Styles';

import { Theme } from '../../Theme';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';

interface ITermsandConditionsProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleCheckbox: (input: string) => (e: any) => void;
  values: any;
}

const TermsandConditions = (props: ITermsandConditionsProps) => {
  const marginClasses = marginStyles();

  const [openModal, setOpenModal] = useState(false);
  const [modalType] = useState(ModalTypes.CONFIRM);
  const [modalTitle] = useState(
    'Are you sure you want to submit your application?'
  );
  const [modalMessage] = useState(
    'Once you click OK your application will be submitted and you will NOT be able to edit it. Please make sure all your details are correct before clicking OK.'
  );

  const confirmFinish = () => {
    setOpenModal(true);
  };

  const handleNext = () => {
    setOpenModal(false);
    props.nextStep();
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleBack = () => {
    props.prevStep();
  };

  return (
    <React.Fragment>
      {openModal && (
        <Modal
          type={modalType}
          open={openModal}
          title={modalTitle}
          content={modalMessage}
          handleClose={handleCancel}
          handleConfirm={handleNext}
        />
      )}
      <ThemeProvider theme={Theme}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Terms & Conditions</Typography>

              <Typography variant="h5" className={marginClasses.marginTop}>
                Final step—please agree to the following Terms & Conditions.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.values.ageConfirmation}
                    onChange={props.handleCheckbox('ageConfirmation')}
                    name="ageConfirmation"
                    color="primary"
                  />
                }
                label="I confirm that I am over 18 years of age"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.values.personalDetailsConfirmation}
                    onChange={props.handleCheckbox(
                      'personalDetailsConfirmation'
                    )}
                    name="personalDetailsConfirmation"
                    color="primary"
                  />
                }
                label="I consent to submitting my personal details for the purpose of this application"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.values.correctInformationConfirmation}
                    onChange={props.handleCheckbox(
                      'correctInformationConfirmation'
                    )}
                    name="correctInformationConfirmation"
                    color="primary"
                  />
                }
                label="I agree that all information provided in this application is accurate and correct"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.values.rightToWorkConfirmation}
                    onChange={props.handleCheckbox('rightToWorkConfirmation')}
                    name="rightToWorkConfirmation"
                    color="primary"
                  />
                }
                label="I confirm that I have the right to work in Australia"
              />
            </Grid>

            <ThreeButtonsGroup
              nextButtonDisabled={
                !(
                  props.values.ageConfirmation &&
                  props.values.personalDetailsConfirmation &&
                  props.values.correctInformationConfirmation &&
                  props.values.rightToWorkConfirmation
                )
              }
              nextStep={confirmFinish}
              prevStep={handleBack}
              saveAndExit={props.saveAndExit}
            />
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(TermsandConditions, DefaultLayout, {
  Step: FormSteps.TermsandConditions,
});

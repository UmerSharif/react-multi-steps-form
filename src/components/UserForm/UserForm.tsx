import React, { Component } from 'react';

import Welcome from '..//Welcome';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import Skills from '../Skills';
import Experience from '../Experience';
import Qualifications from '../Qualifications';
import Certificates from '../Certificates';
import Licences from '../Licences';
import SocialMedia from '../SociaMedia';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import VideoUpload from '../VideoUpload/VideoUpload';
import TermsandConditions from '../TermsandConditions';
import ThankYou from '../ThankYou';
import Modal, { ModalTypes } from '../BCO/Modal';
import { HomePageURL, FormSteps } from '../../constant/constants';

import { saveDataService } from 'src/services/postDataService';

import { IFormValue } from 'src/interfaces/formValue.interface';

interface IUserFormProps {
  skills: IFormValue[];
  selectedSkills?: IFormValue[];
  experiences: IFormValue[];
  selectedExperiences?: IFormValue[];
  qualifications: IFormValue[];
  selectedQualifications?: IFormValue[];
  certificates: IFormValue[];
  selectedCertificates?: IFormValue[];
  inductions: IFormValue[];
  selectedInductions?: IFormValue[];
  referrerTypes: IFormValue[];
  selectedReferrer?: IFormValue[];
  ambassadorInfo?: any;
}

interface IFormValuePayload {
  id: string;
  value: string;
}

interface ISkillsPayload {
  skillIds?: string[];
}

interface IExperiencePayload {
  experience?: IFormValuePayload[];
  experienceNotes: string;
}

interface IQualificationsPayload {
  qualifications?: IFormValuePayload[];
}

interface ICertificatesPayload {
  certificateIds?: string[];
}

interface ILicencesPayload {
  licence?: string;
  ownsCar?: boolean;
  inductionIds?: string[];
}

interface ISocialMediaPayload {
  socialMedia: {
    facebook: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
  };
  referrer?: string;
}

interface ITermsandConditions {
  termsAndConditions: {
    ageConfirmation?: boolean;
    personalDetailsConfirmation?: boolean;
    correctInformationConfirmation?: boolean;
    rightToWorkConfirmation?: boolean;
  };
}

interface IUserFormState {}

export class UserForm extends Component<IUserFormProps, IUserFormState> {
  constructor(props: any) {
    super(props);
  }

  state = {
    step: FormSteps.Welcome,
    openModal: false,
    modalType: ModalTypes.ERROR,
    modalTitle: '',
    modalMessage: '',
    modalConfirmed: false,
    recaptchaToken: null,
    uuid: '',
    firstName: '',
    lastName: '',
    gender: 'F',
    email: '',
    phone: '',
    streetAddress: '',
    streetAddress2: '',
    suburbId: '',
    city: '',
    state: '',
    postcode: '',
    dateOfBirth: null,
    experienceNotes: '',
    driverLicence: false,
    licenceType: '',
    ownsCar: false,
    instagram: '',
    tikTok: '',
    linkedIn: '',
    facebook: '',
    referrer: '',
    photo: null,
    video: null,
    videoPreview: null,
    noPhoto: '',
    noVideo: '',
    ageConfirmation: false,
    personalDetailsConfirmation: false,
    correctInformationConfirmation: false,
    rightToWorkConfirmation: false,
  };

  componentDidMount() {
    if (this.props.ambassadorInfo) {
      const {
        ambassadorInfo,
        selectedSkills,
        selectedExperiences,
        selectedQualifications,
        selectedCertificates,
        selectedInductions,
      } = this.props;
      const {
        uuid,
        email,
        firstName,
        lastName,
        gender,
        phone,
        streetAddress,
        streetAddress2,
        dateOfBirth,
        experienceNotes,
        socialMedia,
        referrer,
        licence,
        ownsCar,
        photo,
        video,
        videoPreview,
      } = ambassadorInfo;
      this.setState({
        uuid,
        firstName,
        lastName,
        gender,
        email,
        phone,
        streetAddress,
        streetAddress2,
        dateOfBirth,
        experienceNotes,
        referrer,
        suburbId: ambassadorInfo.suburb ? ambassadorInfo.suburb.id : '',
        city: ambassadorInfo.suburb ? ambassadorInfo.suburb.name : '',
        state: ambassadorInfo.suburb ? ambassadorInfo.suburb.name : '',
        postcode: ambassadorInfo.suburb ? ambassadorInfo.suburb.postcode : '',
        facebook: socialMedia ? socialMedia.facebook : '',
        instagram: socialMedia ? socialMedia.instagram : '',
        linkedIn: socialMedia ? socialMedia.linkedin : '',
        tikTok: socialMedia ? socialMedia.tiktok : '',
        licenceType: licence ? licence : '',
        driverLicence: licence !== '' || null !== licence ? true : false,
        ownsCar,
        photo,
        video,
        videoPreview,
      });
      this.convertArrayToObj(selectedSkills);
      this.convertArrayToObj(selectedExperiences, 'value');
      this.convertArrayToObj(selectedQualifications, 'value');
      this.convertArrayToObj(selectedCertificates);
      this.convertArrayToObj(selectedInductions);
    }
  }

  // Used to convert array into object for showing selected values
  convertArrayToObj = (array, value = null) => {
    for (let i = 0; i < array.length; i++) {
      this.setState({ [array[i].id]: value ? array[i].label.value : true });
    }
    return;
  };

  // construct personal details FormData
  formatDate = (date: any) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  constructSkills = (): ISkillsPayload => {
    let tempArr: string[] = [];
    let payload: ISkillsPayload = {};

    let obj: any = this.state; // add obj: any to avoid typescript error
    for (const prop in obj) {
      if (prop.slice(0, 6) === 'skills' && this.state[prop]) {
        tempArr.push(prop.slice(6));
      }
    }

    payload.skillIds = tempArr;

    return payload;
  };

  constructExperience = (): IExperiencePayload => {
    let experienceArr: IFormValuePayload[] = [];
    let payload: IExperiencePayload = {
      experience: [],
      experienceNotes: '',
    };

    let obj: any = this.state; // add obj: any to avoid typescript error
    for (const prop in obj) {
      if (prop !== 'experienceNotes' && prop.slice(0, 10) === 'experience') {
        experienceArr.push({ id: prop.slice(10), value: obj[prop] });
      }
    }

    payload.experience = experienceArr;
    payload.experienceNotes = this.state.experienceNotes;

    return payload;
  };

  constructCertificates = (): ICertificatesPayload => {
    let tempArr: string[] = [];
    let payload: ICertificatesPayload = {};

    let obj: any = this.state; // add obj: any to avoid typescript error
    for (const prop in obj) {
      if (prop.slice(0, 11) === 'certificate' && this.state[prop]) {
        tempArr.push(prop.slice(11));
      }
    }

    payload.certificateIds = tempArr;

    return payload;
  };

  constructTermsandConditions = (): ITermsandConditions => {
    let payload: ITermsandConditions = { termsAndConditions: {} };

    payload.termsAndConditions.ageConfirmation = this.state.ageConfirmation;
    payload.termsAndConditions.personalDetailsConfirmation = this.state.personalDetailsConfirmation;
    payload.termsAndConditions.correctInformationConfirmation = this.state.correctInformationConfirmation;
    payload.termsAndConditions.rightToWorkConfirmation = this.state.rightToWorkConfirmation;

    return payload;
  };

  constructLicences = (): ILicencesPayload => {
    let tempArr: string[] = [];
    let payload: ILicencesPayload = {};

    let obj: any = this.state; // add obj: any to avoid typescript error
    for (const prop in obj) {
      if (prop.slice(0, 9) === 'induction' && this.state[prop]) {
        tempArr.push(prop.slice(9));
      }
    }

    payload.inductionIds = tempArr;
    if (this.state.licenceType.length > 0)
      payload.licence = this.state.licenceType;
    payload.ownsCar = this.state.ownsCar;

    return payload;
  };

  constructSocialMedia = (): ISocialMediaPayload => {
    let payload: ISocialMediaPayload = {
      socialMedia: {
        facebook: '',
        instagram: '',
        tiktok: '',
        linkedin: '',
      },
    };

    payload.socialMedia.facebook = this.state.facebook;
    payload.socialMedia.instagram = this.state.instagram;
    payload.socialMedia.tiktok = this.state.tikTok;
    payload.socialMedia.linkedin = this.state.linkedIn;
    payload.referrer = this.state.referrer;

    return payload;
  };

  constructQualifications = (): IQualificationsPayload => {
    let tempArr: IFormValuePayload[] = [];
    let payload: IQualificationsPayload = {
      qualifications: [],
    };

    let obj: any = this.state; // add obj: any to avoid typescript error
    for (const prop in obj) {
      if (prop.slice(0, 13) === 'qualification') {
        tempArr.push({ id: prop.slice(13), value: obj[prop] });
      }
    }

    payload.qualifications = tempArr;

    return payload;
  };

  constructPhotoUploadFD = () => {
    let formdata = new FormData();
    formdata.append('noPhoto', this.state.noPhoto);
    return formdata;
  };

  constructVideoUploadFD = () => {
    let formdata = new FormData();
    formdata.append('noVideo', this.state.noVideo);
    return formdata;
  };

  constructPersonalDetailsFD = () => {
    const {
      recaptchaToken,
      firstName,
      lastName,
      gender,
      email,
      phone,
      streetAddress,
      streetAddress2,
      suburbId,
      dateOfBirth,
    } = this.state;
    let formdata = new FormData();
    formdata.append('firstName', firstName);
    formdata.append('lastName', lastName);
    formdata.append('gender', gender);
    formdata.append('phone', phone);
    formdata.append('email', email);
    formdata.append('streetAddress', streetAddress);
    formdata.append('streetAddress2', streetAddress2);
    formdata.append('suburbId', suburbId);
    formdata.append('dateOfBirth', this.formatDate(dateOfBirth));

    return formdata;
  };

  goNextStep = (nextStep: FormSteps = null) => {
    const { step } = this.state;
    if (!nextStep)
      this.setState({
        step: step + 1,
      });
  };

  openErrorModal = () => {
    this.setState({
      openModal: true,
      modalType: ModalTypes.ERROR,
      modalTitle: 'Oops! Something went wrong...',
      modalMessage:
        'Something has gone wrong in processing your request. Please email support@abc.com for assistance.',
    });
  };

  // Proceed to next step
  nextStep = (nextStep: FormSteps = null) => {
    const { step } = this.state;

    switch (step) {
      case FormSteps.Welcome:
        this.setState({
          step: step + 1,
        });

        break;

      case FormSteps.PersonalDetails:
        let formdataPD: FormData = this.constructPersonalDetailsFD();

        if (this.state.uuid.length > 0) {
          saveDataService
            .updateFormDataService(
              formdataPD,
              'multipart/form-data',
              this.state.uuid,
              this.state.email
            )
            .then(() => {
              this.goNextStep(nextStep);
            })
            .catch(() => {
              this.openErrorModal();
            });
        } else
          saveDataService
            .postFormDataService(formdataPD)
            .then((res: any) => {
              this.setState({ uuid: res.talentApplication.uuid });
              this.goNextStep(nextStep);
            })
            .catch(() => {
              this.openErrorModal();
            });

        break;

      case FormSteps.Skills:
        let obj = this.constructSkills();

        saveDataService
          .updateFormDataService(
            obj,
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });

        break;

      case FormSteps.Experience:
        saveDataService
          .updateFormDataService(
            this.constructExperience(),
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });

        break;

      case FormSteps.Qualifications:
        saveDataService
          .updateFormDataService(
            this.constructQualifications(),
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });
        break;

      case FormSteps.Certificates:
        saveDataService
          .updateFormDataService(
            this.constructCertificates(),
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });

        break;

      case FormSteps.Licences:
        saveDataService
          .updateFormDataService(
            this.constructLicences(),
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });
        break;

      case FormSteps.SocialMedia:
        saveDataService
          .updateFormDataService(
            this.constructSocialMedia(),
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });

        break;

      case FormSteps.PhotoUpload:
        saveDataService
          .updateFormDataService(
            this.constructPhotoUploadFD(),
            'multipart/form-data',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });

        break;

      case FormSteps.VideoUpload:
        saveDataService
          .updateFormDataService(
            this.constructVideoUploadFD(),
            'multipart/form-data',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });
        break;

      case FormSteps.TermsandConditions:
        saveDataService
          .updateFormDataService(
            this.constructTermsandConditions(),
            'application/json',
            this.state.uuid,
            this.state.email
          )
          .then(() => {
            this.goNextStep(nextStep);
          })
          .catch(() => {
            this.openErrorModal();
          });
        break;

      default:
    }
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // save & exit
  saveAndExit = () => {
    // Call Axios to Save the data here
    this.setState({
      openModal: true,
      modalType: ModalTypes.CONFIRM,
      modalTitle: 'Are you sure you’d like to exit? ',
      modalMessage:
        'Your progress has been saved. You can come back to finish anytime by following the link in your email.',
    });
    this.nextStep(FormSteps.ThankYou);
  };

  // Handle fields change
  handleCheckbox = (input: string) => (e: any) => {
    this.setState({ [input]: e.target.checked });
  };

  handleDataInput = (input: string, dataItem: string) => {
    this.setState({ [input]: dataItem });
  };

  handleChange = (input: string) => (e: any) => {
    this.setState({ [input]: e.target.value });
  };

  resetFormControl = (input: string) => {
    this.setState({ [input]: '' });
  };

  // Handle state postal code change
  handleStatePostalCode = (input: string, value: string) => {
    this.setState({ [input]: value });
  };

  handleVideo = (file: File) => {
    this.setState({
      video: file,
    });
  };

  handleModalClose = () => {
    this.setState({
      openModal: false,
    });
  };

  handleModalConfirm = () => {
    this.setState({
      openModal: false,
      modalConfirmed: true,
    });
    window.location.href = HomePageURL;
  };

  fetchComponentForNextStep = () => {
    const { step } = this.state;
    const values = { ...this.state };

    switch (step) {
      case FormSteps.Welcome:
        return (
          <Welcome nextStep={this.nextStep} handleChange={this.handleChange} />
        );
      case FormSteps.PersonalDetails:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleDataInput={this.handleDataInput}
            handleStatePostalCode={this.handleStatePostalCode}
            values={values}
          />
        );

      case FormSteps.Skills:
        return (
          <Skills
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleCheckbox={this.handleCheckbox}
            formValues={this.props.skills}
            values={values}
          />
        );

      case FormSteps.Experience:
        return (
          <Experience
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleChange={this.handleChange}
            formValues={this.props.experiences}
            values={values}
          />
        );
      case FormSteps.Qualifications:
        return (
          <Qualifications
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleChange={this.handleChange}
            formValues={this.props.qualifications}
            values={values}
          />
        );

      case FormSteps.Certificates:
        return (
          <Certificates
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleCheckbox={this.handleCheckbox}
            formValues={this.props.certificates}
            values={values}
          />
        );

      case FormSteps.Licences:
        return (
          <Licences
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleChange={this.handleChange}
            handleCheckbox={this.handleCheckbox}
            resetFormControl={this.resetFormControl}
            formValues={this.props.inductions}
            values={values}
          />
        );

      case FormSteps.SocialMedia:
        return (
          <SocialMedia
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleChange={this.handleChange}
            formValues={this.props.referrerTypes}
            values={values}
          />
        );
      case FormSteps.PhotoUpload:
        return (
          <PhotoUpload
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleChange={this.handleChange}
            handleDataInput={this.handleDataInput}
            values={values}
          />
        );

      case FormSteps.VideoUpload:
        return (
          <VideoUpload
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleChange={this.handleChange}
            handleDataInput={this.handleDataInput}
            handleVideo={this.handleVideo}
            values={values}
          />
        );

      case FormSteps.TermsandConditions:
        return (
          <TermsandConditions
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            saveAndExit={this.saveAndExit}
            handleCheckbox={this.handleCheckbox}
            values={values}
          />
        );

      case FormSteps.ThankYou:
        return <ThankYou />;

      default:
    }
  };

  render() {
    const { openModal, modalType, modalTitle, modalMessage } = this.state;
    return (
      <React.Fragment>
        {openModal && (
          <Modal
            type={modalType}
            open={openModal}
            title={modalTitle}
            content={modalMessage}
            handleClose={this.handleModalClose}
            handleConfirm={this.handleModalConfirm}
          />
        )}
        {this.fetchComponentForNextStep()}
      </React.Fragment>
    );
  }
}

export default UserForm;

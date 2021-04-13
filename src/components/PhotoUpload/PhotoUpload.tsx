import React, { useRef, useState, useEffect, createRef } from 'react';
import {
  Grid,
  Container,
  ThemeProvider,
  Typography,
  Button,
  makeStyles,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Theme } from '../../Theme';

import ThreeButtonsGroup from '../../components/FormControl/ThreeButtonsGroup';
import { buttonStyles, textStyles } from '../../common/Styles';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// file cropper imports
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import FileUpload from '../FileUpload';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { saveDataService } from '../../services/postDataService';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';
import { orange } from '@material-ui/core/colors';
import { REQUIREDFIELD } from '../../constant/constants';

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    width: '300px',
    height: '300px',
  },
  imgPreview: {
    width: '240px',
    height: '240px',
    marginLeft: '10px',
  },
  center: {
    textAlign: 'center',
  },
  fileName: {
    color: orange[500],
    textAlign: 'center',
  },
  displayN: {
    display: 'none',
  },
  displayB: {
    [theme.breakpoints.up('xs')]: {
      display: 'block',
      maxWidth: '300px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      maxWidth: '500px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      maxWidth: '600px',
      marginTop: '20px',
    },
  },
  paddingZero: {
    padding: '0 !important',
  },
}));

interface IPhotoUploadProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleChange: (input: string) => (e: any) => void;
  handleDataInput: (input: string, dataItem: string) => void;
  values: any;
}

const PhotoUpload = (props: IPhotoUploadProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const textClass = textStyles();
  const [isSelectInputInvalid, setIsSelectInputInvalid] = useState(false);

  // File uploader
  const mimeAllowed = ['png', 'jpg', 'jpeg', 'gif'];
  const maximumFileSize = 10 * 1024 * 1024;
  let fileRef = useRef(null);
  const openFileHandler = (fileRefOption: any) => {
    if (fileRefOption) {
      fileRefOption.current.click();
    }
  };
  const [mimeTypeError, setMimeTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [multipleFileError, setMultipleFileError] = useState(false);
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [succeed, setSucceed] = useState(false);
  const afterImagePicked = (e: any) => {
    const file = e.target.files[0];
    updateFileNameAfterChange(file);
    // clear values
    e.target.value = '';
  };

  const imageElement = React.createRef<HTMLImageElement>();
  const [src, setSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageDestination, setImageDestination] = useState('');
  const [photoURL, setPhotoURL] = useState(props.values.photo);
  const [blob, setBlob] = useState(null);
  useEffect(() => {
    const cropper = new Cropper(imageElement.current, {
      zoomable: true,
      scalable: true,
      aspectRatio: 1,
      viewMode: 1,
      ready: function () {},
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        setImageDestination(canvas.toDataURL('image/png'));
        // canvas.toBlob((blob: Blob) => {
        //   setBlob(blob);
        // });
      },
    });
    return () => {
      cropper.destroy();
    };
  }, [src]);

  useEffect(() => {
    if (props.values.noPhoto) setIsSelectInputInvalid(false);
  }, [props.values.noPhoto]);

  const handleNext = () => {
    if (!photoURL && !props.values.noPhoto) {
      setIsSelectInputInvalid(true);
    } else {
      props.nextStep();
    }
  };

  const handleBack = () => {
    props.prevStep();
  };

  const resetClientValidationError = () => {
    setMultipleFileError(false);
    setMimeTypeError(false);
    setFileSizeError(false);
  };

  const uploadFile = () => {
    let formdata = new FormData();
    setUploading(true);
    formdata.append('photo', blob);
    saveDataService
      .uploadFileDataService(formdata, props.values.uuid, props.values.email)
      .then((res) => {
        setUploading(false);
        setSrc(null);
        setPhotoURL(res.talentApplication.photo);
        props.handleDataInput('photo', res.talentApplication.photo);

        setFileName(null);
        setSucceed(true);
      })
      .catch((err) => {
        // error handling
        console.log('err=', err);
      });
  };

  const handleCroppedImage = () => {
    uploadFile();
  };

  const calcelCroppedImage = () => {
    setSrc(null);
  };

  const onFileSelect = (files: File[]) => {
    if (files.length > 1) {
      setMultipleFileError(true);
    } else {
      updateFileNameAfterChange(files[0]);
    }
  };

  const updateFileNameAfterChange = (file: File) => {
    resetClientValidationError();
    if (mimeAllowed.indexOf(file.name.split('.').pop().toLowerCase()) < 0) {
      setMimeTypeError(true);
      return;
    } else if (file.size > maximumFileSize) {
      setFileSizeError(true);
      return;
    } else {
      setFileName(file.name);

      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setSrc(reader.result);
      };
      setBlob(file);
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Photo Upload</Typography>
              <Typography variant="h5">
                {console.log('props.values=', props.values)}
                <p>
                  Almost there! In this section, we ask that you upload a photo
                  of yourself.
                </p>
                <p>
                  This is optional but is encouraged for the success of your
                  application.
                </p>
                <p>
                  <strong>Tip:</strong> Please ensure that you are the only
                  person in the photo, you can clearly see your face, and there
                  is sufficient lighting.
                </p>
              </Typography>
            </Grid>

            <Grid container spacing={2} justify="center">
              <Grid item xs={12} md={8} lg={7}>
                <div className={textClass.warning}>
                  * Accepted file types: {mimeAllowed.join(', ')}. <br />*
                  Maximum file size is {maximumFileSize / 1024 / 1024}MB!
                </div>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    openFileHandler(fileRef);
                  }}
                  startIcon={<BackupOutlinedIcon />}
                  className={buttonClasses.fileUploadButton}
                >
                  Choose File
                </Button>

                <FileUpload {...props} onFileSelect={onFileSelect} />
                {multipleFileError && (
                  <div className={textClass.error}>
                    Multiple files are not allowed.
                  </div>
                )}
                {fileSizeError && (
                  <div className={textClass.error}>
                    Maximum file size is {maximumFileSize / 1024 / 1024}M!
                  </div>
                )}
                {mimeTypeError && (
                  <div className={textClass.error}>
                    Only {mimeAllowed.join()} file is accepted!
                  </div>
                )}
              </Grid>

              <Grid item xs={12} md={8} lg={7}>
                {succeed && (
                  <div className={textClass.succeed}>
                    Your photo has been uploaded successfully! Please click Next
                    to continue. <br />
                  </div>
                )}
                {fileName && (
                  <Typography variant="h4" className={classes.fileName}>
                    File Name: {fileName}
                  </Typography>
                )}

                <input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={afterImagePicked}
                />

                <div className={src ? classes.displayB : classes.displayN}>
                  <div className={buttonClasses.imageCropper}>
                    <img ref={imageElement} src={src} alt="Source" />
                  </div>
                  <div className={buttonClasses.imageCropperPreview}>
                    <div>
                      <img
                        src={imageDestination}
                        className={classes.imgPreview}
                        alt="Destination"
                      />
                    </div>

                    <div className={buttonClasses.imageActionButtons}>
                      {uploading && !error && (
                        <CircularProgress
                          style={{ fontSize: 60, color: green[500] }}
                        />
                      )}
                      {!uploading && (
                        <IconButton
                          aria-label="crop"
                          onClick={() => {
                            handleCroppedImage();
                          }}
                        >
                          <CheckCircleOutlineOutlinedIcon
                            style={{ fontSize: 40, color: green[500] }}
                          />
                        </IconButton>
                      )}

                      {!uploading && (
                        <IconButton
                          aria-label="crop"
                          onClick={() => {
                            calcelCroppedImage();
                          }}
                        >
                          <CancelOutlinedIcon
                            style={{ fontSize: 40, color: red[500] }}
                          />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>

                {photoURL && photoURL.length > 0 && !uploading && !src && (
                  <div className={classes.center}>
                    <img
                      src={photoURL}
                      className={classes.imgPreview}
                      alt="Destination"
                    />
                  </div>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}></Grid>

            {!photoURL && !src && (
              <Grid container spacing={2} md={8} lg={7}>
                <Grid item xs={12} justify="center">
                  <Typography variant="h5">
                    Can’t upload a photo right now? Let us know why:
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.paddingZero}>
                  <TextField
                    className={buttonClasses.select}
                    value={props.values.noPhoto}
                    onChange={props.handleChange('noPhoto')}
                    variant="outlined"
                    label="Please select"
                    error={isSelectInputInvalid}
                    helperText={
                      isSelectInputInvalid &&
                      '* Please upload a photo or select a reason.'
                    }
                    select
                    fullWidth
                  >
                    <MenuItem value="I cant right now">
                      I can't right now
                    </MenuItem>
                    <MenuItem value="I prefer not to">I prefer not to</MenuItem>
                    <MenuItem value="I dont know how">
                      I don't know how
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            )}

            {!src && (
              <ThreeButtonsGroup
                nextStep={handleNext}
                prevStep={handleBack}
                saveAndExit={props.saveAndExit}
              />
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(PhotoUpload, DefaultLayout, {
  Step: FormSteps.PhotoUpload,
});

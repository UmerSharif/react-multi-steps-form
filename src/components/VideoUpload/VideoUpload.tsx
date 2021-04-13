import React, { useRef, useState, useEffect } from 'react';
import {
  Grid,
  Container,
  ThemeProvider,
  Typography,
  Button,
  makeStyles,
  IconButton,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { Theme } from '../../Theme';

import ThreeButtonsGroup from '../FormControl/ThreeButtonsGroup';
import { buttonStyles, textStyles } from '../../common/Styles';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';

import FileUpload from '../FileUpload';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red, orange } from '@material-ui/core/colors';
import { saveDataService } from '../../services/postDataService';
import withLayout from '../Layout/WithLayout';
import DefaultLayout from '../Layout/Default';
import { FormSteps } from '../../constant/constants';

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    width: '300px',
    height: '300px',
  },
  videoPreview: {
    maxWidth: '440px',
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
    display: 'block',
    maxWidth: '600px',
    marginTop: '20px',
  },
  question: {
    padding: '4px 0',
  },
  paddingZero: {
    padding: '0 !important',
  },
}));

interface IVideoUploadProps {
  nextStep: () => void;
  prevStep: () => void;
  saveAndExit: () => void;
  handleChange: (input: string) => (e: any) => void;
  handleDataInput: (input: string, dataItem: string) => void;
  values: any;
}

const VideoUpload = (props: IVideoUploadProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const textClass = textStyles();
  const [videoURL, setVideoURL] = useState(props.values.video);
  const [videoPreviewURL, setVideoPreviewURL] = useState(
    props.values.videoPreview
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.values.noVideo) setIsSelectInputInvalid(false);
  }, [props.values.noVideo]);

  const handleNext = () => {
    if (!videoURL && !props.values.noVideo) {
      setIsSelectInputInvalid(true);
    } else {
      props.nextStep();
    }
  };

  const handleBack = () => {
    props.prevStep();
  };

  // select input box
  const [isSelectInputInvalid, setIsSelectInputInvalid] = useState(false);

  // File uploader
  const mimeAllowed = ['mp4', 'mov', 'avi'];
  const maximumFileSize = 100 * 1024 * 1024;
  let fileRef = useRef(null);
  const openFileHandler = (fileRefOption: any) => {
    if (fileRefOption) {
      fileRefOption.current.click();
    }
  };
  const [mimeTypeError, setMimeTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [multipleFileError, setMultipleFileError] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [succeed, setSucceed] = useState(false);
  const [blob, setBlob] = useState(null);

  const afterImagePicked = (e: any) => {
    const file = e.target.files[0];
    updateFileNameAfterChange(file);
    // clear values
    e.target.value = '';
  };

  const resetClientValidationError = () => {
    setMultipleFileError(false);
    setMimeTypeError(false);
    setFileSizeError(false);
  };

  const onFileSelect = (files: File[]) => {
    if (files.length > 1) {
      setMultipleFileError(true);
    } else {
      setMultipleFileError(false);
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
      setBlob(file);
    }
  };

  const cancelUpload = () => {
    setFileName(null);
  };

  const uploadFile = () => {
    let formdata = new FormData();
    setUploading(true);
    formdata.append('video', blob);
    saveDataService
      .uploadFileDataService(formdata, props.values.uuid, props.values.email)
      .then((res) => {
        setUploading(false);
        setVideoURL(res.talentApplication.video);
        setVideoPreviewURL(res.talentApplication.videoPreview);
        props.handleDataInput('video', res.talentApplication.video);
        props.handleDataInput(
          'videoPreview',
          res.talentApplication.videoPreview
        );

        setFileName(null);
        setSucceed(true);
      })
      .catch((err) => {
        // error handling
        console.log('err=', err);
      });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">Video Upload</Typography>
              <Typography variant="h5">
                <p>
                  In this section, we would like you to record a 1-minute video
                  of yourself. In the video, please address the following
                  points:
                </p>

                <ul>
                  <li className={classes.question}>
                    State your name, background and why you want to be a Brand
                    Ambassador
                  </li>
                </ul>

                <p>
                  <strong>Tip:</strong> Please ensure that you speak clearly and
                  minimise background noise. Also make sure there is good
                  lighting and you are set against a plain background.
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
                    Your video has been uploaded successfully! Please click Next
                    to continue.
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
              </Grid>

              <Grid item xs={12} md={8} lg={7}>
                {fileName && !succeed && (
                  <div className={buttonClasses.videoActionButtons}>
                    {uploading && !error && (
                      <CircularProgress
                        style={{ fontSize: 60, color: green[500] }}
                      />
                    )}
                    {!uploading && (
                      <IconButton aria-label="crop" onClick={uploadFile}>
                        <CheckCircleOutlineOutlinedIcon
                          style={{ fontSize: 40, color: green[500] }}
                        />
                      </IconButton>
                    )}

                    {!uploading && (
                      <IconButton aria-label="crop" onClick={cancelUpload}>
                        <CancelOutlinedIcon
                          style={{ fontSize: 40, color: red[500] }}
                        />
                      </IconButton>
                    )}
                  </div>
                )}

                {videoURL &&
                  videoURL.length > 0 &&
                  videoPreviewURL &&
                  videoPreviewURL.length > 0 &&
                  !uploading && (
                    <div className={classes.center}>
                      <img
                        src={videoPreviewURL}
                        className={classes.videoPreview}
                        alt="Destination"
                      />
                    </div>
                  )}
              </Grid>
            </Grid>

            <Grid item xs={12}></Grid>

            {!videoURL && !fileName && (
              <Grid container spacing={2} md={8} lg={7}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Can’t upload a video right now? Let us know why:
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.paddingZero}>
                  <TextField
                    className={buttonClasses.select}
                    value={props.values.noVideo}
                    onChange={props.handleChange('noVideo')}
                    variant="outlined"
                    label="Please select"
                    error={isSelectInputInvalid}
                    helperText={
                      isSelectInputInvalid &&
                      '* Please upload a video or select a reason.'
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

            {!fileName && (
              <ThreeButtonsGroup nextStep={handleNext} prevStep={handleBack} />
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withLayout(VideoUpload, DefaultLayout, {
  Step: FormSteps.VideoUpload,
});

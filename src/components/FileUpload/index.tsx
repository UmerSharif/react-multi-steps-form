import React, { memo } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';
import { buttonStyles } from '../../common/Styles';

const useStyles = makeStyles({
  container: {
    marginTop: 10,
  },
});

const activeStyle = '#2196f3';

const FileUpload = (props) => {
  const classes = useStyles();
  const commonStyle = buttonStyles();
  const listFiles = (files: File[]) => {
    props.onFileSelect(files);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => listFiles(files),
  });
  return (
    <div className={classes.container}>
      <div
        style={{ borderColor: isDragActive ? activeStyle : '' }}
        className={commonStyle.dropZone}
        {...getRootProps({})}
      >
        <input {...getInputProps()} multiple={false} />
        <p>Drag and drop the file here, or click to select a file</p>
      </div>
    </div>
  );
};

export default memo(FileUpload);

import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import styles from "./DropInput.styles";

const DropInput = (props) => {
  const { classes } = props;
  const { setImages, setLoading } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      Swal.fire("Error", "Upload only one file!", "error");
      return;
    }

    if (acceptedFiles[0].type !== "text/csv") {
      Swal.fire("Error", "Unsupported file type. Upload csv!", "error");
      return;
    }

    setFileUpload(acceptedFiles[0]);
  }, []);

  const handleuploadFile = () => {
    if (fileUpload === null) {
      Swal.fire("Error", "No file selected!", "error");
      return;
    }

    const api = "http://localhost:8000/eda_api/visualization/upload";
    const formData = new FormData();
    formData.append("file", fileUpload);

    setLoading(true);

    fetch(api, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setImages(result);
        setFileUpload(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setFileUpload(null);
        setLoading(false);
      });
  };

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <Paper
            className={classes.drop}
            variant="outlined"
            {...getRootProps()}
          >
            <CloudUpload className={classes.icon} />
            <input {...getInputProps()} />
            {fileUpload ? (
              <Typography variant="body1">{fileUpload.name}</Typography>
            ) : (
              <Typography variant="body1">
                Drag 'n' drop some files here, or click to select files
              </Typography>
            )}
          </Paper>
        )}
      </Dropzone>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleuploadFile}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {
            setFileUpload(null);
            setImages([]);
          }}
        >
          Clear
        </Button>
      </div>
    </>
  );
};

export default withStyles(styles)(DropInput);

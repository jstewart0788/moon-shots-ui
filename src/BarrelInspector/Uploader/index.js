import React, { useState } from "react";
import axios from "axios";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import { useSatelliteDispatch } from "../../shared/context/satellite";
import { ACTIONS } from "../../shared/constants";

import useStyles from "./styles";

const Uploader = ({ setUploaderOpen, open }) => {
  const dispatch = useSatelliteDispatch();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const previewFile = e => {
    const file = e.target.files[0];
    if (file) setFile(window.URL.createObjectURL(file));
  };

  const submitFile = async () => {
    try {
      const { data } = await axios.get(file);
      await axios.post("/api", data);
      dispatch({ type: ACTIONS.ADD_SATELLITE, payload: data });
      setFile(null)
      setUploaderOpen(false)();
    } catch (e) {
      setError("Error Adding new satellite");
      console.log("Error Adding new satellite");
    }
  };

  return (
    <Dialog
      onClose={setUploaderOpen(false)}
      aria-labelledby="uploader-dialog"
      open={open}
    >
      <DialogTitle> Upload a file to add new satellite data </DialogTitle>

      <div className={classes.marginInput}>
        <input type="file" accept=".json" onChange={previewFile} />
      </div>

      {error && <div> {Error} </div>}

      <div className={classes.flexCenter}>
        <Button
          variant="contained"
          className={classes.margin}
          color="primary"
          onClick={submitFile}
          disabled={!file}
        >
          Upload
        </Button>

        <Button
          variant="contained"
          className={classes.margin}
          color="secondary"
          onClick={setUploaderOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};

export default Uploader;

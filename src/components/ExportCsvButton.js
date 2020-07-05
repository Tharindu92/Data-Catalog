import React from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import cookie from "react-cookies";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GetAppIcon from "@material-ui/icons/GetApp";

const confirmBtn = {
  color: "#264c8c",
  textDecoration: "none",
  fontSize: "1em",
  marginBottom: "2px",
  paddingRight: "1em",
};

const cancelBtn = {
  color: "#264c8c",
  textDecoration: "none",
  fontSize: "1em",
  marginBottom: "2px",
  paddingRight: "1em",
  backgroundColor: "#fff",
  border: "none",
};
// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Session-Token": cookie.load("session_token"),
    "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
  },
};
export const ExportCsvButton = ({ dataUrl, fileName }) => {
  const [data, setData] = React.useState([
    ["Download", "Error"],
    ["Please Contact Administrator", "."],
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    axios
      .get(dataUrl, options)
      .then((response) => {
        setData(response.data.resource);

        console.log(response.data.resource);
      })
      //if error
      .catch((error) => {
        console.log(error);
      });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <GetAppIcon />
      <label onClick={handleClickOpen}>Download</label>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="downloadConfirmationAlert">{"Download"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click confirm to start downloading the dataset.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button style={cancelBtn} onClick={handleClose} color="primary">
            CANCEL
          </button>
          <CSVLink
            style={confirmBtn}
            data={data}
            filename={fileName + ".csv"}
            onClick={() => {
              setOpen(false);
            }}
          >
            CONFIRM
          </CSVLink>
        </DialogActions>
      </Dialog>
    </div>
  );
};

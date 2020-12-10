import React from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GetAppIcon from "@material-ui/icons/GetApp";
//CSS
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

class ExportCsvButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [["Download", "Error"],
     ["Please Contact Administrator", "."],], open: false, finished: false, error: false, faulty: false};
    this.fetchData = this.fetchData.bind(this);
    this.getDataToExport = this.getDataToExport.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  fetchData = () => {
    this.setState({open: true, data: [["Download", "Error"],
     ["Please Contact Administrator", "."],]}, () => {
    	this.getDataToExport(this.props.dataUrl);
     });   
  }

  handleClose = () => {
    this.setState({open: false});
  };

  handleDownloadClose = () => {
    this.setState({finished: false});
  };

  handleDownloadErrorClose = () => {
    this.setState({error: false});
   };

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };

  getDataToExport = async(dataUrl) => {
    var exportData = [];
    // headers for api call
    var offset = 0;
    var iterations = 0;
    //!st API call to get the count
    var apiHeader = {
        params: {count_only: true},
        headers: {
            "Content-Type": "application/json",
            "X-DreamFactory-Session-Token": cookie.load("session_token"),
            "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
        },
    };
    var totalDocs = 0;
//this.props.fileName
    var recordSize = 50000;
    var sleepTime = 20000;

    if(this.props.fileName == "Invoice_Base"){
       recordSize = 22000;
       sleepTime = 15000;
    }

    return axios
        .get(dataUrl, apiHeader)
        .then(async (response) => {
            iterations = Math.ceil(response.data / recordSize);
            totalDocs = response.data;
            var i;
            //Repeat calling the API until all data is collected
            for (i = 0; i < iterations; i++) {
                // if(i !== 0){
                    // await this.sleep(sleepTime);
                // }

                offset = i * recordSize;
                apiHeader = {
                    params: {offset: offset, limit: recordSize},
                    headers: {
                        "Content-Type": "application/json",
                        "X-DreamFactory-Session-Token": cookie.load("session_token"),
                        "X-DreamFactory-Api-Key": process.env.REACT_APP_DF_APP_KEY,
                    },
                };
                // var len = exportData.length;
                await axios
                    .get(dataUrl, apiHeader)
                    .then((response) => {
                        exportData.push(...response.data.resource);
                    }).then(() => {
                    if(exportData.length === totalDocs){
                        this.setState({open: false, finished: true, data: exportData});
                    }
                })
                //if error
                    .catch((error) => {
                        if(this.state.error === false){
                            this.setState({open: false, error: true});
                        }

                    });
            }
            //export Data has all the records in the end

            return exportData;
        })
        //if error
        .catch((error) => {
            this.setState({open: false, error: true});
        });
  }

  render() {
    return (
        <div>
          <GetAppIcon />
          <label onClick={this.fetchData}>Download</label>
          <Dialog open={this.state.open} onClose={this.handleClose}>
             <DialogTitle id="downloadConfirmationAlert">{"Download"}</DialogTitle>
             <DialogContent>
               <DialogContentText id="alert-dialog-description">
                 Please wait while the data is being downloaded...
               </DialogContentText>
             </DialogContent>
           </Dialog>
            <Dialog open={this.state.error} onClose={this.handleDownloadErrorClose}>
                <DialogTitle id="downloadErrorAlert">{"Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Error occurred while downloading the dataset.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button style={cancelBtn} onClick={this.handleDownloadErrorClose} color="primary">
                        OK
                    </button>
                </DialogActions>
            </Dialog>
          <Dialog open={this.state.finished} onClose={this.handleDownloadClose}>
            <DialogTitle id="downloadConfirmationAlert">{"Download"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Click confirm to start downloading the dataset.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button style={cancelBtn} onClick={this.handleDownloadClose} color="primary">
                CANCEL
              </button>
              <CSVLink
                  //download csv when clicked
                  style={confirmBtn}
                  data={this.state.data}
                  filename={this.props.fileName + ".csv"}
                  onClick={() => {
                    this.setState({finished: false});
					window.location.reload(false);
                  }}
              >
                CONFIRM
              </CSVLink>
            </DialogActions>
          </Dialog>
        </div>

    )
  }
}
export default ExportCsvButton;

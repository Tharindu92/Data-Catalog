import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    color: "#264c8c",
    fontWeight: "bold",
  },
  description: {
    backgroundColor: "#EEEEEE",
  },
}));

//Shows sample codes to access data via API
export default function ({ datasetName }) {
  const classes = useStyles();

  //API url according to selected dataset
  const apiUrl =
    process.env.REACT_APP_DIRECT_API + "/api/v2/PRD_LDS/_table/" + datasetName;
  //Javascript example string
  const jsExample =
    `
    //Axios API call  
    //Session token can be gotten from email when you logged in to the Data Portal

    const apiHeader = {  
    headers: {  
      "Content-Type": "application/json",  
      "X-DreamFactory-Session-Token": <session token>,  
      "X-DreamFactory-Api-Key": "` +
    process.env.REACT_APP_DF_APP_KEY +
    `",  
        },  
    }  
 
    const apiUrl = "` +
    apiUrl +
    `"  
    axios.get(apiUrl, apiHeader)  
    .then((response) => {  
        console.log(response.data.resource);  
    }); 
  `;
  //Python example string
  const pyExmaple =
    `
    #python request
    #Session token can be gotten from email when you logged in to the Data Portal
    import requests
    headers = {  
      "Content-Type": "application/json",  
      "X-DreamFactory-Session-Token": <session token>,  
      "X-DreamFactory-Api-Key": "` +
    process.env.REACT_APP_DF_APP_KEY +
    `",  
    },  
    resp = requests.get("` +
    apiUrl +
    `",headers=headers)
    result = resp.json()
    print(result)       
        
  
  `;
  return (
    <div>
      <PopupState variant="popover" popupId="apiGuide-popup-popover">
        {(popupState) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              {...bindTrigger(popupState)}
            >
              Access via Api
            </Button>
            <Popover
              style={{ width: "50%" }}
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Box p={1} style={{ backgroundColor: "#F5F5F5" }}>
                <h3>API Access Instructions</h3>
                <hr />
                <div className={classes.root}>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <label className={classes.heading}>Endpoint</label>
                    </AccordionSummary>
                    <AccordionDetails className={classes.description}>
                      <label>{apiUrl}</label>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <label className={classes.heading}>Query Examples</label>
                    </AccordionSummary>
                    <AccordionDetails className={classes.description}>
                      <label>
                        <b>Query Example (First 5 results)</b>
                        <br />
                        {apiUrl + "?limit=5"}
                        <br />
                        <b>Query Example (Filter exact match)</b>
                        <br />
                        {apiUrl + "?filter=field=target"}
                        <br />
                        <b>Query Example (Filter containing)</b>
                        <br />
                        {apiUrl + "?filter=field%20like%20target"}
                        <br />
                        <b>Query Example (Filter multi variable)</b>
                        <br />
                        {apiUrl +
                          "?filter=(field=target)%20and%20(field2=target)"}
                      </label>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <label className={classes.heading}>
                        Example: Javascript
                      </label>
                    </AccordionSummary>
                    <AccordionDetails className={classes.description}>
                      <ReactMarkdown source={jsExample} />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel4a-header"
                    >
                      <label className={classes.heading}>Example: Python</label>
                    </AccordionSummary>
                    <AccordionDetails className={classes.description}>
                      <ReactMarkdown source={pyExmaple} />
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}

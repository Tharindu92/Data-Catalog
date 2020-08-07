import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DataPreview from "./DataPreview";
import DataAttributes from "./DataAttributes";
import AboutDataSet from "./AboutDataSet";
import DataSetComments from "./DataSetComments";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    maxWidth: "90vw",
  },
}));

//Right Drawer content, input database dict to display data table information
export default function DrawerContent({ database }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const changeWidthShort = (e) => {
    let element = document.getElementById("drawerContent");
    ReactDOM.findDOMNode(element).style.width = "500px";
  };

  const changeWidthLong = () => {
    let element = document.getElementById("drawerContent");
    ReactDOM.findDOMNode(element).style.width = "1000px";
  };

  return (
    <div id="drawerContent" className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {/* tab headers */}
          <Tab
            label="About Dataset"
            {...a11yProps(0)}
            onClick={changeWidthShort}
          />
          <Tab
            label="Data Attributes"
            {...a11yProps(1)}
            onClick={changeWidthLong}
          />
          <Tab
            label="Data Preview"
            {...a11yProps(2)}
            onClick={changeWidthLong}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* content in Properties tab */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AboutDataSet database={database} />
          <DataSetComments database={database} />
        </TabPanel>
        {/* content in Columns tab */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <DataAttributes selected_dataset={database._id} />
        </TabPanel>
        {/* content in Preview tab */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <DataPreview selected_dataset={database.Collection_name} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

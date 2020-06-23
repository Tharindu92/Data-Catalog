import React from "react";
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
    width: 600,
    maxWidth: "80vw",
  },
}));

//Right Drawer content, input database dict to display data table information
//sample input, {name:'db name',description:'sample text'....}
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

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {/* tab headers */}
          <Tab label="About Dataset" {...a11yProps(0)} />
          <Tab label="Data Attributes" {...a11yProps(1)} />
          <Tab label="Data Preview" {...a11yProps(2)} />
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
        </TabPanel>
        {/* content in Preview tab */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          Attribute Info
          <DataAttributes selected_dataset={database._id} />
        </TabPanel>
        {/* content in Columns tab */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <DataPreview selected_dataset={database.Collection_Tech_Label} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

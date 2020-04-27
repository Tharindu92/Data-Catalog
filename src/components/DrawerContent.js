import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tags from "./Tags";
import DatabasePreview from "./DatabasePreview";
import DatabaseColumns from "./DatabaseColumns";
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
          <Tab label="Properties" {...a11yProps(0)} />
          <Tab label="Preview" {...a11yProps(1)} />
          <Tab label="Columns" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* content in Properties tab */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <h3 className="textColor">Name:</h3>
          <label>{database.name}</label>
          <h3 className="textColor">Description:</h3>
          <p>{database.description}</p>
          <h3 className="textColor">Tags:</h3>
          <Tags tags={database.tags} />
          <br />
          <h3 className="textColor">Rating:</h3>
          <br />
          <h3 className="textColor">Connection Info</h3>
          <label>Data Source: {database.data_source}</label>
          <br />
          <label>Database Name: {database.database_name}</label>
          <br />
          <label>Last Updated: {database.last_updated}</label>
          <br />
          <label>Last Updated By: {database.last_updated_by}</label>
        </TabPanel>
        {/* content in Preview tab */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <DatabasePreview selected_id={database["_id"]} />
        </TabPanel>
        {/* content in Columns tab */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          Column Info
          <DatabaseColumns selected_id={database["_id"]} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

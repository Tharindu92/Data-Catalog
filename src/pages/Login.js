import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import history from "../history";
import Snackbar from "@material-ui/core/Snackbar";
import bcrypt from "bcryptjs";

// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0//", salt);
// console.log(hash);
// console.log(bcrypt.hashSync("B4c0//", salt));
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#264c8c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#264c8c",
    color: "#fff",
  },
}));

// headers for api call
const options = {
  headers: {
    "Content-Type": "application/json",
    "X-DreamFactory-Api-Key":
      "ff36aa23e74ec3839f246d4b06e08e1243b2dda56935885c3dd3c2e8b5731e39",
  },
};

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: "",
    open: false,
    userInfo: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  function processLogin() {
    var search_string =
      "http://localhost:8080/api/v2/datacatalog2/_table/user_credentials?filter=Login_ID%20%3D%20" +
      state.email;
    //Axios API call
    axios
      .get(search_string, options)
      .then((response) => {
        if (response.data.resource.length > 0) {
          bcrypt
            .compare(state.password, response.data.resource[0].Login_Password)
            .then((isMatch) => {
              if (isMatch) {
                history.push({
                  pathname: "/",
                });
                window.location.reload();
              } else {
                setState({ ...state, open: true });
              }
            });
        }
      })
      //if error
      .catch((error) => {
        setState({ ...state, open: true });
      });
  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={state.open}
          onClose={handleClose}
          message="Invalid username or password, please try again."
        />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          JTC Data Catalog
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={state.email}
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={processLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Request for account"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#1976d2'
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: '#1976d2',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#1976d2',
  }
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
});

export default function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://blog-begin.herokuapp.com/api/auth/register", {
      fullName,
      username,
      email,
      password
    }).then(res => {
      window.location.replace("/login");
    }).catch(err => {
      setOpen(true);
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  onChange={e => setFullName((e.target.value))}
                  type="text"
                />
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  onChange={e => setUsername((e.target.value))}
                  type="text"
                />
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  onChange={e => setEmail((e.target.value))}
                  type="email"
                />
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={e => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                />
              </ThemeProvider>
            </Grid>
          </Grid>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </ThemeProvider>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className={classes.link}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="User already exists"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { userActions } from 'redux/_actions';
import { Btn, Input } from 'components';
import { forgotPassword } from 'lib/api';
import withAuth from 'lib/withAuth';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    paddingTop: '3rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2rem ',
      backgroundColor: 'white',
    },
    '& > div > a > img': {
      width: 137,
    },
    '& > div > div': {
      minHeight: 'calc(100vh - 200px)',
    },
    '& h1': {
      display: 'block',
      marginTop: 0,
      marginBottom: '1rem',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '3rem',
      fontWeight: 'bold',
      letterSpacing: 'normal',
      color: '#4f80ff',
    },
    '& h2': {
      paddingLeft: '0',
      marginTop: '0',
      marginBottom: '3rem',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '1.8rem',
      fontWeight: '600',
      color: 'rgba(26, 46, 108, 0.5)',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '1.5rem ',
      },
    },
    '& > div > a': {
      marginBottom: '3.5rem',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '1rem ',
      },
    },
    '& input': {
      display: 'block',
      padding: '3rem 1.4rem',
      boxSizing: 'border-box',
      width: '100%',
      height: '38px',
      borderRadius: '6px',
      border: 'solid 1px #c7cfd6',
      fontFamily: 'Open Sans',
      fontSize: '1.4rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#8e97a1',
    },
    '& a': {
      display: 'inline-block',
      color: '#0fc1a9',
    },
  },
  signinFormContainer: {
    padding: '4rem 8.5rem ',
    backgroundColor: 'white',
    borderRadius: '1rem',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    [theme.breakpoints.down('sm')]: theme.space.bodyWrapper,
  },
  formContainerParent: {
    minHeight: '100vh',
    margin: 'auto',
  },
  formContainer: {
    borderRadius: '15px',
    textAlign: 'left',
    '& p': {
      fontFamily: 'Open Sans',
      fontSize: '1.6rem',
    },
  },
  signinLogo: {
    borderTopLeftRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    background: "url('../../static/img/login.png') no-repeat",
    backgroundSize: 'cover',
  },
  loginBtn: {
    padding: '2rem 0',
  },
  btnContainer: {
    marginTop: '3rem',
    '& > div:first-of-type': {
      paddingRight: 5,
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
        marginBottom: '2rem',
      },
    },
    '& > div:last-of-type': {
      paddingLeft: 5,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem',
    },
  },
  checkBoxContainer: {
    marginTop: '2rem',
    '& > span': {
      paddingLeft: 0,
    },
    '& h3': {
      color: 'rgba(26, 46, 108, 0.5)',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
  },
}));
const SignIn = ({ token, values = {}, handleChange }) => (
  <>
    {token ? (
      <>
        <Input
          label="Mot de passe*"
          value={values.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Input
          label="Confirmer votre mot de passe*"
          value={values.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          placeholder="Password"
        />
      </>
    ) : (
      <Input
        label="E-mail*"
        value={values.email}
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Votre e-mail"
      />
    )}
  </>
);
const propTypes = {
  values: PropTypes.objectOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  token: PropTypes.string,
};
SignIn.propTypes = propTypes;
SignIn.defaultProps = {
  token: null,
};

const LoginTab = ({ resetPass }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {
    query: { token },
    push,
  } = useRouter();

  const onClick = async () => {
    if (!token) {
      const { user } = await forgotPassword({ email: state.email });
      if (user) {
        toast.success(
          `Un email a été envoyé sur ${user} avec des instructions supplémentaires`
        );
        push('/public/');
      }
    } else {
      if (state.password !== state.confirmPassword)
        return toast.warn('Mot de passe différent');
      resetPass({ password: state.password, token });
    }
  };
  const handleChange = (name) => ({ target: { value } }) =>
    setState({ ...state, [name]: value });
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid
        container
        justify="center"
        alignItems="center"
        id="login"
        className={classes.container}
      >
        <div className="fullwidth text-center">
          <a href="/">
            <img src="/logo.png" alt="kit le nid" />
          </a>
          <Grid container item alignItems="stretch" justify="center">
            <Grid item xs={6} className={classes.signinLogo} />
            <Grid
              container
              item
              direction="column"
              justify="center"
              alignItems="center"
              md={6}
              xs={12}
              className={classes.signinFormContainer}
            >
              <Grid container alignItems="center">
                <div className="fullwidth">
                  <h1>Mot de passe oublié</h1>
                  <h2>Accéder à tout notre accompagnement.</h2>
                  <Grid
                    container
                    item
                    justify="center"
                    alignItems="center"
                    className={classes.formContainer}
                  >
                    <SignIn
                      token={token}
                      values={state}
                      handleChange={handleChange}
                      onClick={onClick}
                    />
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    className={classes.btnContainer}
                  >
                    <Grid item>
                      <Btn
                        text="Soumettre"
                        onClick={onClick}
                        className="blueColor full login-btn"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

LoginTab.propTypes = {
  resetPass: PropTypes.func.isRequired,
};

const mapState = (state) => {
  const { loggingIn } = state.authentication;
  return { loggingIn };
};

const actionCreators = {
  resetPass: userActions.resetPass,
};
export default withAuth(connect(mapState, actionCreators)(LoginTab), {
  logoutRequired: true,
});

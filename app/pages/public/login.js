import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from 'redux/_actions';
import { Btn, Select, Input, Checkbox } from 'components';
import { redirectStyle } from 'components/wrapper';
import withAuth from 'lib/withAuth';
import { Buyer, userRoleSelect, cleanAlert, pick } from 'helpers';
import { pageLink } from 'constants/index';

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
      letterSpacing: 'normal',
    },
    '& h3': {
      paddingLeft: 0,
      marginTop: 0,
      marginBottom: '3rem',
      textAlign: 'center',
      color: theme.palette.newGray,
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
    '& a': {
      display: 'inline-block',
      color: '#0fc1a9',
    },
  },
  redirect: {
    ...redirectStyle(theme),
    position: 'absolute',
    top: '-5rem',
    left: 0,
    [theme.breakpoints.down('sm')]: {
      top: '-5rem',
      backgroundColor: 'initial',
    },
  },
  signinFormContainer: {
    padding: '4rem 8.5rem ',
    backgroundColor: 'white',
    borderRadius: '1rem',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    boxShadow:
      '-3px 4px 13px rgba(0, 0, 0, 0.1), inset 0px -3px 10px rgba(149, 149, 149, 0.2)',
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
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      minHeight: '30vh',
      backgroundPosition: 'center',
    },
  },
  loginBtn: {
    padding: '2rem 0',
  },
  btnContainer: {
    marginTop: '4.8rem',
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
    textAlign: 'left',
    '& > div': {
      '&:first-of-type': {
        width: '100%',
      },
      '&:last-of-type': {
        marginTop: 0,
      },
      '& > p': {
        fontSize: '1rem',
        lineHeight: '1.7rem!important',
      },
    },
    '& > p': {
      fontSize: '.8rem',
      lineHeight: '1.5rem!important',
      '& > a': {
        color: theme.palette.primary.main,
      },
    },
  },
  resetPassword: {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: `${theme.palette.primary.main}!important`,
  },
}));

const SignUp = ({ values = {}, ...inputProps }) => (
  <Grid container item>
    <Input
      {...inputProps}
      label="Nom*"
      placeholder="Nom*"
      name="lastName"
      position="left"
    />
    <Input
      {...inputProps}
      label="Prénom*"
      placeholder="Prénom*"
      name="firstName"
      position="right"
    />
    <Input
      {...inputProps}
      label="E-mail*"
      placeholder="Votre e-mail"
      name="email"
      type="email"
      position="left"
    />
    <Input
      {...inputProps}
      label="Téléphone*"
      placeholder="Téléphone"
      name="phone"
      type="phone"
      position="right"
    />
    <Input
      {...inputProps}
      label="Mot de passe*"
      placeholder="Mot de passe"
      name="password"
      type="password"
      position="left"
    />
    <Select
      {...inputProps}
      name="role"
      value={values.role}
      list={userRoleSelect}
      label="Statut*"
      position="right"
    />
  </Grid>
);
const SignIn = ({ values = {}, ...inputProps }) => (
  <>
    <Input
      {...inputProps}
      label="E-mail*"
      value={values.email}
      name="email"
      type="email"
      placeholder="Votre e-mail"
      position="left"
    />
    <Input
      {...inputProps}
      label="Mot de passe*"
      value={values.password}
      name="password"
      type="password"
      placeholder="Mot de passe"
      position="right"
    />
  </>
);
const propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};
SignIn.propTypes = propTypes;
SignUp.propTypes = propTypes;

const LoginTab = ({ login, register }) => {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: Buyer,
  });
  const [isRegisterinView, setIsRegisterinView] = useState(
    window?.location?.search?.includes('register')
  );
  const [cgtChecked, setCgtChecked] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleCheck = (checked) => setChecked(checked);
  const handleCgtCheck = (checked) => setCgtChecked(checked);
  const toggleView = () => setIsRegisterinView(!isRegisterinView);

  const onClick = () => {
    let data = { ...state };
    let authReq;

    if (!isRegisterinView) {
      data = { email: data.email, password: data.password };
      if (!data.email || !data.password)
        return cleanAlert('Veuillez remplir les champs obligatoires');
      authReq = login;
    } else {
      const pickdata = [
        'email',
        'firstName',
        'lastName',
        'role',
        'password',
        'phone',
      ];
      if (
        !data.email ||
        !data.firstName ||
        !data.lastName ||
        !data.password ||
        !data.role ||
        !data.phone
      ) {
        cleanAlert('Veuillez remplir les champs obligatoires');
        return;
      }

      if (!cgtChecked) {
        cleanAlert('Veuillez accepter les conditions générales');
        return;
      }
      if (document.referrer) {
        data.referrer_url = document.referrer;
        pickdata.push('referrer_url');
      }
      data = pick(data, pickdata);
      authReq = register;
    }

    authReq(data);
  };
  const onKeyPress = (e) => e.key === 'Enter' && onClick();
  const handleChange =
    (name) =>
    ({ target: { value } }) =>
      setState({ ...state, [name]: value });
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Grid
          container
          justify="center"
          alignItems="center"
          id="login"
          className={classes.container}
        >
          <div className="fullwidth text-center">
              <a href={pageLink.home}>
                <img src="/logo.svg" alt="kit le nid" />
              </a>
            <Grid
              container
              item
              alignItems="stretch"
              justify="center"
              className="relative"
            >
              <a href={pageLink.home} className={classes.redirect}>
                <Typography variant="h4">Retour</Typography>
              </a>
              <Grid item md={6} xs={12} className={classes.signinLogo} />
              <Grid
                container
                item
                direction="column"
                justify="space-between"
                alignItems="center"
                md={6}
                xs={12}
                className={classes.signinFormContainer}
              >
                <Grid container alignItems="center">
                  <div className="fullwidth">
                    <Typography variant="h1">
                      {isRegisterinView
                        ? 'Inscrivez-vous gratuitement !'
                        : 'Connexion'}
                    </Typography>
                    <Typography variant="h3">
                      {isRegisterinView && (
                        <>
                          Et accédez à tout notre
                          <br /> accompagnement.
                        </>
                      )}
                    </Typography>
                    <Grid
                      container
                      item
                      justify="center"
                      alignItems="center"
                      className={classes.formContainer}
                    >
                      {isRegisterinView ? (
                        <SignUp
                          values={state}
                          onChange={handleChange}
                          onKeyPress={onKeyPress}
                          onClick={onClick}
                        />
                      ) : (
                        <SignIn
                          values={state}
                          onChange={handleChange}
                          onKeyPress={onKeyPress}
                          onClick={onClick}
                        />
                      )}
                    </Grid>
                    {isRegisterinView && (
                      <>
                        <Grid
                          container
                          alignItems="center"
                          className={classes.checkBoxContainer}
                        >
                          <Checkbox
                            bordered
                            cornered
                            label="J'accepte les conditions générales"
                            onChange={handleCgtCheck}
                          />
                          <Checkbox
                            bordered
                            cornered
                            label="En envoyant ma demande, j'accepte que le groupe Nexity exploite mes données personnelles dans le cadre de ma demande de contact et de la relation commerciale qui pourrait en découler."
                            onChange={handleCheck}
                          />
                          <Typography>
                            Vous avez la possibilité de modifier votre
                            consentement, d'exercer vos droits pour accéder,
                            rectifier, effacer vos données, limiter leurs
                            traitements, vous y opposer et demander la
                            portabilité de celle-ci. Pour cela vous pouvez
                            consulter sur ce lien notre{' '}
                            <a href="" target="_blank">
                              Charte de protection des données à caractère
                              personnel.
                            </a>
                          </Typography>
                        </Grid>
                      </>
                    )}
                    <Grid
                      container
                      justify="center"
                      className={classes.btnContainer}
                    >
                      <Grid item>
                        <Btn
                          text={
                            isRegisterinView
                              ? 'Créer un compte'
                              : 'Connectez-vous'
                          }
                          onClick={onClick}
                        />
                      </Grid>
                      <Grid item>
                        <Btn
                          text={
                            isRegisterinView
                              ? 'Connectez-vous'
                              : 'Créer un compte'
                          }
                          onClick={toggleView}
                          whiteColor
                        />
                      </Grid>
                    </Grid>
                      <a  href="/public/resetPassword" className={classes.resetPassword}>
                        Mot de passe oublié ?
                      </a>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </>
  );
};

LoginTab.propTypes = {};

const mapState = (state) => {
  const { loggedIn } = state.authentication;

  return { loggedIn };
};

const actionCreators = {
  register: userActions.register,
  login: userActions.login,
};
export default withAuth(connect(mapState, actionCreators)(LoginTab), {
  logoutRequired: true,
});

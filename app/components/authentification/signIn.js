import { Grid, Typography } from '@material-ui/core';
import { Btn, Input, Checkbox } from 'components';

import { Icon } from 'components/form';

// const MyFacebookButton = ({ onClick }) => (
//   // <button onClick={onClick}>Login with facebook</button>

// );

export const SignIn = ({
  state = {},
  classes,
  onKeyPress,
  handleCheckEmailExist,
  onChange,
  handleSignup,
  handleNextStep,
  handleCgtCheck,
  invokePasswordInput,
  handleSignIn,
  handleLogin,
}) => (
  <>
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className=''
    >
      {!invokePasswordInput ? (
        <Input
          value={state.email}
          onChange={onChange}
          onKeyPress={onKeyPress}
          label="Adresse e-mail*"
          placeholder="Votre e-mail"
          name="email"
          type="email"
        />
      ) : (
        <></>
      )}
      {invokePasswordInput ? (
        <Input
          value={state.password}
          onChange={onChange}
          onKeyPress={onKeyPress}
          label="Mot de passe*"
          placeholder="Mot de passe"
          name="password"
          type="password"
        />
      ) : (
        <></>
      )}
    </Grid>
    <Grid container justify="center" className={classes.btnContainer}>
      <Grid item>
        <Btn
          text={!invokePasswordInput ? 'Connexion / Inscription' : 'Connexion'}
          onClick={() =>
            !invokePasswordInput ? handleCheckEmailExist() : handleSignIn()
          }
        />
      </Grid>
    </Grid>
    {!invokePasswordInput ? (
      <>
        {/* <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Grid
              onClick={renderProps.onClick}
              container
              alignItems="center"
              className={classes.socialAuth}
            >
              <Icon type="google" />
              <Typography variant="body1">continuer avec Google</Typography>
            </Grid>
            // <button onClick={renderProps.onClick} style={customStyle}>This is my custom Google button</button>
          )}
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
        /> */}
        {/* <FacebookAuth
          appId="487070945537857"
          callback={handleLogin}
          component={({ onClick }) => (
            <Grid
              container
              alignItems="center"
              className={classes.socialAuth}
              onClick={onClick}
            >
              <Icon type="facebook" />
              <Typography variant="body1">continuer avec Facebook</Typography>
            </Grid>
          )}
        /> */}

        <Grid
          onClick={() =>
            window.open('https://app.kitlenid.fr/auth/facebook', '_self')
          }
          container
          alignItems="center"
          className={classes.socialAuth}
        >
          <Icon type="facebook" />
          <p className='text-[12px] text-_grisBleu'>continuer avec Facebook</p>
        </Grid>
        <Grid
          onClick={() =>
            window.open('https://app.kitlenid.fr/auth/google', '_self')
          }
          container
          alignItems="center"
          className={classes.socialAuth}
        >
          <Icon type="google" />
          <p className='text-[12px] text-_grisBleu' >continuer avec Google</p>
        </Grid>
        {/* <Grid container alignItems="center" className={classes.socialAuth}>
          <Icon type="instagram" />
          <Typography variant="body1">continuer avec Instagram</Typography>
        </Grid>
        
        <Grid container alignItems="center" className={classes.socialAuth}>
          <Icon type="apple" />
          <Typography variant="body1">continuer avec Apple</Typography>
        </Grid> */}
      </>
    ) : (
      <></>
    )}
  </>
);

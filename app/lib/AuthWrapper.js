import { Grid, Container } from '@material-ui/core';
import clsx from 'clsx';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from '../components/admin/Sidebar';
import { userActions } from '../redux/_actions';
import StudentMenu, { MobileMenu } from '../components/studentMenu';

const styles = (theme) => ({
  studentContainer: {
    padding: '0 3rem',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      ...theme.space.bodyWrapper,
      paddingBottom: '7.5rem',
      paddingTop: 0,
    },
  },
  fullContentWidth: {
    padding: 0,
  },
  StudentMenuFixed: {
    position: 'relative',
    zIndex: 50,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

const mapState = (state) => {
  var { loggingIn, user } = state?.authentication;
  return { loggingIn, user };
};
const actionCreators = {
  logout: userActions.logout,
  login: userActions.login,
  register: userActions.register,
  update: userActions.update,
  authSocialMedia: userActions.loginSocialMedia,
};
export const StudentMenuComp = connect(
  mapState,
  actionCreators
)(
  withStyles(styles)(
    ({
      children,
      user,
      logout,
      login,
      register,
      authSocialMedia,
      update,
      fullContentWidth,
      noHeaderMargin,
      classes,
    }) => (
      <Grid container className="admin-container student-container">
        <Grid container item className="content">
          <Grid
            item
            xs={12}
            smup="true"
            elevation={15}
            className={classes.StudentMenuFixed}
          >
            <Hidden smDown>
              <StudentMenu
                user={user}
                logout={logout}
                update={update}
                login={login}
                register={register}
                authSocialMedia={authSocialMedia}
                noHeaderMargin={noHeaderMargin}
              />
            </Hidden>
          </Grid>
          <Hidden mdUp>
            <MobileMenu
              user={user}
              logout={logout}
              login={login}
              register={register}
              authSocialMedia={authSocialMedia}
              update={update}
            />
          </Hidden>
          <Container
            maxWidth={fullContentWidth ? false : 'lg'}
            className={clsx(
              classes.studentContainer,
              fullContentWidth ? classes.fullContentWidth : ''
            )}
          >
            {children}
          </Container>
        </Grid>
      </Grid>
    )
  )
);

export const AdminSidebarComp = ({ children }) => (
  <Grid container className="admin-container">
    <Grid item xs={2}>
      <Sidebar />
    </Grid>
    <Grid item xs={10} className="content">
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

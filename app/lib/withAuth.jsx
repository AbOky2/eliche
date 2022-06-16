import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import * as NProgress from 'nprogress';
import { StudentMenuComp } from './AuthWrapper';
import AdminDrawer from '../components/admin/drawer';
import { isAdmin, dashboardPaths } from 'helpers';
import { queryParams } from 'helpers';
import { userActions } from '../redux/_actions';
import { connect } from 'react-redux';


Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', (url) => {
  if (window && process.env.GA_MEASUREMENT_ID) {
    window.gtag('config', process.env.GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }

  NProgress.done();
});

Router.events.on('routeChangeError', () => NProgress.done());

let globalUser = null;

export default function withAuth(
  BaseComponent,
  {
    loginRequired = true,
    logoutRequired = false,
    adminRequired = false,
    fullContentWidth = false,
    noHeaderMargin = false,
  } = {}
) {
  class App extends React.Component {
    static async getInitialProps(ctx) {

      const isFromServer = typeof window === 'undefined';
      const user = ctx.req ? ctx.req.user && ctx.req.user : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }

      return props;
    }

    componentDidMount() {
      const { user, isFromServer } = this.props;
      this.props.checkUserSession(user);


      if (isFromServer) {
        globalUser = user;
      }

      if (logoutRequired && user) {
        const params = queryParams(window.location.href);

        Router.push(
          isAdmin(user)
            ? dashboardPaths.admin
            : `${dashboardPaths.student}${
                params?.id ? `/property/buy/${params.id}` : ''
              }`
        );
      }
    }

    render() {
      const { user } = this.props;

      // if (loginRequired && !logoutRequired && !user) {
      //   return null;
      // }

      // if (adminRequired && !isAdmin(user)) {
      //   return null;
      // }

      // if (logoutRequired && user) {
      //   return null;
      // }

      // if (!user) return <BaseComponent {...this.props} />;
      if (isAdmin(user))
        return (
          <>
            <AdminDrawer user={user}>
              <BaseComponent {...this.props} />
            </AdminDrawer>
          </>
        );
      return (
        <>
          <StudentMenuComp
            user={user}
            fullContentWidth={fullContentWidth}
            noHeaderMargin={noHeaderMargin}
          >
            <BaseComponent {...this.props} />
          </StudentMenuComp>
        </>
      );
    }
  }

  const propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      isAdmin: PropTypes.bool,
    }),
    isFromServer: PropTypes.bool.isRequired,
  };

  const defaultProps = {
    user: null,
  };

  App.propTypes = propTypes;
  App.defaultProps = defaultProps;

  // const mapState = (state) => {
  //   console.log("State: ", state)
  //   const { loggingIn, user } = state.authentication;
  //   return { loggingIn, user };
  // };

  const mapDispatchToProps = (dispatch) => ({
    checkUserSession: (user) => dispatch(userActions.checkUserSession(user)),
  });

  return connect(null, mapDispatchToProps)(App);
}

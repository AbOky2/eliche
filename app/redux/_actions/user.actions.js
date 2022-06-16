import { userConstants } from '../_constants';
import {
  signIn,
  signUp,
  logOut,
  resetPassword,
  authSocialMedia,
} from '../../lib/api/public';
import { updateUserApiMethod, getUserByEmail } from '../../lib/api/customer';
import { queryParams } from 'helpers';
import { alertActions } from './alert.actions';

const redirectAfterAccess = ({ user, redirect }) => {
  const params = queryParams(window.location.href);
  if (redirect) window.open(redirect);
  window.location = user?.role === 'admin' ? '/admin' : window.location.href; // : `/dashboard${params?.id ? `/property/buy/${params.id}` : ''}`;
};
function login(args, redirect) {
  const request = (user) => ({ type: userConstants.LOGIN_REQUEST, user });
  const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.LOGIN_FAILURE, error });
  return (dispatch) => {
    dispatch(request({ username: args.username }));

    signIn(args)
      .then(({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          redirectAfterAccess({ user, redirect });
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
}

function loginSocialMedia(args, redirect) {
  const request = (provider) => ({
    type: userConstants.AUTH_SOCIAL_REQUEST,
    provider,
  });
  const success = (user) => ({ type: userConstants.AUTH_SOCIAL_SUCCESS, user });
  const failure = (error) => ({
    type: userConstants.AUTH_SOCIAL_FAILURE,
    error,
  });
  return (dispatch) => {
    dispatch(request(args.provider));

    authSocialMedia(args)
      .then(({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          redirectAfterAccess({ user, redirect });
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
}

function update(args, callback) {
  const request = (user) => ({ type: userConstants.UPDATE_REQUEST, user });
  const success = (user) => ({ type: userConstants.UPDATE_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.UPDATE_FAILURE, error });
  return (dispatch) => {
    dispatch(request({ username: args.username }));
    updateUserApiMethod(args).then(
      ({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          if (callback) callback();
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function updateUserDataOnly(args, callback) {
  const request = (user) => ({ type: userConstants.UPDATE_REQUEST, user });
  const success = (user) => ({ type: userConstants.UPDATE_SUCCESS, user });
  return (dispatch) => {
    dispatch(request({ username: args.username }));
    dispatch(success(args));
    if (callback) callback();
  };
}

function checkUser(args) {
  const request = (user) => ({ type: userConstants.CHECK_REQUEST, user });
  const success = (user) => ({ type: userConstants.CHECK_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.CHECK_FAILURE, error });
  return (dispatch) => {
    dispatch(request({ username: args.email }));
    getUserByEmail(args).then(
      ({ userExist }) => {
        dispatch(success(userExist));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function logout() {
  logOut().then(() => {
    window.location = '/login';
  });
  return { type: userConstants.LOGOUT };
}

function register(user) {
  const request = (user) => ({ type: userConstants.REGISTER_REQUEST, user });
  const success = (user) => ({ type: userConstants.REGISTER_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.REGISTER_FAILURE, error });
  return (dispatch) => {
    dispatch(request(user));

    signUp(user).then(
      ({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          redirectAfterAccess({ user });
          dispatch(alertActions.success('Registration successful'));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
function resetPass(args) {
  const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = (error) => ({ type: userConstants.LOGIN_FAILURE, error });
  return (dispatch) => {
    resetPassword(args)
      .then(({ user }) => {
        if (user && user._id) {
          dispatch(success(user));
          redirectAfterAccess({ user });
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };
}

const checkUserSession = (user) => ({
  type: userConstants.CHECK_USER_SESSION,
  user,
});

export const userActions = {
  login,
  logout,
  register,
  update,
  resetPass,
  updateUserDataOnly,
  checkUser,
  loginSocialMedia,
  checkUserSession,
};

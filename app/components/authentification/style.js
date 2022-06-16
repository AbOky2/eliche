import { makeStyles } from '@material-ui/core/styles';
import { redirectStyle } from 'components/wrapper';

export default makeStyles((theme) => ({
  wrapper: {
    padding: '0 2.4rem 0 2.4rem',
  },
  socialAuth: {
    padding: '1.4rem 2.4rem',
    marginTop: '1.6rem',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.lightBlue}`,
    borderRadius: '1rem',
    '& p': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        marginLeft: '1.3rem',
      },
      marginLeft: '2.0rem',
      fontWeight: '700',
      color: theme.palette.newDark,
    },
  },
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
    marginTop: '1.6rem',
    '& > div:first-of-type': {
      width: '100%',
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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1.6rem 3.5rem',
    marginBottom: '2.4rem',
    '& > div': {
      width: 'auto',
    },
  },
  noHeaderMargin: {
    marginBottom: 0,
  },
  logoContainer: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    '& a': {
      margin: 'auto',
      '& img': {
        width: 20,
      },
    },
  },
  navContainer: {
    width: 'auto',
    marginLeft: '1.6rem',
    '& > div .active-nav-link': {
      backgroundColor: 'rgba(79, 128, 255, 0.19)',
      border: '1px solid #c1cde7',
    },
    '& > div a': {
      display: 'flex',
      margin: '4px 0',
      padding: '.8rem 1.6rem',
      width: '100%',
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
    },
    '& > div span': {
      color: '#1a2e6c',
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      fontSize: '1.4rem',
      lineHeight: '2.8rem',
    },
    '& > div .active-nav-link span': {
      color: '#4f80ff',
    },
    '& > div .active-nav-link svg path': {
      fill: '#4f80ff',
    },
    '& > div svg path': {
      // fill: '#1a2e6c',
    },
  },
  mobileContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#FCFCFD',
    border:'1px solid',
    borderColor:'#EAEFFA',
    
    padding: '.3rem 2rem',
    boxSizing: 'border-box',
    zIndex: 10,
    '& > div a': {
      display: 'inline-block',
      width: 'fit-content',
      marginBottom: 0,
      textAlign: 'center',
      padding: '1rem .3rem',
    },
    '& > div p': {
      margin: '4px 0 6px',
      fontSize: 10,
      color: theme.palette.blue,
    },
    '& span': {
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },
  calendar: {
    textAlign: 'center',
  },
  drawer: {
    padding: '2.7rem',
  },
  rightMenu: {
    '& > div:first-of-type': {
      textAlign: 'center',
      '& > div': {
        paddingLeft: '2rem',
        '& > span': {
          paddingLeft: 0,
        },
      },
      '& a': {
        ...theme.typography.body1,
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '1.4rem',
        color: theme.palette.blue,
      },
    },
    '& > div:nth-child(2)': {
      marginRight: 0,
      paddingLeft: '2rem',
      [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
      },

      '& > div': {
        padding: '1.5rem 0rem',
        width: '100%',

        '& > div': {
          '&:last-of-type': {
            paddingRight: '0!important',
          },
          '& p': {
            marginRight: '2rem',
            paddingRight: '0!important',
          },
          '& > svg:last-of-type': {
            right: '-2rem',
          },
        },
        [theme.breakpoints.down('sm')]: {
          padding: '1.5rem 2.4rem',
          '& > div': {
            paddingRight: '2rem!important',
            '& p': {
              maxWidth: 'initial!important',
            },
          },
        },
      },
      '& svg': {
        marginRight: '1.5rem',
      },
      '& span': {
        fontSize: 14,
        padding: 0,
        color: theme.palette.newBlue,
      },
    },
  },
  rightMenuMobile: {
    '& > div:first-of-type': {
      width: '100%',
      marginTop: '3rem',
      textAlign: 'left',
      '& span': {
        paddingLeft: 5,
      },
    },
    '& > div:nth-child(2)': {
      marginRight: '2rem',
      margin: '2.4rem 0',
      '& > div:first-of-type': {
        padding: 0,
        '& > div:first-of-type': {
          left: 0,
        },
        '& > div:last-of-type': {
          left: 0,
          padding: 0,
          justifyContent: 'flex-start',
          '& > svg': {
            margin: 0,
            height: '2.1rem!important',
            '&:last-child': {
              display: 'none',
            },
          },
          '& > p': {
            padding: 0,
            paddingLeft: 4,
            margin: 0,
          },
        },
        width: '100%',
      },
      '& svg': {
        marginRight: '1.5rem',
      },
      '& span': {
        fontSize: 14,
        padding: 0,
        color: theme.palette.newBlue,
      },
    },
    '& > div:last-of-type': {
      '& > div': {
        paddingLeft: '2.4rem',
      },
    },
  },
  activeLink: {
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 2rem)',
      left: 'calc(1rem)',
      borderBottom: `1px solid ${theme.palette.newBlue}`,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'initial',
    },
    '& svg path': {
      fill: '#4f80ff!important',
      stroke: '#4f80ff!important',
    },
    '& span': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
  mobileActiveMobile: {
    '&::after': {
      display: 'none',
    },
    '& p': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
  mobileDrawerActiveMobile: {
    '&::after': {
      display: 'none',
    },
    '& svg path': {
      fill: '#4f80ff!important',
      stroke: '#4f80ff!important',
    },
    '& span': {
      color: `${theme.palette.newBlue}!important`,
    },
  },
}));

export default useStyles;

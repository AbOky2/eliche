import { makeStyles } from '@material-ui/core/styles';
import { btnHover } from 'components/form/Btn';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: theme.palette.newBlue,
  },
  save: {
    color: theme.palette.button,
    fontSize: '1.8rem',
    marginBottom: 30,
    '& > div': {
      position: 'absolute',
      bottom: 0,
      cursor: 'pointer',
      width: '25%',
      justifyContent: 'center',
      transform: 'translateY(50%)',
      fontWeight: 600,
      color: 'transparent',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    },
    '& svg': {
      marginRight: 15,
    },
  },
  saved: {
    '& > div': {
      color: 'transparent',
    },
  },
  subTitle: {
    margin: '4px 0 22px',
    color: 'rgba(26, 46, 108, 0.75)',
  },
  setpsContainer: {
    paddingRight: '2.4rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
    '& h3': {
      marginBottom: 8,
      fontWeight: 800,
    },
    '& > div:first-of-type': {
      padding: '3.2rem',
      borderRadius: '2.5rem',
      color: 'white',
      background: 'white',
      '& li': {
        marginBottom: 15,
      },
      '& span': {
        padding: '0 5px',
        marginRight: 10,
        borderRadius: '3px',
      },
    },
  },
  houseInfo: {
    marginTop: '1.8rem',
    fontWeight: 600,
    '& > div > div span': {
      color: theme.palette.blue,
    },
    '& > div > div:first-of-type': {
      marginRight: 40,
    },
    '& svg': {
      marginRight: 8,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div > div': {
        '&:first-of-type': {
          marginRight: '1.5rem',
        },
      },
    },
  },
  searchContainer: {
    marginBottom: 22,
    '& > div:last-of-type svg': {
      position: 'absolute',
      right: 0,
      top: '50%',
      width: 40,
      height: 40,
      transform: 'translateY(-50%)',
    },
    '& > div:nth-child(2) > div > div > div': {
      backgroundColor: 'white',
      borderRadius: 0,
    },
    '& > div:first-of-type input': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none',
      width: '100%',
    },
    '& > div:last-of-type input': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  description: {
    marginTop: '6rem',
    marginBottom: '4rem',
    '& h2, & h1 > div:last-of-type ': {
      color: theme.palette.blue,
    },
    '& > div:first-of-type > p': {
      marginBottom: 10,
      color: theme.palette.newGray,
      fontSize: '1.4rem',
    },
    '& > div:last-of-type h1 span': {
      fontSize: '1.2rem',
      color: theme.palette.newGray,
    },
    '& > div:last-of-type > div': {
      marginTop: '2.4rem',
    },
    [theme.breakpoints.down('sm')]: {
      '& h2, & h1 ': {
        marginTop: '1rem',
      },
    },
  },
  extraContainer: {
    paddingTop: '16px',
    '& > div': {
      marginTop: '2rem',
      boxSizing: 'border-box',
      padding: 24,
      background: 'white',
      borderRadius: '12px',
      border:'1px solid #EAEFFA',
      [theme.breakpoints.down('md')]: {
        marginTop: '2.5rem!important',
      },
      '&:first-of-type': {
        marginTop: 0,
      },
      '& svg': {
        marginRight: '1rem',
      },
      '& h3': {
        color: theme.palette.blue,
        marginBottom: '1.8rem',
        fontWeight: 800,
      },
      '& > div:last-of-type > div p ': {
        color: theme.palette.newGray,
        marginBottom: '1.2rem',
      },
      '& > div:first-of-type': {
        marginBottom: 20,
      },
      '& > div:last-of-type h6': {
        maxWidth: 'calc(100% - 32px)',
      },
      '& > div:last-of-type svg': {
        marginRight: 8,
      },
    },
    '& > span': {
      display: 'block',
      textAlign: 'center',
      marginTop: '2.4rem',
      '& > div': {
        margin: 'auto',
      },
    },
  },
  extras: {
    '& > div > div': {
      marginBottom: '1.3rem',
      '&:last-of-type': {
        marginBottom: 0,
      },
      '& p': {
        marginBottom: '0!important',
      },
    },
  },
  transportations: {
    position: 'relative',
    '& > div ': {
      '& > div': {
        textAlign: 'center',
        marginBottom: 0,
        '& h2': {
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          minHeight: 41,
        },
        '& svg': {
          marginRight: '0!important',
        },
        '& ul': {
          margin: 0,
          padding: 0,
          listStyle: 'none',
          maxHeight: '20rem',
          overflow: 'hidden',
          '& li': {
            marginBottom: '.5rem',
          },
        },
      },
    },
  },
  transportationsWithExtra: {
    '& ul': {
      maxHeight: 'initial!important',
    },
    '& svg': {
      margin: '0!important',
    },
  },
  transportDisplayMore: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    '& > svg': {
      margin: 'auto 0!important',
    },
  },
  extraInfo: {
    '& > div': {
      boxSizing: 'border-box',
      padding: 32,
      background: theme.palette.hoverGray,
      borderRadius: '12px',
      '& svg': {
        marginRight: '1rem',
      },
    },
    '& h3': {
      color: theme.palette.blue,
      marginBottom: 32,
    },
    '& > div:last-of-type > div h6 ': {
      color: '#526190',
    },
    '& > div:first-of-type': {
      marginBottom: 20,
    },
    '& > div:last-of-type h6': {
      marginBottom: 9,
    },
    '& > div:last-of-type svg': {
      marginRight: 8,
    },
  },
  fees: {
    '& h3': {
      color: `${theme.palette.newBlue}!important`,
      fontSize: '2rem',
      '&:first-of-type': {
        marginBottom: '.4rem',
      },
      '&:last-of-type': {
        marginTop: '3.2rem',
        marginBottom: 0,
      },
    },
    '& p': {
      color: theme.palette.newGray,
      marginBottom: '2.4rem',
      '&:first-of-type': {
        fontSize: '1.2rem',
        fontFamily: theme.typography.secondFontFamily,
        fontWeight: 'bold',
        marginBottom: '1.6rem',
      },
      '& span': {
        color: theme.palette.newBlue,
        fontSize: '1.4rem',
      },
    },
  },
  mapContainer: {
    marginTop: '2.5rem',
    borderRadius: '12px',
    overflow: 'hidden',
    '& > div': {
      minHeight: 400,
    },
    '& img': {
      display: 'block',
      width: '100%',
    },
  },
  discoveryContainer: {
    marginTop: '4rem',
    '& h2': {
      color: theme.palette.blue,
      marginBottom: '4rem',
    },

    '& > div > div:last-of-type > div:first-of-type': {
    /*{ borderBottom: '1px solid rgba(205, 210, 216, 1)',}*/
    },
    '& > div > div': {
      width: '100%',
      '& > div:first-of-type': {
        padding: '16px 0',
        '& > div:first-of-type': {
          display: 'none',
          padding: '0 2rem',
        },
        [theme.breakpoints.down('sm')]: {
          '& > div': {
            display: 'none',
          },
          '& > div:first-of-type': {
            display: 'flex',
          },
        },
      },
    },
  },
  phoneContainer: {
    display: 'inline-block',
    '& > p': {
      fontSize: '1.2rem',
      marginTop: '.8rem',
      fontFamily: theme.typography.secondFontFamily,
      textAlign: 'right',
      color: theme.palette.newGray,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
      '& > div': {
        margin: 'auto!important',
        textAlign: 'center',
      },
    },
  },
  modal: {
    '& > div > div': {
      '& > span': {
        fontFamily: 'Space Grotesk',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '22px',
        display: 'inline-block',
        alignItems: 'center',
        color: theme.palette.newBlue,
        background: 'white',
        border: `1px solid ${theme.palette.newBlue}`,
        boxSizing: 'border-box',
        borderRadius: '10px',
        padding: '1.6rem',
      },
    },
  },
  anchorLink: {
    width: 'fit-content',
    background:
      'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
    boxShadow:
      '0px 4px 14px rgba(14, 108, 218, 0.35), inset 0px 0px 6px rgba(24, 72, 196, 0.6)',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.8rem',
    fontWeight: '600',
    padding: '18px 23px',
    ...btnHover.blue,
  },
  priceCta: {
    width: '100%',
    textAlign: 'right',
    '& h1': {
      color: theme.palette.blue,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  ecologyContainer: {
    position: 'relative',
    marginTop: '5rem',
    '& > div:first-of-type': {
      position: 'absolute',
      top: '-2.5rem',
      left: 0,
      backgroundColor: '#3e8743',
    },
    '& > div:last-of-type': {
      marginLeft: '5rem',
      backgroundColor: '#f5f5f5',
      padding: '1rem 2rem',
      borderRadius: '2.5rem',
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  totalAvailable: {
    position: 'relative',
    width: 'fit-content',
    padding: '1rem 1.6rem',
    cursor: 'pointer',
    zIndex: 1,
    '&::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: '.8rem',
      background:
        'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
      width: '100%',
      height: '100%',
      opacity: '.1',
      zIndex: -1,
    },
  },
}));

export default useStyles;

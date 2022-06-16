import { withStyles } from '@material-ui/core';
import { btnHover } from 'components/form/Btn';

const inputRadius = '20px';

const styles = (theme) => ({
  searchMapContainer: {
    '& > div:first-of-type > div:first-of-type > div:last-of-type > svg ': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      '& > div:first-of-type': {
        position: 'absolute',
        top: 0,
        left: '15%',
        transform: 'translateY(calc(10% + 1rem))',
        zIndex: 1,
        width: '70%',
        '& > div:first-of-type > div:last-of-type > svg': {
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 3,
          transform: 'initial',
        },
      },
    },
  },
  resetSearchMapContainer: {
    '& > div:first-of-type': {
      position: 'relative',
      margin: '1.6rem auto',
      transform: 'initial',
      left: 0,
      '& > div': {
        '& > div > svg': {
          top: '.50rem!important',
          right: '1rem!important',
          width: '3.2rem!important',
          height: '3.2rem!important',
          background: 'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
         padding: '8px',
          borderRadius: '12px',
          '& rect': {
            fill: 'none',
          },
        },
        '& > span': {
          display: 'none',
        },
      },
    },
  },
  card: {
    width: 'calc(100% - 14px)',
  },
  title: {
    color: '#4F80FF',
  },
  subTitle: {
    margin: '4px 0 22px',
    color: 'rgba(26, 46, 108, 0.75)',
  },
  setpsContainer: {
    marginBottom: '40px',
    padding: '3.2rem',
    borderRadius: '2.5rem',
    color: 'white',
    background: 'white',
    boxShadow:
      '0px 4px 13px rgb(0 0 0 / 10%), inset 0px -3px 10px rgb(149 149 149 / 20%)',
    '& ul': {
      paddingLeft: 0,
    },
    '& li': {
      marginBottom: 15,
    },
    '& span': {
      padding: '0 5px',
      color: 'white',
      marginRight: 10,
      background: '#4F80FF',
      borderRadius: '3px',
    },
  },
  searchContainer: {
    maxWidth: '942px',
    margin: 'auto',
    marginBottom: '1.6rem',
    '& input:focus': {
      border: `solid 1px ${theme.palette.lightGray}`,
    },
    '& > div:first-of-type': {
      position: 'relative',
      zIndex: 30,
    },
    '& > div:last-of-type > div > div:first-of-type > input': {
      borderTopRightRadius: inputRadius,
      borderBottomRightRadius: inputRadius,
    },
    '& > div:first-of-type > div': {
      height: '100%',
      '& > div': {
        '&:first-of-type': {
          minHeight: 62,
          borderRadius: inputRadius,
          ...theme.ui.searchInput,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 0,
          boxShadow: 'none',
          border: '2px solid #EAEFFA',
          borderColor: theme.palette.lightBlue,
          height: '100%',
          [theme.breakpoints.down('sm')]: {
            borderRadius: '1.1rem!important',
            border: '2px solid #EFF4FF',
            padding:"9px",
            minHeight: 46,
          },
        },
        '& input': {
          ...theme.ui.searchInput,
          width: '100%!important',
        },
        '&:last-of-type': {
          '& > div > div': {
            paddingLeft: '1.6rem',
          },
          zIndex: 3,
          '& input': {
            ...theme.ui.searchInput,
          },
        },
      },
    },
    '& > div:nth-child(2) > div > div > div': {
      backgroundColor: 'white',
      borderRadius: 0,
    },
    '& > div:first-of-type input': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none',
    },
    '& > div:last-of-type input': {
      margin: 0,
      borderLeft: 'none',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'block',
        width: '100%',
      },
      '& > div:nth-child(2) > div > div > div': {
        backgroundColor: 'white',
        borderRadius: 0,
      },
      '& > div input': {
        borderRadius: inputRadius,
      },
      '& > div:first-of-type input': {
        borderRight: `1px solid ${theme.palette.lightBlue}`,
        borderBottom: `1px solid ${theme.palette.lightBlue}`,
        borderRadius: '0 !important',
      },
      '& > div:last-of-type input': {
        borderLeft: `1px solid ${theme.palette.lightBlue}`,
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        borderTop: 'none',
      },
    },
  },
  isLocation: {
    '& > div:last-of-type input': {
      borderLeft: `1px solid ${theme.palette.lightBlue}`,
    },
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    margin: '2rem 0',
    '& span': {
      marginRight: '1rem',
    },
  },
  locationMaxBudget: {
    '& input': {
      border: `2px solid ${theme.palette.lightBlue}`,
    },
  },
  changeViewContainer: {
    position: 'absolute',
    top: '2.5rem',
    left: '2.5rem',
    width: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  reloadMapsContainer: {
    position: 'absolute',
    top: '2.5rem',
    left: '50%',
    width: 'fit-content',
    transform: 'translateX(-50%)',
    [theme.breakpoints.down('sm')]: {
      top: 0,
    },
    '& > div': {
      width: 'fit-content',
      cursor: 'pointer',
      marginTop: 0,
      '&:first-of-type': {
        padding: '.8rem 1.6rem',
        '& > p': {
          width: 'fit-content',
        },
      },
      '&:nth-child(2)': {
        margin: '1.3rem auto 0',
        background: theme.palette.newBlue,
        padding: '.8rem 1.6rem',
        borderRadius: '1rem',
        boxShadow:
          '0px 4px 14px rgba(14, 108, 218, 0.35), inset 0px 0px 6px rgba(24, 72, 196, 0.6)',
        ...btnHover.blue,
        '& path': {
          strokeWidth: 0,
        },
        '& p': {
          paddingLeft: '1rem',
          color: 'white',
        },
      },
    },
  },
  changeView: {
    ...theme.ui.bordered,
    display: 'flex',
    marginTop: 0,
    alignItems: 'center',
    padding: '.8rem 1.4rem',
    border: `1px solid ${theme.palette.lightGray}`,
    backgroundColor: 'white',
    borderRadius: '.8rem',
    textAlign: 'right',
    fontSize: '1rem',
    cursor: 'pointer',
    '& span': {
      paddingRight: '1rem',
      ...theme.typography.body1,
      fontSize: '1.4rem',
      marginLeft: 'auto',
      color: theme.palette.blue,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      position: 'absolute',
      top: 55,
      left: '50%',
      transform: 'translateX(-50%)',
      '& > svg': {
        position: 'initial!important',
        transform: 'initial!important',
        top: 0,
      },
      '& span': {
        paddingLeft: '.8rem',
      },
    },
  },
  listContainer: theme.ui.listContainer,
  mapsListContainer: {
   
    '& > a > div': {
      display: 'flex',
      borderRadius: '1.5rem',
      '& > div:first-of-type': {
        display: 'flex',
        jsutifyContent: 'stretch',
        width: '40%',
        minHeight: '100%',
        '& > div': {
          ...theme.ui.bordered,
          borderRadius: '1rem',
          position: 'initial',
          width: '100%',
          height: '100%',
          '& > span': {
            top: '1.6rem',
            right: '1.6rem',
          },
        },
      },
      '& > div:last-of-type': {
        width: '60%',
        padding: '2.5rem 1.6rem',
        paddingRight: '3.5rem',
        '& > p:last-of-type': {
          textAlign: 'left',
        },
      },
    },
  },
  mapsCurrListContainer: {
    border: `1px solid ${theme.palette.newBlue}`,
  },
  mapsMobileListContainer: {
    padding: 0,
    '& > a > div > div:first-of-type > div': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& > a > div > div:last-of-type': {
      padding: '1.6rem',
      '& h4': {
        fontSize: '1.4rem',
      },
      '& p': {
        fontSize: '1.2rem',
      },
    },
  },
  listViewContainer: {
    height: '100%',
    padding: '0 2.4rem',
    '& > div:last-of-type': {
      height: '100%',
      overflow: 'scroll',
      paddingBottom: '7rem',
      paddingRight: 5,
      '&::-webkit-scrollbar': {
        width: '.7rem',
        background: 'transparent',
      },
      '&::-webkit-scrollbar-track': {
        width: '.7rem',
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.2)',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        borderRadius: '.7rem',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    },
  },
  mapsViewContainer: {
    height: 'calc(100vh - 218px)',
    overflow: 'hidden',
    flexFlow: 'initial',
    '& > div': {
      '&:first-of-type': {
        maxWidth: 550,
      },
      '&:last-of-type': {
        position: 'sticky',
        top: 0,
        minHeight: '80vh',
        maxHeight: '100vh',
        maxWidth: '100%',
        flexGrow: 1,
        '& > div': {
          zIndex: 3,
          '&:first-of-type': {
            borderTopLeftRadius: '1.5rem',
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
              borderTopLeftRadius: 0,
            },
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        '&:first-of-type': {
          display: 'none',
        },
        '&:last-of-type': {
          paddingLeft: 0,
          minHeight: '65vh',
          '& > div:last-of-type': {
            position: 'absolute',
            bottom: '2rem',
          },
        },
      },
    },
  },
  fullMapsViewContainer: {
    '& > div:last-of-type': {
      width: '100%',
      '& > div:first-of-type': {
        borderTopLeftRadius: 0,
      },
    },
  },
  mdMapsViewContainer: {
    height: 'calc(100vh - 160px)',
  },
  pagination: {
    marginTop: '1rem',
  },
  paginationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    height: '32px',
    margin: '0 3px',
    padding: '0 6px',
    fontSize: '1.4rem',
    minWidth: '32px',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: '1.43',
    borderRadius: '16px',
    userSelect: 'none',
  },
  paginationDisabledItem: {
    cursor: 'initial',
    opacity: 0.38,
  },
  paginationSelectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    margin: '2rem 0',
    '& span': {
      marginRight: '1rem',
    },
  },
  sortContainer: {
    marginBottom: '1.6rem',
    '& > div': {
      minWidth: '42%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
        padding: '0!important',
        '&:last-of-type': {
          marginTop: '.8rem',
          textAlign: 'center',
          '& span': {
            marginLeft: 'initial',
          },
        },
      },
      '&:first-of-type': {
        '& select': {
          ...theme.ui.bordered,
          backgroundColor: theme.palette.lightBlue,
          padding: '1.27rem 3.5rem 1.27rem 1.4rem',
          color: theme.palette.newBlue,
        },
        '& fieldset': {
          border: 'none',
        },
        '& svg': {
          fill: theme.palette.newBlue,
        },
      },
      '&:last-of-type': {
        '& > div': {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
});
export default withStyles(styles);

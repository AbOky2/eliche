const styles = (theme) => ({
  header: {
    '&> p': {
      color: theme.palette.newGray,
      fontFamily: theme.typography.secondFontFamily,
    },
  },
  headerPricing: {
    '& > p > strong': {
      color: theme.palette.blue,
      fontWeight: 'bold',
    },
  },
  discoveryContentHeader: {
    padding: '2.5rem 0',
    fontFamily: theme.typography.secondFontFamily,
    borderTop: '1px solid rgba(26, 46, 108, 0.5)',
    width:'800px',
    color: theme.palette.newBlue,

    [theme.breakpoints.down('sm')]: {
      
      display: 'none',
      '& > div': {
        display: 'none',
      },
    },
  },
  discoveryContent: {
    marginBottom: '2.4rem',
    '& > div:first-of-type': {
      display: 'none',
    },
    '& > div:last-child > div > div': {
      margin: 'auto',
      fontSize: '1rem',
      color: theme.palette.newBlue,
      border: `1px solid ${theme.palette.newBlue}`,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        display: 'none',
        
      },
      '& > div:first-of-type': {
        display: 'flex',
        borderTop: '1px solid #CDD2D8',
        '& > div:last-of-type': {
          marginTop: '1.6rem',
          padding: 0,
          '& > div': {
            color: theme.palette.newBlue,
          },
        },
      },
    },
  },
  contentContainer: {
    '& > div': {
      fontWeight: 400,
      lineHeight: '17px',
      fontSize:'14px',
    },
  },
  btnContainer: {
    '& a': {
      padding: '10px 23px',
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: theme.palette.newBlue,
    },
  },
  mail: {
    '& > div': {
      marginBottom: '2.8rem',
      '&:last-of-type': {
        marginTop: '2.4rem',
      },
      '& > div:first-of-type': {
        textAlign: 'right',
        padding: '1.25rem 1rem 0 0',
        [theme.breakpoints.down('sm')]: {
          textAlign: 'left',
        },
      },
      '& > div:nth-child(2)': {
        padding: '1.5rem 2rem',
        borderRadius: '1rem',
        fontWeight: 600,
        border: `1px solid ${theme.palette.lightBlue}`,
        color: theme.palette.blue,
      },
      '& > div:last-child': {
        paddingLeft: '1rem',
      },
    },
  },
  copy: {
    width: 'fit-content',
    height: 'fit-content',
    padding: '1.5rem 2rem',
    borderRadius: '1rem',
    color: theme.palette.newBlue,
    border: `1px solid ${theme.palette.newBlue}`,
    boxShadow:
      '0px 4px 14px rgba(14, 108, 218, 0.35), inset 0px 0px 6px rgba(24, 72, 196, 0.6)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'box-shadow .1s ease-out',
    '&:hover': {
      boxShadow:
        '0px 4px 14px rgba(14, 108, 218, 0.5), inset 0px 0px 6px #1848C4',
      transition: 'box-shadow .1s ease-out',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    '& svg': {
      marginRight: '1rem',
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
  },
  copied: {
    background:
      'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
    boxShadow:
      '0px 4px 14px rgba(14, 108, 218, 0.75), inset 0px 0px 6px rgba(123, 160, 255, 0.7)',
    color: 'white',
    '& path': {
      fill: 'white',
    },
    '&:hover': {
      background:
        'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
      boxShadow:
        '0px 4px 14px rgba(14, 108, 218, 0.75), inset 0px 0px 6px rgba(123, 160, 255, 0.7)',
    },
  },
});

export default styles;

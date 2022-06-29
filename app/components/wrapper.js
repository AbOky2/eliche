import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const redirectStyle = (theme) => ({
  display: 'inline-block',
  position: 'sticky',
  top: '133px',
  width:"30px", height:"30px", borderRadius:"50%",
  backgroundColor: 'white',
  zIndex: 35,
  [theme.breakpoints.down('sm')]: {
    top: '61px',
  },
  '& h4': {
    textAlign: 'left',
    color: theme.palette.newBlue,
    fontFamily: theme.typography.fontFamily,
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    '&::before': {
      content: "''",
      border: `1px solid ${theme.palette.newBlue}`,
      borderWidth: '0 2px 2px 0',
      display: 'inline-block',
      padding: '5px',
      transform: 'rotate(135deg);-webkit-transform: rotate(135deg)',
      marginLeft:"12px",
      marginBottom:"7px"
    },
  },
});

const styles = (theme) => ({
  container: {
    margin: 'auto',
    padding: '0 0 5.5rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: '2rem',
    },
  },
  noPadding: {
    padding: 0,
  },
  redirectStyle: redirectStyle(theme),
  mobilePadding: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2rem',
    },
  },
});

const AdminContentWrapper = withStyles(styles)(
  withRouter(
    ({
      classes,
      router,
      href,
      noRedirect,
      noPadding,
      mobilePadding,
      children,
    }) => (
      <Grid
        className={clsx(
          classes.container,
          noPadding ? classes.noPadding : '',
          mobilePadding ? classes.mobilePadding : ''
        )}
      >
        {noRedirect ? (
          ''
        ) : (
          <div
            className={classes.redirectStyle}
            onClick={(e) => {
              router.push("https://app.kitlenid.fr/dashboard/search/buy")
              //if (href) router.push(href);
              //else router.back();
            }}
          >
            <Typography variant="h4"></Typography>
          </div>
        )}
        {children}
      </Grid>
    )
  )
);

export { AdminContentWrapper, redirectStyle };

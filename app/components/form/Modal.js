/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Btn, Icon } from 'components';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: '10rem',
    paddingLeft: '2rem',
    width: '366px',
    height: 'calc(100% - 2rem)',
    borderRadius:"12px",
  },
  title: {
    paddingTop: '4rem',
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.grayBlue}`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      ...theme.space.bodyWrapper,
      paddingTop: '2rem',
    },
    '& h2': {
      fontWeight: 800,
    },
  },
  close: {
    position: 'absolute',
    top: 35,
    right: 35,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: '2rem',
      right: '1rem',
    },
  },
  contentContainer: {
    display: 'inline-block',
    width: '100%',
    margin: '0 auto 1rem',
    padding: '4rem 0 5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0 4rem',
    },
  },
  noDivider: {
    borderBottom: `none`,
    paddingBottom: 0,
  },
  btnContainer: {
    marginTop: 30,
    '& > div:first-of-type': {
      paddingRight: 11,
      '& div': {
        marginLeft: 'auto',
      },
    },
    '& > div:last-of-type': {
      paddingLeft: 11,
    },
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '2rem',
      },
    },
  },
}));
export const Modal = ({
  children,
  openModal,
  onClose,
  title,
  showActions = true,
  showDivider = true,
  onClick,
  confirmText = 'Confirmer',
  ...props
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={!!openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // disableBackdropClick
      // fullWidth
      // maxWidth="lg"
      className=' p-3 rounded-xl h-[700px] '
      // {...props}
    >
      <div className={classes.close} onClick={onClose}>
        <Icon type="close" size='large' />
      </div>
      <div>
        {title ? (
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        ) : (
          ''
        )}
        <div
          className={clsx(
            classes.contentContainer,
            !showDivider ? classes.noDivider : ''
          )}
        >
          {children}
        </div>
        {showActions && (
          <Grid container justify="center" className={classes.btnContainer}>
            <Grid item md={6}>
              <Btn text="Annuler" whiteColor onClick={onClose} />
            </Grid>
            <Grid item md={6}>
              <Btn text={confirmText} onClick={onClick} />
            </Grid>
          </Grid>
        )}
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  openModal: PropTypes.bool,
  showDivider: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  confirmText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  title: '',
  openModal: false,
  showDivider: true,
  showActions: true,
  onClick: null,
  confirmText: 'Confirmer',
};

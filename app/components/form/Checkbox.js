import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Grid,
  Checkbox as MaterialCheckbox,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 'fit-content',
    margin: '2rem 0 .8rem',
    padding: '1.6rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.hoverGray,
    },
    '& p': {
      width: 'calc(100% - 32px)',
    },
  },
  bordered: {
    border: `1px solid ${theme.palette.lightBlue}`,
  },
  cornered: {
    borderRadius: '1rem',
  },
  root: {
    padding: '0 1.6rem 0 0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: `inset 0 0 0 1px rgba(79, 128, 255,.2), inset 0 -1px 0 rgba(79, 128, 255,.1)`,
    backgroundColor: '#f5f8fa',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    boxShadow: 'none',
    backgroundImage:
      'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}));

export const Checkbox = ({
  checked = false,
  bordered = false,
  cornered = false,
  label = '',
  onChange,
}) => {
  const [state, setState] = useState(checked);
  const classes = useStyles();
  const toggleCheck = () => {
    const newState = !state;
    setState(newState);
    onChange && onChange(newState);
  };

  return (
    <Grid
      container
      alignItems="center"
      className={clsx(
        classes.container,
        bordered ? classes.bordered : '',
        cornered ? classes.cornered : ''
      )}
      onClick={toggleCheck}
    >
      <MaterialCheckbox
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        checked={state}
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
      />
      <p className=' text-_gris text-xs'>{label}</p>
    </Grid>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  bordered: PropTypes.bool,
  cornered: PropTypes.bool,
};
Checkbox.defaultProps = {
  checked: false,
  bordered: false,
  cornered: false,
};

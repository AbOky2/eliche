/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Select as MaterialSelect,
  Grid,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { toggleArray, isArray, useToggleOpen } from 'helpers';
import { Icon } from 'components';

const positionType = ['', 'left', 'right'];

const styles = (theme) => ({
  container: {
    // [theme.breakpoints.down('sm')]: {
    //   height: '0.5rem',
    // },
    '& select': {
      [theme.breakpoints.down('sm')]: {
        padding: '1.4rem 1.2rem',
        fontSize: '1.2rem',
      },
      padding: '1.8rem 1.6rem',
      fontSize: '1.4rem',
      outline: 'none',
      lineHeight: '1.9rem',
      color: theme.palette.blue,
      '&:focus, &:focus-visible, &:active': {
        backgroundColor: 'initial',
      },
    },
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    fontSize: '2rem',
    margin: 0,
    '& > div': {
      borderRadius: '1rem',
      '&:hover': {
        '& fieldset': {
          borderColor: `${theme.palette.lightBlue}!important`,
        },
      },
    },
    '& fieldset': {
      border: `1px solid ${theme.palette.lightBlue}`,
      borderWidth: '1px!important',
    },
  },
  label: {
    margin: '2rem 0 .6rem',
    color: theme.palette.newBlack,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  left: {
    paddingRight: '1.3rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  right: {
    paddingLeft: '1.3rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  customSelectContainer: {
    position: 'relative',
    height: '40%',
    '& input': {
      width: '100%',
      height: '60%',
      backgroundColor: 'transparent',
      paddingRight: '3rem',
      marginTop: '0.6rem',
      border: 'none', // border: `solid 2px ${theme.palette.lightBlue}`,
      ...theme.ui.searchInput,
      paddingLeft: '1.8rem',
      [theme.breakpoints.down('sm')]: {
        padding: '2.1rem 1.4rem',
        borderRadius: '0!important',
      },
    },
    '&  input::placeholder': {
      fontSize: '1rem',
    },
    '& > span': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      zIndex: 11,
    },
    '& > svg': {
      position: 'absolute',
      top: '50%',
      right: '1rem',
      width: '1.2rem!important',
      height: '30%',
      cursor: 'pointer',
      transform: 'translateY(-50%) rotate(90deg)',
    },
    '& > div': {
      display: 'none',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '1.6rem .5rem',
      transform: 'translateY(100%)',
      backgroundColor: 'white',
      boxShadow: '0px 4.15441px 16.6176px rgba(0, 0, 0, 0.1)',
      borderRadius: '0px 0px 15px 15px',
      zIndex: 3,
      '& > div > span': {
        padding: 6,
      },
      '& > div p': {
        fontStyle: 'normal',
        color: theme.palette.blue,
      },
    },
  },
  open: {
    '& > div': {
      display: 'flex',
    },
    '& > svg': {
      transform: 'translateY(-50%) rotate(-90deg)',
    },
  },
});

export const DropdownSelect = withStyles(styles)(
  ({ onChange, value, position, list, placeholder, classes }) => {
    const [node, open] = useToggleOpen();
    const [selected, setSelected] = useState(
      (isArray(value) ? value : [value]).filter((e) => e?.length)
    );

    const handleSelected = (value) => {
      const values = toggleArray(selected, value);

      setSelected(values);
      onChange(values);
    };

    return (
      <Grid
        item
        md={position ? 6 : 12}
        xs={12}
        className={
          open
            ? clsx(classes.customSelectContainer, classes.open)
            : classes.customSelectContainer
        }
        ref={node}
      >
        <input
          value={selected.join(' - ')}
          placeholder={placeholder}
          disabled
        />
        <span />
        <Icon type="sliderArrow" size="tiny" color="newGray" />
        <Grid container>
          {list?.map((elem) => (
            <Grid
              container
              item
              key={elem.name}
              md={6}
              alignItems="center"
              className="pointer"
              onClick={() => handleSelected(elem.value + '')}
            >
              <Checkbox
                color="primary"
                checked={selected.includes(elem.value + '')}
              />
              <Typography variant="body2">{elem.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
);

export const Select = withStyles(styles)(
  ({ name, onChange, value, position, list, label, classes }) => (
    <Grid
      item
      md={position ? 6 : 12}
      xs={12}
      className={
        position
          ? clsx(classes.container, classes[position])
          : classes.container
      }
    >
      <FormControl variant="outlined" className={classes.formControl}>
        {label ? (
          <Typography className={classes.label}>{label}</Typography>
        ) : (
          ''
        )}
        <MaterialSelect
          native
          autoWidth
          value={value}
          onChange={onChange(name)}
          inputProps={{ name }}
          IconComponent={() => (
            <span style={{ position: 'absolute', right: '1.5rem' }}>
              <Icon
                type="sliderArrow"
                color="newBlue"
                size="small"
                rotate="90deg"
              />
            </span>
          )}
        >
          {list?.map((elem) => (
            <option key={elem.name} value={elem.value}>
              {elem.name}
            </option>
          ))}
        </MaterialSelect>
      </FormControl>
    </Grid>
  )
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
  list: PropTypes.arrayOf(PropTypes.object),
};
Select.defaultProps = {
  label: '',
  value: '',
  position: '',
  list: null,
};

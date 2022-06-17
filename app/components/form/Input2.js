import { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Icon } from 'components';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useToggleOpen } from 'helpers';
import SubmitIcon from 'static/img/submit.png';

const sharedInputStyle = {
  fontFamily: 'Open Sans',
  fontSize: '1.6rem',
  fontWeight: '600',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
};
const styles = (theme) => ({
  container: {
    '& input, & textarea': {
      display: 'block',
      padding: '1.6rem',
      marginBottom: '8px',
      boxSizing: 'border-box',
      width: '100%',
      height: '50px',
      borderRadius: '1rem',
      border: `solid 1px ${theme.palette.lightBlue}`,
      color: theme.palette.newBlack,
      ...sharedInputStyle,
      outline: 'none',
      fontSize: '14px',
      lineHeight: '18px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '18px',
        height: '50px',
        padding: '16px',
        borderRadius: '10px',
      },
      '&:focus': {
        border: `solid 1px ${theme.palette.newBlue}`,
        transition: 'border .1s ease-out, box-shadow .1s ease-out',
      },
    },
    '& textarea': {
      height: 'auto',
    },
    '& input:focus': {
      boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.11)',
      border: `1px solid ${theme.palette.lightBlue}`,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputContainer: {
    position: 'relative',
    cursor: 'pointer',
    '& > div': {
      position: 'absolute',
      display: 'flex',
      top: 0,
      right: 0,
      height: '100%',
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  label: {
    margin: '2rem 0 .6rem',
    color: theme.palette.newBlack,
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
  customWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderTopRightRadius: 15,
  },
  custom: {
    position: 'relative',
    height: '40%',
    '&  input': {
      width: '100%',
      // padding: '2rem',
      marginTop: '0.3rem',
      borderBottomRightRadius: '.6rem',
      borderTopRightRadius: '.6rem',
      ...sharedInputStyle,
      paddingLeft: '2.4rem',
      ...theme.ui.searchInput,
    },
    '&  input::placeholder': {
      fontSize: '1rem',
    },
    '& > div:last-of-type': {
      display: 'none',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '2.1rem',
      transform: 'translateY(100%)',
      backgroundColor: 'white',
      boxShadow: '0px 4.15441px 16.6176px rgba(0, 0, 0, 0.1)',
      borderRadius: '0px 0px 15px 15px',
      zIndex: 3,
      '& input': {
        borderRadius: '1rem!important',
        borderLeft: `1px solid ${theme.palette.lightBlue}!important`,
        '&:first-of-type': {
          margin: '1.6rem 0',
        },
      },
      '& > p': {
        fontSize: '1.2rem',
        '&:first-of-type': {
          marginTop: '1.6rem',
        },
        '&:last-of-type': {
          marginTop: '1.6rem',
          fontWeight: '600',
          fontStyle: 'italic',
          color: '#526190',
        },
      },
    },
  },
  customOpen: {
    '& > div:last-of-type': {
      display: 'flex',
    },
  },
  submit: {
    cursor: 'pointer',
    position: 'absolute',
    ...theme.ui.bordered,
    top: 0,
    height: '100%',
    overflow: 'hidden',
    right: 0,
    zIndex: 1,
    '& img': {
      display: 'block',
      height: '100%',
      transform: 'translateY(.4rem)!important',
    },
  },
});

export const GoogleMaps = ({ onChange, value, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);
  const onInputChange = (e) => setInputValue(e);
  const onClick = (e) => setInputValue('');

  return (
    <GooglePlacesAutocomplete
      apiOptions={{ language: 'fr', region: 'fr' }}
      minLengthAutocomplete={2}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['fr'],
        },
        types: ['(regions)'],
      }}
      styles={{
        description: {
          fontWeight: 'bold',
          backgroundColor: 'red',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      selectProps={{
        styles: {
          input: (provided) => ({
            ...provided,
            color: '#8C97B6',
            width: '100%',
            border: 'none',
            outline: 'none',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#8C97B6',
            fontSize: '1rem',
            width: '100%',
            fontWeight: '600!important',
            outline: 'none',
          }),
          control: (provided) => ({
            ...provided,
            outline: 'none',
            border: 'none',
            fontSize: '1rem',
            marginLeft: '1.7rem',
            boxShadow: 'none',
            marginTop: '0.3rem',
          }),
          option: (provided) => ({
            ...provided,
            color: '#8C97B6',
            fontSize: '1rem',
          }),
          menuList: (provided) => ({
            ...provided,
          }),
          menu: (provided) => ({
            ...provided,
            color: '#8C97B6',
            fontSize: '1rem',
            marginLeft: '1.7rem',
          }),
          noOptionsMessage: (provided) => ({
            ...provided,
            color: '#8C97B6',
            fontSize: '1rem',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#8C97B6',
            border: 'none',
            fontSize: '1rem',
          }),
        },
        placeholder,
        onChange,
        onInputChange,
        inputValue,
        onFocus: onClick,
        isClearable: true,
        components: {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        },
      }}
    />
  );
};
GoogleMaps.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
GoogleMaps.defaultProps = {
  value: '',
  placeholder: '',
};

const positionType = ['left', 'right'];

export const Input = withStyles(styles)(
  ({
    name,
    label,
    type,
    onChange,
    onKeyPress,
    value,
    position,
    placeholder,
    classes,
    rows = 10,
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    // console.log({ value });
    return (
      <Grid
        item
        md={position ? 6 : 12}
        className={
          position
            ? clsx(classes.container, classes[position])
            : classes.container
        }
      >
        {label ? (
          <Typography className={classes.label}>{label}</Typography>
        ) : (
          ''
        )}
        {type !== 'textarea' ? (
          type === 'phone' ? (
            <NumberFormat
              value={value}
              onChange={onChange(name)}
              placeholder={placeholder}
              onKeyPress={onKeyPress}
              format="##.##.##.##.##"
            />
          ) : (
            <div className={classes.inputContainer}>
              <input
                value={value}
                onChange={onChange(name)}
                onKeyPress={onKeyPress}
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
              />
              {type === 'password' && (
                <div onClick={toggleShowPassword}>
                  <Icon
                    size="small"
                    type={showPassword ? 'eyeOpened' : 'eyeClosed'}
                  />
                </div>
              )}
            </div>
          )
        ) : (
          <textarea
            onChange={onChange(name)}
            placeholder={placeholder}
            rows={rows}
          >
            {value}
          </textarea>
        )}
      </Grid>
    );
  }
);
export const CustomInput = withStyles(styles)(
  ({ classes, handleSumit, showSub, ...inputProps }) => {
    const [value, setValue] = useState(inputProps.value);
    const [node, open] = useToggleOpen();
    const [state, setState] = useState({
      salary: '',
      contributtion: '',
    });
    const calc = (value) => {
      const s = state.salary.split(' ').join('');
      const c = state.contributtion.split(' ').join('');
      const v = value ? parseInt(value.split(' ').join(''), 10) : value;
      let val = v || parseInt(s, 10) * 83.33 + parseInt(c, 10);
      val = Math.trunc(val);
      setValue(val);
      inputProps.onChange(val);
    };
    const onChange = ({ target: { value } }) => {
      const { salary, contributtion } = state;

      //if (salary && contributtion) return;
      calc(value);
    };
    const onKeyPress = (e) => {
      if (e.key === 'Enter') handleSumit();
    };
    const handleChange =
      (name) =>
      ({ target: { value } }) =>
        setState({ ...state, [name]: value });

    useEffect(() => {
      const { salary, contributtion } = state;

      if (salary && contributtion) calc();
      else setValue('');
    }, [state]);
    useEffect(() => setValue(inputProps.value), [inputProps.value]);

    return (
      <div className={classes.customWrapper}>
        <Grid
          container
          className={
            showSub && open
              ? clsx(classes.custom, classes.customOpen)
              : classes.custom
          }
          ref={node}
        >
          <NumberFormat
            thousandSeparator=" "
            suffix=" €"
            {...inputProps}
            value={value}
            placeholder="Quel est votre budget?"
            onChange={onChange}
            className={classes.container}
            onKeyPress={onKeyPress}
            autoComplete="off"
          />
          <Grid container>
            <Typography variant="h4">Quel est votre budget ?</Typography>
            <Typography>
              Nous vous aidons à déterminer votre budget maximal en simulant le
              montant que vous pouvez emprunter.
            </Typography>
            <NumberFormat
              thousandSeparator=" "
              suffix=" €"
              value={state.salary}
              onChange={handleChange('salary')}
              placeholder="Votre salaire net mensuel"
            />
            <NumberFormat
              thousandSeparator=" "
              suffix=" €"
              value={state.contributtion}
              placeholder="Votre apport personnel"
              onChange={handleChange('contributtion')}
            />
            <Typography>
              Ce calcul est réalisé avec les hypothèses suivantes : <br />
              durée de prêt : 25 ans <br />
              taux d’intérêt : 1,5%
            </Typography>
          </Grid>
        </Grid>
        <div
          onClick={handleSumit}
          style={{
            background:
              'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
          }}
          className="bg-blue-700 w-[50px] h-[50px] p-3 rounded-xl absolute top-[-0.9rem] left-[15.2rem]"
        >
          <Icon type="recherche" size="small" color="white" />
        </div>
      </div>
    );
  }
);
const samePropTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  classes: PropTypes.object.isRequired,
  showSub: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
};
const sameDefaultProps = {
  value: undefined,
  label: undefined,
  onKeyPress: undefined,
  type: 'text',
  placeholder: '',
  position: null,
  showSub: false,
  classes: {},
};
CustomInput.propTypes = {
  ...samePropTypes,
  handleSumit: PropTypes.func.isRequired,
};
CustomInput.defaultProps = sameDefaultProps;
Input.propTypes = samePropTypes;
Input.defaultProps = sameDefaultProps;

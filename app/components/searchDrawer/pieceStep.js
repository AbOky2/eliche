import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { propertyPiecesSelectMap } from 'helpers';
import { DropdownSelect } from 'components/form/Select';
import { toggleArray, isArray } from 'helpers';
import { Icon } from 'components';

export const PieceStep = withStyles()(
  ({
    list,
    value,
    classes,
    setStep,
    position,
    onChange,
    queryData,
    showSearch,
    placeholder,
    handleChange,
    handleSelect,
    handleNextStep,
  }) => {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const containerRef = React.useRef(null);

    const [selected, setSelected] = useState(
      (isArray(value) ? value : [value]).filter((e) => e?.length)
    );
    const handleSubmit = () => {
      const _value = parseFloat(checked);
      // console.log({ value, handleChange, handleNextStep });
      if (handleChange && handleNextStep) {
        handleChange({ name: 'pieces', value: _value });
        handleNextStep();
      }
    };

    const handleSelected = (value) => {
      const values = toggleArray(selected, value);

      setSelected(values);
      onChange(values);
    };

    return (
      <Slide direction="up" in={showSearch} container={containerRef.current}>
        <div
          className="w-full"
          style={{
            background:
              'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
            paddingTop: '50px',
            borderRadius: '5px',
            alignContent: 'center',
          }}
        >
          <Box
            sx={{
              height: '524px',
              display: 'flex',
              flexDirection: 'column',
              top: '48px',
              padding: '24px',
              color: 'black',
              backgroundColor: 'white',
              borderTopLeftRadius: '22px',
              borderTopRightRadius: '22px',
            }}
          >
            <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
              <div className="flex flex-row-reverse justify-between">
                <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-center text-[#3679ff]">
                  Pieces ?
                </p>
                <div className=" " type="button" onClick={() => setStep(1)}>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M20 12C20 16.4183 16.4183 20 12 20V22C17.5228 22 22 17.5228 22 12H20ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 4C16.4183 4 20 7.58172 20 12H22C22 6.47715 17.5228 2 12 2V4Z"
                      fill="#14181F"
                    />
                    <path
                      d="M11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L11.7071 9.70711ZM8 12L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L8 12ZM10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.2929 15.7071ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11V13ZM10.2929 8.29289L7.29289 11.2929L8.70711 12.7071L11.7071 9.70711L10.2929 8.29289ZM7.29289 12.7071L10.2929 15.7071L11.7071 14.2929L8.70711 11.2929L7.29289 12.7071ZM16 11L8 11L8 13L16 13V11Z"
                      fill="#14181F"
                    />
                  </svg>
                </div>
              </div>
              <br />
              <Grid item md={position ? 6 : 12} xs={12}>
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

                <Grid item md={4}>
                  <DropdownSelect
                    name="typeOfAnnonce"
                    placeholder="Nombre de pièces"
                    list={propertyPiecesSelectMap}
                    value={queryData}
                    onChange={handleSelect}
                  />
                </Grid>
              </Grid>
              <button
                onClick={handleSubmit}
                className={classes.submit}
                type="submit"
                style={{
                  background:
                    'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  color: 'white',
                  fontWeight: 'bold',
                  width: '120px',
                  height: '2px',
                  borderRadius: '12px',
                  border: 'transparent',
                  flexDirection: 'row',
                  margin: '12px',
                  marginLeft: '210px',
                  placeItems: 'center',
                  position: 'static',
                  padding: '22px',
                }}
              >
                Valider
              </button>
            </Box>
          </Box>
        </div>
      </Slide>
    );
  }
);

PieceStep.PropTypes = {
  classes: PropTypes.object,
  isLocation: PropTypes.bool.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  isMdView: PropTypes.bool.isRequired,
  queryData: PropTypes.object.isRequired,
  toggleView: PropTypes.func.isRequired,
  handleMapSearch: PropTypes.func.isRequired,
  handleBudget: PropTypes.func.isRequired,
  handleSumit: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const LocationStep = ({
  handleChange,
  showSearch,
  setShowSearch,
  handleNextStep,
}) => {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (e) => setInputValue(e);
  const onFocus = (e) => setInputValue('');
  const onChange = (args) => {
    handleChange({ name: 'loc', value: args.label });
    handleNextStep();
  };
  const containerRef = React.useRef(null);

  return (
    <Slide direction="up" in={showSearch} container={containerRef.current}>
      <div
        className=" w-full"
        style={{
          background:
            'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
          paddingTop: '48px',
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
                Localisation ?
              </p>
              <div
                className=" "
                type="button"
                onClick={() => setShowSearch(false)}
              >
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

            <GooglePlacesAutocomplete
              apiOptions={{ language: 'fr', region: 'fr' }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['fr'],
                },
                types: ['(regions)'],
              }}
              selectProps={{
                placeholder: 'Location',
                focus: true,
                onChange,
                onInputChange,
                inputValue,
                onFocus,
                isClearable: true,
                components: {
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                },
              }}
            />
          </Box>
        </Box>
      </div>
    </Slide>
  );
};
LocationStep.propTypes = {
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
};
LocationStep.defaultProps = {};

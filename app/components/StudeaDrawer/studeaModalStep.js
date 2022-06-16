import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect, useRef } from 'react';
import Slide from '@mui/material/Slide';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';

export const BudgetStep = withStyles()(
  ({
    classes,
    setStep,
    handleBudget,
    handleChange,
    handleNextStep,
    ...inputProps
  }) => {
  
    const containerRef = useRef(null);
   
    const handleSubmit = () => {
      const _value = parseFloat(value);
      // console.log({ value, handleChange, handleNextStep });
      if (!isNaN(_value) && handleChange && handleNextStep) {
        handleChange({ name: 'maxPrice', value: _value });
        handleNextStep();
      }
    };
    const onKeyPress = (e) => {
      if (e.key === 'Enter') handleSubmit();
    };
    const handleChange1 =
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
      <Slide direction="up" in={checked} container={containerRef.current}>
         <div
      className=' w-full'
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

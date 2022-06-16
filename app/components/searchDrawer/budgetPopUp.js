import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect, useRef } from 'react';
import Slide from '@mui/material/Slide';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';

export const BudgetPopUp = withStyles()(
  ({
    classes,
    setStep,
    handleBudget,
    handleChange,
    handleSumit,
    handleNextStep,
    showSearch,
    handleFinish,
    ...inputProps
  }) => {
    const [checked, setChecked] = useState(true);
    const [value, setValue] = useState(inputProps.value);
    const [state, setState] = useState({
      salary: '',
      contributtion: '',
    });
    const containerRef = useRef(null);
    const calc = (value) => {
      const s = state.salary.split(' ').join('');
      const c = state.contributtion.split(' ').join('');
      const v = value ? parseInt(value.split(' ').join(''), 10) : value;
      let val = v || parseInt(s, 10) * 83.33 + parseInt(c, 10);
      val = Math.trunc(val);
      setValue(val);
    };
    const onChange = ({ target: { value } }) => {
      calc(value);
      console.log({ value });
    };
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
    //     <div
    //     id="test1"
    //   style={{
    //     position: 'fixed',
    //     width:'100%',
    //     height: '100%',
    //     top: '0',
    //     left: '0',
    //     zIndex: 100,
    //     display: showSearch ? 'flex' : 'none',
    //   }}>
      <Slide direction="up" in={checked} container={containerRef.current} >
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
           

            <p className="text-base mb-2 font-bold text-left text-[#0e215c]">Votre budget</p>

              <NumberFormat
               className="w-full h-[52px] rounded-xl bg-white border-2 border-[#eff4ff]"

                thousandSeparator=" "
                suffix=" €"
                prefix="  "
                {...inputProps}
                value={value} 
                focus={true}
                placeholder="  Budget maximal"
                onChange={onChange}
                onKeyPress={onKeyPress}
                autoComplete="off"
              />
              <br />
              <br />

              <div className="flex justify-center mb-4 items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-4 rounded-xl bg-[#eff4ff] border border-[#3679ff]">
                      <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#3679ff]">
                        <span className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#3679ff]">
                          Vous ne connaissez pas{" "}
                        </span>
                        <br />
                        <span className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#3679ff]">
                          votre budget ?{" "}
                        </span>
                        <br />
                        <span className="flex-grow-0 flex-shrink-0 text-base text-left text-[#3679ff]">
                          Utiliser notre simulateur ci-dessous.
                        </span>
                      </p>
              </div>

              <p className="text-base mb-2 font-bold text-left text-[#0e215c]">Votre salaire mensuel net (avant impôt)</p>

              <NumberFormat
               className="w-full mb-4 h-[52px] rounded-xl bg-white border-2 border-[#eff4ff]"

                thousandSeparator=" "
                suffix=" €"
                prefix="   "
                value={state.salary}
                onChange={handleChange1('salary')}
                placeholder="  Votre salaire net mensuel"
              />
              
              <p className="text-base mb-2 font-bold text-left text-[#0e215c]">Votre apport</p>

           
              <NumberFormat
               className="w-full h-[52px] rounded-xl bg-white border-2 border-[#eff4ff]"
                thousandSeparator=" "
                suffix=" €"
                prefix="    "
                value={state.contributtion}
                placeholder="  Votre apport personnel"
                onChange={handleChange1('contributtion')}
              />
              <button
                onClick={handleSumit}
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

import { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Icon } from 'components';


import { GoogleMaps, CustomInput } from 'components/form/Input';
import { propertyPiecesSelectMap, isArray, typeOfAnnonciesObj } from 'helpers';

import { Grid } from '@material-ui/core';
import { DropdownSelect } from 'components/form/Select';
import { LocationStep } from 'components/searchDrawer/locationStep';
import Dialog from '@material-ui/core/Dialog';


export const SearchBar = ({}) => {
  const [queryData, setQueryData] = useState({
    loc: '',
    maxPrice: 600000,
    typeOfAnnonce: typeOfAnnonciesObj.buy,
    pieces: null,
  });
  const [state, setState] = useState({});
  const [makeRequest, setMakeRequest] = useState(false);
  const handleSelectPieces = (arg) => {
    let pieces = isArray(arg) ? arg : [arg];

    pieces = pieces.map((e) => parseInt(e, 10));
    setQueryData({ ...queryData, pieces });
  };
  const isLocation = queryData.typeOfAnnonce === typeOfAnnonciesObj.location;
  const handleFinish = () => {
    Router.push({
      pathname: 'dashboard/search/buy',
      query: { ...queryData },
    });
  };
  const handleMapSearch = (value) => {
    setQueryData({ ...queryData, loc: value?.label });
    setMakeRequest(true);
  };
  const handleBudget = (value) =>
    setQueryData({ ...queryData, maxPrice: value });

  

    const [showModal1, setShowModal1] = useState(false);
    const toggleModal1 = () => setShowModal1(!showModal1);
    const [showModal2, setShowModal2] = useState(false);
    const toggleModal2 = () => setShowModal2(!showModal2);

  return (<>
    {/* <Grid className="flex container w-[936px] h-[97px] absolute left-[106.5px] border-2 top-[398.5px] rounded-[20px] bg-black">
      <Grid item md={3}>
        <p className="relative left-[39px] top-[5px] text-[1.1rem] mt-3 font-[900] text-left text-[#4f80ff]">
          Localisation
        </p>
        <GoogleMaps
          name="loc"
          className="border-none"
          value={queryData.loc}
          onChange={handleMapSearch}
          placeholder={'Où cherchez-vous ?'}
        />
      </Grid>
      <div
        style={{
          marginTop: '1.4rem',
          marginLeft: '1.6rem',
          borderLeft: '0.08rem solid #113EB6',
          height: '50px',
        }}
      />
      <Grid item md={6}>
        <p className="relative left-[29px] top-[5px] text-[1.1rem] mt-3 font-[900] text-left text-[#4f80ff]">
          Nombre de pièce
        </p>
        <DropdownSelect
          name="typeOfAnnonce"
          placeholder="Combien de pièce souhaitez-vous?"
          list={propertyPiecesSelectMap}
          value={queryData.pieces}
          onChange={handleSelectPieces}
        />
      </Grid>
      <div
        style={{
          marginTop: '1.4rem',
          marginLeft: '1.3rem',
          borderLeft: '0.08rem solid #113EB6',
          height: '50px',
        }}
      />
      <Grid
        item
        md={5}
        // className="w-[350px] h-12"
        // className={clsx(classes.search, classes.locationMaxBudget)}
      >
        <p className="relative left-[39px] top-[5px] text-[1.1rem] mt-3 font-[900] text-left text-[#4f80ff]">
          Budget
        </p>
        <CustomInput
          name="maxPrice"
          value={
            queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
              ? queryData.maxPrice
              : ''
          }
          showSub={!isLocation}
          onChange={handleBudget}
          placeholder="Quel est votre budget?"
          handleSumit={handleFinish}
        />
      </Grid>
    </Grid> */}
    <div className='p-5 h-[100px] bg-white border-[2px] border-_bordureBleu w-full rounded-[20px] flex justify-between gap-3'>
      <div className='border-r-[1px] border-_aPropos  w-full '>
        <div className='ml-9'>
          <p className=' text-[#4F80FF] font-bold text-[16px] '>Localisation</p>
        </div>
        <div className='  '><GoogleMaps
          name="loc"
          className="border-none"
          value={queryData.loc}
          onChange={handleMapSearch}
          placeholder={'Où cherchez-vous ?'}
        /></div>
      </div>

      <div className=' w-full border-r-[1px] border-_aPropos'>
        <div>
          <p  className=' text-[#4F80FF] font-bold text-[16px] ml-7' >Nombre de pièce</p>
        </div>
        <div className='text-xs p-3 w-full'>
          
        <Dialog
          open={showModal1}
          onClose={toggleModal1}
          PaperProps={{
            style: {
              borderRadius: '12px',
              padding: '24px',
              width: '50%',
              height: '253px',
              // backgroundColor: 'red',
              display: 'absolute',
  
              top: '30%',
            },
          }}>
          <DropdownSelect
          name="typeOfAnnonce"
          placeholder="Combien de pièce souhaitez-vous?"
          list={propertyPiecesSelectMap}
          value={queryData.pieces}
          onChange={handleSelectPieces}
        />
        <div className='flex justify-end'>
                <button
                    onClick={toggleModal1}
                    // handleSumit={handleSumit}
                    type="submit"
                    className='rounded-[12px] h-[85%] w-[50%] flex justify-center p-2'
                    style={{
                      background:
                        'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                      color: 'white',
                      
                    }}
                  >
                    <p className='text-center text-bold flex justify-center'>
                    Valider</p>
                  </button>
              </div> 
        </Dialog>
        <input 
        onClick={toggleModal1}
        placeholder="Combien de pièce souhaitez-vous?"
        value={queryData.pieces}
        className=' text-[#8C97B6] font-[600] text-[16px] text-center w-full'/>
        </div>
        
         
      </div>







      <div className=' w-full '>
       <div className=' flex'>
        <div className='flex w-full flex-col'>
                <div className=' w-full'>
                  <p  className=' text-[#4F80FF] font-bold text-[16px] ml-9' >Budget</p>
                </div>
            
                <div>
                <div className=''>
                  <Dialog
                      open={showModal2}
                      onClose={toggleModal2}
                      // onClick={handleSumit}
                      showActions={false}
                      title='Budget'
                      PaperProps={{
                        style: {
                          borderRadius: '12px',
                          padding: '24px',
                          width: '30%',
                          // backgroundColor: 'red',
                          display: 'absolute',
              
                          top: '10%',
                        },
                      }}>
                            <CustomInput
                            name="maxPrice"
                            value={
                              queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
                                ? queryData.maxPrice
                                : ''
                            }
                            showSub={!isLocation}
                            onChange={handleBudget}
                            placeholder="Quel est votre budget?"
                            //handleSumit={handleFinish}
                            />
                <div className='flex justify-end'>
                <button
                    onClick={toggleModal2}
                    // handleSumit={handleSumit}
                    type="submit"
                    className='rounded-[12px] h-[85%] w-[50%] flex justify-center p-2'
                    style={{
                      background:
                        'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                      color: 'white',
                      
                    }}
                  >
                    <p className='text-center text-bold flex justify-center'>
                    Valider</p>
                  </button>
              </div>   
              </Dialog> </div>
              <input 
              onClick={toggleModal2}
                placeholder="Combien de pièce souhaitez-vous?"
                value={queryData.maxPrice}
                className=' text-[#8C97B6] font-[600] text-[16px] text-center '/>

                </div>
        </div>
            
            <div className=' w-full flex justify-end'>
                <div
                  onClick={handleFinish}
                  style={{
                    background:
                      'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                  }}
                  className=" w-[50px] h-[50px] p-3 rounded-xl "
                >
                  <Icon type="recherche" size="small" color="white" />
                </div>
            </div>
      </div>

      </div>
    </div>
    </>
    
  );
};
SearchBar.propTypes = {};
SearchBar.defaultProps = {};

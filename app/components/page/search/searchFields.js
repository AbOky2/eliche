import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { Icon } from 'components/form';
import { GoogleMaps, CustomInput } from 'components/form/Input';
import { DropdownSelect } from 'components/form/Select';
import { propertyPiecesSelectMap } from 'helpers';
import withStyles from './styles';
import {Modal} from '../../../components/form';
import Dialog from '@material-ui/core/Dialog';

import {BudgetStep} from '../../searchDrawer/budgetStep';
import {PieceStep} from '../../searchDrawer/pieceStep';

import { useState } from 'react';
import { BudgetPopUp } from 'components/searchDrawer/budgetPopUp';




const searchFields = withStyles(
  ({
    classes,
    isLocation,
    isMdView,
    queryData,
    handleMapSearch,
    handleBudget,
    handleSumit,
    handleSelect,
    toggleView,
    isMapsView,
  }) => {

    const [showModal1, setShowModal1] = useState(false);
    const toggleModal1 = () => setShowModal1(!showModal1);
    const handleSumbit = () => console.log('submit');
    const [showModal2, setShowModal2] = useState(false);
    const toggleModal2 = () => setShowModal2(!showModal2);

    const handleSubmit = () => {
      const _value = parseFloat(value);
      // console.log({ value, handleChange, handleNextStep });
      if (!isNaN(_value) && handleChange && handleNextStep) {
        handleChange({ name: 'maxPrice', value: _value });
        handleNextStep();
      }
    };

    const handleFinish = () => {
      Router.push({
        pathname: 'dashboard/search/buy',
        query: { ...state },
      });
    };
    const handleChange = ({ name, value }) =>
    setState({ ...state, [name]: value });
    
    return(

    <>
      <Grid
        className={
          isLocation
            ? clsx(classes.searchContainer, classes.isLocation)
            : classes.searchContainer
        }
      >
        <div className="bg-white rounded-[14px] w-full" >
          <div className="">
          <GoogleMaps
            name="loc"
            value={queryData.loc}
            onChange={handleMapSearch}
            placeholder={isMdView ? 'Où cherchez-vous ?' : 'Localisation'}
            
          /></div>
                     
              <div onClick={handleSumit} className="">
                <Icon type="recherche" size='small' color='white'  />
              </div>
         
        </div> 
        </Grid>

        
        <div className='flex -mt-5 gap-2 p-4  '>
          <div className=' bg-white w-full border-2 border-[#EFF4FF] rounded-xl p-1 '>
            <p className=' text-center text-sm font-bold text-[#43434A] font-_spaceGrotesk cursor-pointer'  onClick={toggleModal2} >

              Prix
            </p>
           
          </div>

          <div className=' bg-white w-full p-1 border-2 border-[#EFF4FF] rounded-xl'>
            <p className=' text-center text-sm font-bold text-[#43434A] font-_spaceGrotesk cursor-pointer' onClick={toggleModal1}>
            Nombre de pièce</p>
          </div>
          {/* <DropdownSelect
                  name="typeOfAnnonce"
                  placeholder="Nombre de pièces"
                  list={propertyPiecesSelectMap}
                  value={queryData.pieces}
                  onChange={handleSelect}
                />     */}

        </div>
        {/* {!isLocation && !isMdView && (
          <Grid item md={4}>
            <DropdownSelect
              name="typeOfAnnonce"
              placeholder="Nombre de pièces"
              list={propertyPiecesSelectMap}
              value={queryData.pieces}
              onChange={handleSelect}
            />
          </Grid>
        )}
        {!isMdView && (
          <Grid
            item
            md={isLocation ? 6 : 4}
            className={clsx(classes.search, classes.locationMaxBudget)}
          >
            <CustomInput
              name="maxPrice"
              value={
                queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
                  ? queryData.maxPrice
                  : ''
              }
              showSub={!isLocation}
              onChange={handleBudget}
              placeholder="Budget maximal"
              handleSumit={handleSumit}
            />
          </Grid>
        )} */}
        {isMdView?(<>
          <Dialog
          open={showModal1}
          onClose={toggleModal1}
          PaperProps={{
            style: {
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              height: '253px',
              // backgroundColor: 'red',
              display: 'absolute',
  
              top: '30%',
            },
          }}>
  
              <DropdownSelect
                    name="typeOfAnnonce"
                    placeholder="Nombre de pièces"
                    list={propertyPiecesSelectMap}
                    value={queryData.pieces}
                    onChange={handleSelect}
                  />      
        </Dialog> 
        
  
          <Dialog
              open={showModal2}
              onClose={toggleModal2}
              onClick={handleSumit}
              showActions={false}
              title='Budget'
              PaperProps={{
                style: {
                  borderRadius: '12px',
                  padding: '24px',
                  width: '100%',
                  height: '95%',
                  // backgroundColor: 'red',
                  display: 'absolute',
      
                  top: '20%',
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
                placeholder="Budget maximal"
                handleSumit={handleSumit}
              /> 
              {/* <BudgetPopUp 
              handleSumit = {handleSumit}
               value={
                queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
                  ? queryData.maxPrice
                  : ''
              }
              onChange={handleBudget}
  
              /> */}
  
  
                
              </Dialog>
              </>

        ):(
          <>
          <Dialog
        open={showModal1}
        onClose={toggleModal1}
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '24px',
            width: '48%',
            height: '18%',
            right:'16%',
            // backgroundColor: 'red',
            display: 'absolute',

            top: '0%',
          },
        }}>

            <DropdownSelect
                  name="typeOfAnnonce"
                  placeholder="Nombre de pièces"
                  list={propertyPiecesSelectMap}
                  value={queryData.pieces}
                  onChange={handleSelect}
                />      
      </Dialog> 
      

        <Dialog
            open={showModal2}
            onClose={toggleModal2}
            onClick={handleSumit}
            showActions={false}
            title='Budget'
            PaperProps={{
              style: {
                borderRadius: '12px',
                padding: '24px',
                width: '39%',
                height: '60%',
                right:'30%',
                // backgroundColor: 'red',
                display: 'absolute',
    
                top: '6%',
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
              placeholder="Budget maximal"
              handleSumit={handleSumit}
            /> 
           
            </Dialog>
          </>

        )}
      
       

    
    </>
    );
  }
);


searchFields.propTypes = {
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
export default searchFields;

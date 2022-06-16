import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { Icon } from 'components/form';
import { GoogleMaps, CustomInput } from 'components/form/Input';
import { DropdownSelect } from 'components/form/Select';
import { propertyPiecesSelectMap } from 'helpers';
import withStyles from './styles';
import {Modal} from '../../../components/form';
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
        <Grid >
          
          <GoogleMaps
            name="loc"
            value={queryData.loc}
            onChange={handleMapSearch}
            placeholder={isMdView ? 'Où cherchez-vous ?' : 'Localisation'}
            
          />
         
            <>
            
              <div onClick={handleSumit} className="">
                <Icon type="recherche" size='small' color='white'  />
              </div>
             
            </>
         
        </Grid> 
        
        <div className='flex mt-2 gap-2 '>
          <div className=' bg-white w-[215px] border-2 border-[#EFF4FF] rounded-xl p-1 '>
            <p className=' text-center text-sm font-bold text-[#43434A] font-_spaceGrotesk cursor-pointer'  onClick={toggleModal2} >

              Prix
            </p>
           
          </div>

          <div className=' bg-white w-[215px] p-1 border-2 border-[#EFF4FF] rounded-xl'>
            <p className=' text-center text-sm font-bold text-[#43434A] font-_spaceGrotesk cursor-pointer' onClick={toggleModal1}>
            Nombre piece</p>
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
      </Grid>

       <Modal
        openModal={showModal1}
        onClose={toggleModal1}
        onClick={handleSumbit}
        showActions={false}
        className="w-0 h-40"
        title='Pieces'>

            <DropdownSelect
                  name="typeOfAnnonce"
                  placeholder="Nombre de pièces"
                  list={propertyPiecesSelectMap}
                  value={queryData.pieces}
                  onChange={handleSelect}
                />      
      </Modal> 

        <Modal
            openModal={showModal2}
            onClose={toggleModal2}
            onClick={handleSumit}
            showActions={false}
            title='Budget'>
              
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


              
            </Modal>

    
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

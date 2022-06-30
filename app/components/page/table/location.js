/* eslint-disable react/jsx-no-duplicate-props */
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { spaceCurrency, locationAvailableDate } from 'helpers';
import { Icon, Btn } from 'components';
import styles from './styles';

const LocationTable = ({
  classes,
  state,
  currOpen,
  handleCurrOpen,
  handleSelect,
}) =>
  Object.keys(state).map((elem) => {
    const current = state[elem];
    const isOpen = currOpen === elem;
    const countList = current.list.length;
    const surface =
      current.minSurface === current.maxSurface
        ? ` ${current.minSurface}m²`
        : ` de ${current.minSurface}m² à ${current.maxSurface}m²`;

    return (
      <div
        key={elem}
        className="flex flex-col font-bold bg-white border rounded-xl  border-_rougeStudea mb-4 "
      >
        <Grid
          className="pointer h-[50px]"
          justify="space-between"
          onClick={() => handleCurrOpen(elem)}
        >
          <div className=' flex justify-between text-sm sm:text-xs text-_rougeStudea '>
            
            <div  className=' nokia:w-[140px] blackberry:w-[230px] mobile:w-[260px] w-_344'>

                {` ${elem} pièce${elem > 1 ? 's' : ''}  `}(
                
                
              {`${countList} logement${countList > 1 ? 's' : ''} disponible${
                countList > 1 ? 's' : ''
              }`})

                {/* <strong>{` ${spaceCurrency(current.minPrice)}€`}</strong> */}
            </div>
            <div  className=" order-last">
              <Icon
                type={isOpen ? 'signeM' : 'signeP'}
                size="small"
                strokeColor='red'
              />
            </div>
          </div> 
         
          <div className=' flex  text-[14px] font-bold text-_rougeStudea  w-full justify-between  '>
             <div  className=' mx-4 '>

                {` ${elem} pièce${elem > 1 ? 's' : ''} `}(
                {`${countList} logement${countList > 1 ? 's' : ''} disponible${
                countList > 1 ? 's' : ''
              }`})
              </div>
            <div  className=" order-last mx-4">
            <Icon
              type={isOpen ? 'signeM' : 'signeP'}
              strokeColor="red"
              size="small"
            />
          </div>
          </div>

        </Grid>
        {isOpen && (
         <div className='p-4 ' >
            <Grid container className={classes.discoveryContentHeader}>
              <Grid item md={2} xs={5} className="text-center text-_rougeStudea font-_spaceGrotesk text-[14px]">
                Loyer mensuel
              </Grid>
              <Grid item md={2} xs={5} className="text-center text-_rougeStudea font-_spaceGrotesk text-[14px]">
                Dépot de garrantie
              </Grid>
              <Grid item md={2} xs={5} className="text-center text-_rougeStudea font-_spaceGrotesk text-[14px]">
                Surface
              </Grid>
              <Grid item md={2} xs={5} className="text-center text-_rougeStudea font-_spaceGrotesk text-[14px]">
                Étage
              </Grid>
              <Grid item md={2} xs={5} className="text-center text-_rougeStudea font-_spaceGrotesk text-[14px]">
                disponibilité
              </Grid>
              <Grid item md={2} xs={5} className="text-center text-_rougeStudea font-_spaceGrotesk text-[14px]">
                Réserver
              </Grid>
            </Grid>
            {current.list
              ?.sort((a, b) => a.price - b.price)
              .map((curr) => {
                const availableDate = locationAvailableDate(
                  curr.available_date,
                  curr.contract_end_date
                );
                const floor = curr.floor ? `Étage ${curr.floor}` : 'RDC';

                return (
                  <Grid
                    key={curr.ref}
                    container
                    className={classes.discoveryContent}
                  >
                    <div className="flex flex-col  w-full">


                      <div className="flex justify-between w-full">
                        <p className=" text-sm font-medium ">
                          Loyer Mensuel
                        </p>
                        <p className=" text-sm font-medium justify-end flex">
                          {curr.price} €
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className=" text-sm font-medium">Surface</p>
                        <p className="text-sm font-medium ">{`${curr.surface}m²`}</p>
                        
                      </div>
                      <div className="flex justify-between w-full">
                        <p className=" text-sm font-medium">Étage</p>
                        <p className=" text-sm font-medium justify-end flex">
                          {floor}{' '}
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className=" text-sm font-medium">
                          disponibilité
                        </p>
                        <p className=" text-sm font-medium justify-end flex">
                          {availableDate}
                        </p>
                      </div>
                      <div className="text-center" item>
                        <div
                          className="flex justify-center items-center p-4 rounded-xl mb-2 bg-_rougeStudea cursor-pointer"
                          onClick={() => handleSelect(curr)}
                        >
                          <button className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
                            Réserver.
                          </button>
                        </div>
                      </div>
                    </div>

                    <Grid
                      container
                      alignItems="center"
                      className={classes.contentContainer}
                    >
                      <Grid item md={2} xs={5} className="text-center">
                        <strong>{curr.price}</strong>€
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {`${curr.guarantee}€`}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {`${curr.surface}m²`}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {floor}
                      </Grid>
                      <Grid item md={2} xs={5} className="text-center">
                        {availableDate}
                      </Grid>

                      <Grid item md={2} xs={5} >
                      
                        <button className='bg-_rougeStudea rounded-xl text-sm text-white' onClick={() => handleSelect(curr)}>
                            Envoyer une demande
                        </button>
                        
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </div>
        )}
      </div>
    );
  });

export default withStyles(styles)(LocationTable);

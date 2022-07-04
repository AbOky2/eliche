/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { userActions } from 'redux/_actions';
import { AdminContentWrapper } from 'components/wrapper';
import { addBookmarkApiMethod } from 'lib/api';
import {
  typeOfAnnoncies,
  defaultPropertyImg,
  getNbPieces,
  spaceCurrency,
} from 'helpers';
import { Carrousel, NotFound, Icon, Maps } from 'components';

import { BuyTable, LocationTable } from '../table';
import LocationModal from '../table/locationModal';
import Sidebar, { BtnCalendly } from './sidebar';
import useStyles from './styles';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import "@fontsource/space-grotesk";
const PropertyPage = ({
  id,
  user,
  update,
  property = {},
  isLocation = false,
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const isMdView = useMediaQuery(theme.breakpoints.down('sm'));

  const [state, setState] = useState({});
  const [selectedLot, setSelectedLot] = useState(null);
  const [total, setTotal] = useState(0);
  const [currOpen, setCurrOpen] = useState('');
  const [liked, setLiked] = useState(
    user?.bookmarks?.find((elem) => elem._id === id)
  );
  const handleBookmark = () => {
    setLiked(!liked);
    addBookmarkApiMethod({ id }).then(({ user }) => update(user));
  };
  const handleSelectLot = (elem) => setSelectedLot(elem);
  const handleCurrOpen = (e) => setCurrOpen(currOpen === e ? null : e);
  useEffect(() => {
    (async () => {
      const newState = {};
      property.lots?.forEach((newElem) => {
        const pieces = newElem.pieces == 0 ? 1 : newElem.pieces;
        const elem = newState[pieces];
        if (Object.prototype.hasOwnProperty.call(newState, pieces)) {
          elem.list.push(newElem);
          if (!elem.minPrice || elem.minPrice > newElem.price)
            elem.minPrice = newElem.price;
          if (!elem.minSurface || elem.minSurface > newElem.surface)
            elem.minSurface = newElem.surface;
          if (!elem.maxSurface || elem.maxSurface < newElem.surface)
            elem.maxSurface = newElem.surface;
          if (!elem.vat || elem.vat < newElem.vat) elem.vat = newElem.vat;
          newState[pieces] = elem;
        } else {
          newState[pieces] = {
            list: [newElem],
            minSurface: newElem.surface,
            maxSurface: newElem.surface,
            minPrice: newElem.price,
            vat: newElem.vat,
          };
        }
      });
      setState(newState);
      setTotal(property.lots?.length);
    })();
  }, [property.lots]);
  const classes = useStyles();

  if (!id) return <NotFound showLink={false} />;

  return (
    <AdminContentWrapper>
      <div>
       {isMdView?(
        <div className="relative" style={{margin:'-22px', marginTop:'-20px', display:"flex", flexDirection:"column"}}>
        {property.pictures && (
          <Carrousel
            list={
              property.pictures.length
                ? property.pictures
                : [defaultPropertyImg]
            }
          />
        )}
        <Grid
          className={clsx(classes.save, liked ? classes.saved : '')}
          style={{display:'flex', flexDirection:'row-reverse', justifyContent:"end"}} >
          <div className="flex flex-row-reverse mr-4 h-10 md:top-5 tablette:top-4 lg:top-0 ">
            <div onClick={handleBookmark}
            className=' bg-white rounded-full w-9 h-9 py-2 px-1.5'>
            <Icon
              type="heart"
              size='large'
              color={liked ? 'newBlue' : 'white'}
              strokeColor={liked ? 'newBlue' : 'newBlue'}
            /></div>
            <div 
            className=' bg-white rounded-full w-9 h-9 py-1.5 px-1 justify-between mx-2'>
            <Icon
            type="partageV2"
            noColor
            /></div>
          </div>
        </Grid>
      </div>

       ):(
        <div className="relative" style={{margin:'-22px', marginTop:'-20px', display:"flex", flexDirection:"column"}}>
          {property.pictures && (
            <Carrousel
              list={
                property.pictures.length
                  ? property.pictures
                  : [defaultPropertyImg]
              }
            />
          )}
          <Grid
            className={clsx(classes.save, liked ? classes.saved : '')}
            style={{display:'flex', flexDirection:'row-reverse', justifyContent:"end"}} >
            <div className="flex flex-row-reverse h-10 w-9 md:top-5 tablette:top-4 lg:top-0 ">
              <div onClick={handleBookmark}
              className=' bg-white rounded-full w-9 h-9 p-2 px-1.5 '>
              <Icon
                type="heart"
                size='large'
                color={liked ? 'newBlue' : 'white'}
                strokeColor={liked ? 'newBlue' : 'newBlue'}
              /></div>
              {/* <div 
              className=' bg-white rounded-full w-9 h-9 py-1.5 px-1 justify-between mx-2'>
              <Icon
              type="partageV2"
              noColor
              /></div> */}
            </div>
          </Grid>
        </div>


       )}
        


        {isMdView?(<>
          <Grid container justify="space-between" className={classes.description}>
              <Grid item md={6}>
                <div className='mb-2 -mt-20'>
                {isLocation ?(
                              <p className=" text-left text-_rougeStudea font-bold text-3xl">
                              {property.heading}</p>

                ):(
                        <p className="text-[28px] text-left font-bold  text-primary"
                        style={{ Color:"linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)"}}
                        >              
                        {property.heading}</p>
                )}</div>
                <p className="text-[14px] font-bold  leading-[18px] text-[#6976A0]">{property.fullAddress}</p>

                {isLocation ?(
                <div className='m-2 border-4 border-r-0 border-t-0 border-b-0 border-_rougeStudea mt-9'>
                      <p className="text-lg font-bold text-left text-_pieces mx-4">{getNbPieces(property.minPieces, property.maxPieces)}
                          <br/>{` de ${
                          property.minSurface !== property.maxSurface
                            ? `${property.minSurface}m² à ${property.maxSurface}m²`
                            : `${property.minSurface}m²`
                        }`}
                      </p>
                      
                        <p className="text-2xl font-medium text-left text-_rougeStudea mx-4">
                        à partir de
                        {` ${spaceCurrency(property.price)}€ CC/mois`} </p>
                      </div>): ( 
                        <div className='m-2 border-4 border-r-0 border-t-0 border-b-0 border-_aPropos mt-9'>
                        <p className="text-[18px] font-bold text-left text-_pieces mx-4">{getNbPieces(property.minPieces, property.maxPieces)}
                            <br/>{` de ${
                            property.minSurface !== property.maxSurface
                              ? `${property.minSurface}m² à ${property.maxSurface}m²`
                              : `${property.minSurface}m²`
                          }`}
                        </p>
                        <p className="text-2xl font-medium text-left text-_aPropos mx-4">
                            à partir de
                        {` ${spaceCurrency(property.price)}€`} </p>
                        </div>
                        )}
                      {property.available_date && !isLocation ? (
                        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-[18px] font-normal text-left text-_gris mx-3">
                        {`Fin de construction le ${property.available_date}`}
                                    </p>
                      ) : (
                        ''
                      )}
              
              </Grid>
              <div className='w-full'>
                
                <div className='w-ful'>
                  {isLocation ? (
                    <div className="flex justify-center items-center w-[343px] relative gap-2.5 px-[120px] py-4 rounded-xl bg-_rougeStudea">
                    <AnchorLink href="#table" className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white font-_spaceGrotesk">
                      Déposer mon dossier
                    </AnchorLink></div>
                  ) : (
                    <BtnCalendly />
                  )}
                  {isLocation ? (
                    ''
                  ) : (
                    <p className=" text-sm font-medium text-center text-_gris">
                    ou appeler le 06 65 07 11 66
                    </p>
                  )}
                </div>
              </div>
          </Grid>

          <Grid  className={classes.discoveryContainer}>
          
          <div className='flex flex-col'>
            {property.typeOfAnnonce === typeOfAnnoncies[0] ? (
              <BuyTable
                state={state}
                property={property}
                currOpen={currOpen}
                handleCurrOpen={handleCurrOpen}
                
              />
            ) : (
              <LocationTable
                state={state}
                property={property}
                currOpen={currOpen}
                handleSelect={handleSelectLot}
                handleCurrOpen={handleCurrOpen}
              />
            )}
          </div>
        </Grid>
        <LocationModal
          className={classes.modal}
          user={user}
          residenceName={property.heading}
          curr={selectedLot}
          fullAddress={property.fullAddress}
          handleClose={() => handleSelectLot(null)}
        />
        
        <div className=' '>
              <div className=''>
                  <div className='p-6 gap-2 '
                    style={{background : 'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)', borderRadius:'12px', marginBottom:"8px", marginTop:"8px", padding:'24px'}}>
                                <svg
                          width={34}
                          height={34}
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-grow-0 flex-shrink-0 w-_34 h-_34px -mx-2 mb-2"
                          preserveAspectRatio="none"
                        >
                          <rect width={34} height={34} rx={11} fill="url(#paint0_linear_483_5298)" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.3093 20.2255L19.3067 20.2299C18.9347 20.864 18.814 21.3314 18.814 21.659C18.814 22.0235 18.9112 22.3112 19.0953 22.5637C19.3575 22.9055 19.6134 23.1273 19.8531 23.2662C20.2786 23.5015 20.6704 23.7317 21.0274 23.9571C21.2306 24.0775 21.4454 24.2241 21.6245 24.4022C21.7801 24.5568 22.093 24.9159 22.093 25.4509C22.093 25.9671 21.8425 26.4492 21.3709 26.7339C20.993 26.9619 20.5759 27 20.2791 27C19.1488 27 18.0677 26.391 17.0768 25.5393L17.0731 25.5361L17.0694 25.5329C16.6386 25.1563 16.2748 24.7451 15.9927 24.3005C15.4091 25.029 14.9705 25.556 14.6824 25.8728C14.4477 26.139 14.2122 26.3787 13.9822 26.5617C13.8657 26.6544 13.7257 26.7526 13.5665 26.8317C13.4158 26.9067 13.1775 27 12.8837 27C12.1038 27 11.6258 26.4682 11.386 26.0867L11.3639 26.0515L11.3444 26.0149C11.134 25.6197 11 25.1807 11 24.711C11 24.5215 11.039 24.3098 11.0688 24.1605C11.1049 23.9802 11.1562 23.7588 11.2203 23.502C11.3487 22.987 11.5387 22.2894 11.7878 21.4146C12.2737 19.6935 12.7632 17.6195 13.2554 15.1881C13.7402 12.7934 13.9767 10.6597 13.9767 8.78035C13.9767 8.61642 13.9864 8.43563 14.0205 8.25767C14.0489 8.10986 14.1129 7.85737 14.2902 7.61714C14.6825 7.06796 15.2979 7 15.6047 7C16.0789 7 16.4395 7.22144 16.6694 7.43104C16.8844 7.62698 17.0454 7.86369 17.1685 8.08381C17.4693 8.57753 17.6279 9.12462 17.6279 9.7052C17.6279 11.9123 17.2441 14.5966 16.4948 17.7446C17.4134 16.5573 18.2225 15.5926 18.9207 14.8551L18.9235 14.8521L18.9263 14.8492C19.2646 14.4968 19.5707 14.2025 19.8353 13.9882C19.9663 13.882 20.1134 13.7739 20.2688 13.6867C20.3917 13.6178 20.6689 13.474 21.0233 13.474C21.6186 13.474 22.0901 13.7566 22.4206 14.1071C22.6608 14.3499 23 14.7797 23 15.3699C23 15.6902 22.8756 15.9368 22.8246 16.0328C22.7569 16.1603 22.6756 16.2767 22.6016 16.3739C22.4519 16.5707 22.2521 16.792 22.0226 17.0284C21.5875 17.4764 21.106 17.9706 20.5782 18.5107C20.1288 18.9707 19.7049 19.5372 19.3119 20.221L19.3093 20.2255ZM20.346 24.6843C20.346 24.6843 20.343 24.685 20.3363 24.6857C20.3425 24.6845 20.346 24.6843 20.346 24.6843Z"
                            fill="white"
                          />
                          <defs>
                            <lineargradient
                              id="paint0_linear_483_5298"
                              x1="32.375"
                              y1="-1.5625"
                              x2="2.06411e-7"
                              y2="38.125"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#C399DB" />
                              <stop offset={1} stop-color="#5882F7" />
                            </lineargradient>
                          </defs>
                        </svg>
                        <p className=" text-[18px] font-bold text-left text-white mb-2">
                          Le mot de Kit le nid.
                        </p>
                        <p className="  text-[14px] font-medium text-left text-white">
                          Kit le nid aime bien faire des prouts dans les logements, et ça tombe bien parce que il y a un
                          piano livré avec l’appartement ! À vous les gateaux aux chocolats mmmm !
                        </p>
                  </div>

                        <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mb-2">
                          {isLocation?(
                            <p className="flex-grow-0  text-left text-_rougeStudea text-[18px] font-semibold">
                            À propos de cette résidence</p>

                          ):(
                            <p className="flex-grow-0  text-left text-_aPropos text-[18px] font-semibold">
                            À propos de cette résidence</p>

                          )}
                          
                            <p className="self-stretch flex-grow-0 flex-shrink-0 text-[14px] font-normal text-left  text-_gris">
                            <span
                              dangerouslySetInnerHTML={{ __html: property.description }}
                            />
                          </p>
                        </div>
                        <div className="">
                          <Sidebar
                            isLocation={isLocation}
                            property={property}
                            classes={classes}
                          /> 
                        </div>
                        <div className="flex flex-col h-_343 justify-start items-start  rounded-[12px] bg-white border border-_bordureBleu ">
                          <Maps loc={property.loc?.coordinates} />
                        </div>
                        <div className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl bg-white border border-[#eaeffa] mt-4">
                            <p className="flex-grow-0 flex-shrink-0  text-lg font-bold text-left text-[#0e215c]">
                              La Banque Postale peut sûrement financer ton projet !
                            </p>
                            <p className="self-stretch flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#6976a0]">
                              Kit le nid et La Banque Postale s’unissent pour t’aider à voler de tes propres ailes.
                            </p>
                            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-[#3679ff]">
                              <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
                                Découvrir
                              </p>
                            </div>
                        </div>
                  </div>
              </div>
              </>
        ):
        
  





// Resolution pour PC 

        (<>
        <Grid container justify="space-between" className=' mx-64 mt-8 ' >
            <Grid item md={6}>
              <div className='mb-5'>
              {isLocation ?(
                            <p className=" text-left text-_rougeStudea font-bold text-[28px]">
                            {property.heading}</p>

              ):(
                      <p className=" text-left text-blue-500 font-bold text-[28px] lg:text-center"
                      style={{color:"linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)"}}
                      >              
                      {property.heading}</p>
              )}</div>
              <p className="text-sm font-bold text-center text-[#6976a0] mb-6">{property.fullAddress}</p>
            
              {isLocation ?(<>
                <div className='flex justify-between gap-4 '>
                      <div className="w-[259px] h-24 relative rounded-xl bg-white border border-[#eaeffa]">
                            <p className="absolute left-[65px] top-6 text-lg font-bold text-center text-[#0e215c]">{getNbPieces(property.minPieces, property.maxPieces)}
                                <br/>{` de ${
                                property.minSurface !== property.maxSurface
                                  ? `${property.minSurface}m² à ${property.maxSurface}m²`
                                  : `${property.minSurface}m²`
                              }`}
                            </p>
                            </div>
                            <div className="w-[259px] h-24 relative rounded-xl bg-white border border-[#eaeffa]">
                              <p className="w-[200px] h-[23px] absolute left-[30px] top-[23px] text-lg font-bold text-center text-_rougeStudea mx-4">
                              à partir de
                              {` ${spaceCurrency(property.price)}€ CC/mois`} </p>
                            </div>
                    </div></>): 
                    
                    (<>
                    <div className='flex justify-between gap-4 '>
                        <div className="w-full h-24 relative rounded-xl bg-white border border-[#eaeffa]">
                          <p className="absolute left-[65px] top-6 text-lg font-bold text-center text-[#0e215c]">
                          {getNbPieces(property.minPieces, property.maxPieces)}
                            <br/>{` de ${
                            property.minSurface !== property.maxSurface
                              ? `${property.minSurface}m² à ${property.maxSurface}m²`
                              : `${property.minSurface}m²`
                          }`}
                          </p>
                        
                        </div>

                        <div className="w-full h-24 relative  rounded-xl bg-white border border-[#eaeffa] ">
                        <p className="w-[200px] h-[23px] absolute left-[30px] top-[23px] text-lg font-bold text-center text-[#3679ff]">
                          à partir de {` ${spaceCurrency(property.price)}€`}
                        </p>
                        <p className="w-[200px] h-[23px] absolute left-[30px] top-[50px] text-lg font-bold text-center text-[#3679ff]">
                          soit 700 €/mois
                        </p>
                        </div>
                      
                      </div>
                      </>
                      
                      
                      // <div className='m-2 border-4 border-r-0 border-t-0 border-b-0 border-_aPropos mt-9'>
                      // <p className="text-lg font-bold text-left text-_pieces mx-4">
                      // </p>
                      // <p className="text-2xl font-medium text-left text-_titre mx-4">
                      //     à partir de
                      // {` ${spaceCurrency(property.price)}€`} </p>
                      // </div>
                      )}
                    {property.available_date && !isLocation ? (
                      <p className="self-stretch flex-grow-0 text-[18px] font-normal text-_gris mx-3 text-center mt-[8px]">
                      {`Fin de construction le ${property.available_date}`}
                                  </p>
                    ) : (
                      ''
                    )}
         
            </Grid>
            <div className='w-full mt-2'>
              
              <div className=' w-1/2 '>
                {isLocation ? (
                  <div className="flex justify-center items-center w-full mt-3 mb-3 py-4 rounded-xl bg-_rougeStudea">
                  <AnchorLink href="#table" className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white font-_spaceGrotesk">
                    Déposer mon dossier
                  </AnchorLink></div>
                ) : (
                  <BtnCalendly />
                )}
                {isLocation ? (
                  ''
                ) : (
                  <p className="text-sm font-medium text-center text-_gris mb-2">
                  ou appeler le 06 65 07 11 66
                  </p>
                )}
              </div>
            </div>
      </Grid>
                

                
                  {/* Ici effectuer des changements.  */}

<div className=' flex justify-between gap-4  mt-2'> 

<div className=' order-last w-full'>
      <Grid container className={classes.discoveryContainer}>
          
          <div className='flex flex-col w-full'>
            {property.typeOfAnnonce === typeOfAnnoncies[0] ? (
              <BuyTable
                state={state}
                property={property}
                currOpen={currOpen}
                handleCurrOpen={handleCurrOpen}
                
              />
            ) : (
              <LocationTable
                state={state}
                property={property}
                currOpen={currOpen}
                handleSelect={handleSelectLot}
                handleCurrOpen={handleCurrOpen}
              />
            )}
          </div>
        </Grid>
        <LocationModal
          className={classes.modal}
          user={user}
          residenceName={property.heading}
          curr={selectedLot}
          fullAddress={property.fullAddress}
          handleClose={() => handleSelectLot(null)}
        />
         <div className="flex flex-col h-_343 justify-start items-start  rounded-[12px] bg-white border border-_bordureBleu ">
                          <Maps loc={property.loc?.coordinates} />
                        </div>
        </div>
        <div className='w-full '>
              <div className=''>
              <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mb-2">
                          {isLocation?(
                            <p className="flex-grow-0  text-left text-_rougeStudea text-[18px] font-semibold">
                            À propos de cette résidence</p>

                          ):(
                            <p className="flex-grow-0  text-left text-_aPropos text-[18px] font-semibold">
                            À propos de cette résidence</p>

                          )}
                          
                            <p className="self-stretch flex-grow-0 flex-shrink-0 text-[14px] font-normal text-left  text-_gris">
                            <span
                              dangerouslySetInnerHTML={{ __html: property.description }}
                            />
                          </p>
                        </div>
                  <div className='p-6 gap-2 '
                    style={{background : 'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)', borderRadius:'12px', marginBottom:"8px", marginTop:"8px", padding:'24px'}}>
                                <svg
                          width={34}
                          height={34}
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex-grow-0 flex-shrink-0 w-_34 h-_34px -mx-2 mb-2"
                          preserveAspectRatio="none"
                        >
                          <rect width={34} height={34} rx={11} fill="url(#paint0_linear_483_5298)" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.3093 20.2255L19.3067 20.2299C18.9347 20.864 18.814 21.3314 18.814 21.659C18.814 22.0235 18.9112 22.3112 19.0953 22.5637C19.3575 22.9055 19.6134 23.1273 19.8531 23.2662C20.2786 23.5015 20.6704 23.7317 21.0274 23.9571C21.2306 24.0775 21.4454 24.2241 21.6245 24.4022C21.7801 24.5568 22.093 24.9159 22.093 25.4509C22.093 25.9671 21.8425 26.4492 21.3709 26.7339C20.993 26.9619 20.5759 27 20.2791 27C19.1488 27 18.0677 26.391 17.0768 25.5393L17.0731 25.5361L17.0694 25.5329C16.6386 25.1563 16.2748 24.7451 15.9927 24.3005C15.4091 25.029 14.9705 25.556 14.6824 25.8728C14.4477 26.139 14.2122 26.3787 13.9822 26.5617C13.8657 26.6544 13.7257 26.7526 13.5665 26.8317C13.4158 26.9067 13.1775 27 12.8837 27C12.1038 27 11.6258 26.4682 11.386 26.0867L11.3639 26.0515L11.3444 26.0149C11.134 25.6197 11 25.1807 11 24.711C11 24.5215 11.039 24.3098 11.0688 24.1605C11.1049 23.9802 11.1562 23.7588 11.2203 23.502C11.3487 22.987 11.5387 22.2894 11.7878 21.4146C12.2737 19.6935 12.7632 17.6195 13.2554 15.1881C13.7402 12.7934 13.9767 10.6597 13.9767 8.78035C13.9767 8.61642 13.9864 8.43563 14.0205 8.25767C14.0489 8.10986 14.1129 7.85737 14.2902 7.61714C14.6825 7.06796 15.2979 7 15.6047 7C16.0789 7 16.4395 7.22144 16.6694 7.43104C16.8844 7.62698 17.0454 7.86369 17.1685 8.08381C17.4693 8.57753 17.6279 9.12462 17.6279 9.7052C17.6279 11.9123 17.2441 14.5966 16.4948 17.7446C17.4134 16.5573 18.2225 15.5926 18.9207 14.8551L18.9235 14.8521L18.9263 14.8492C19.2646 14.4968 19.5707 14.2025 19.8353 13.9882C19.9663 13.882 20.1134 13.7739 20.2688 13.6867C20.3917 13.6178 20.6689 13.474 21.0233 13.474C21.6186 13.474 22.0901 13.7566 22.4206 14.1071C22.6608 14.3499 23 14.7797 23 15.3699C23 15.6902 22.8756 15.9368 22.8246 16.0328C22.7569 16.1603 22.6756 16.2767 22.6016 16.3739C22.4519 16.5707 22.2521 16.792 22.0226 17.0284C21.5875 17.4764 21.106 17.9706 20.5782 18.5107C20.1288 18.9707 19.7049 19.5372 19.3119 20.221L19.3093 20.2255ZM20.346 24.6843C20.346 24.6843 20.343 24.685 20.3363 24.6857C20.3425 24.6845 20.346 24.6843 20.346 24.6843Z"
                            fill="white"
                          />
                          <defs>
                            <lineargradient
                              id="paint0_linear_483_5298"
                              x1="32.375"
                              y1="-1.5625"
                              x2="2.06411e-7"
                              y2="38.125"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#C399DB" />
                              <stop offset={1} stop-color="#5882F7" />
                            </lineargradient>
                          </defs>
                        </svg>
                        <p className=" text-[18px] font-bold text-left text-white mb-2">
                          Le mot de Kit le nid.
                        </p>
                        <p className="  text-[14px] font-medium text-left text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Curabitur lobortis felis eu posuere semper. 
                        Proin egestas eros at odio porttitor efficitur. Quisque id enim orci
                        </p>
                  </div>

                       
                        <div className="">
                          <Sidebar
                            isLocation={isLocation}
                            property={property}
                            classes={classes}
                          /> 
                        </div>
                       
                        {/* <div className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl bg-white border border-[#eaeffa] mt-4">
                            <p className="flex-grow-0 flex-shrink-0  text-lg font-bold text-left text-[#0e215c]">
                              La Banque Postale peut sûrement financer ton projet !
                            </p>
                            <p className="self-stretch flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#6976a0]">
                              Kit le nid et La Banque Postale s’unissent pour t’aider à voler de tes propres ailes.
                            </p>
                            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-[#3679ff]">
                              <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
                                Découvrir
                              </p>
                            </div>
                        </div> */}
                  </div>
              </div>
         </div>
         </>
        )}
        



       {/*
        <Typography variant="h1" style={{background:'#FFFFFF', border:'1px solid #3679FF', boxSizing:"border-box", borderRadius:'12px', fontFamily:'Space Grotesk', fontSize:'14px', padding:'4px', marginBottom:'20px', textAlign:'center'}}>
            {!isLocation
              ? `${total} logement${total > 1 ? 's' : ''} ${
                  total > 1 ? 'neufs disponibles' : 'neuf disponible'
                } à l’achat dans cette résidence. `
              : `${total} logement${total > 1 ? 's' : ''} disponible${
                  total > 1 ? 's' : ''
                } à la location dans cette résidence.`}
          </Typography> */}


        
        
        </div>
    </AdminContentWrapper>
  );
};

PropertyPage.propTypes = {
  property: PropTypes.object.isRequired,
};
const mapState = (state) => {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
};

const actionCreators = {
  update: userActions.updateUserDataOnly,
};
export default connect(mapState, actionCreators)(PropertyPage);
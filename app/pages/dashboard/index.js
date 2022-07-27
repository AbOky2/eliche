import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withAuth from 'lib/withAuth';
import { AdminContentWrapper } from 'components/wrapper';
import { Btn, Icon } from 'components';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { NotFound } from 'components';

import {
  isYoungWorker,
  toArr,
  toggleArray,
  toQueryParams,
  ucfirst,
} from 'helpers';
import {
  addBookmarkApiMethod,
  getPartnersApiMethod,
  getUserLatestSearchApiMethod,
} from 'lib/api/customer';
import LocationImg from 'static/img/location.png';
import HouseImg from 'static/img/house.png';
import LogoImg from 'static/img/logo.png';
import { pageLink } from 'constants/index';

import { ListElement } from 'components/page/search/views/partials';
import { useEffect, useState } from 'react';
import { userActions } from 'redux/_actions';
import { signIn } from 'lib/api';
import { SearchDrawer } from 'components/searchDrawer';
// import { SearchBar } from 'components/searchBar';
import { SearchBar } from 'components/searchBar/searchBar';
import {
  getPublicPropertiesApiMethod,
  getPropertiesByCoordApiMethod,
} from 'lib/api/customer';
import { isArray, pick, typeOfAnnonciesObj, sortByKeys } from 'helpers';
// import signIn from 'next-auth/react';

const styles = (theme) => ({
  container: {
    padding: '2.4rem',
    margin: '1.6rem 0 3.2rem',
    backgroundColor: 'white',
    boxShadow: '0px 4px 20px rgb(24 55 50 / 4%)',
    borderRadius: '25px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem ',
    },
  },
  presentationContainer: {
    '& > div:first-of-type': {
      paddingRight: '1.5rem',
    },
    '& > div:last-of-type': {
      paddingLeft: '1.5rem',
    },
    '& > div:first-of-type > div': {
      height: '100%',
    },
    '& > div:first-of-type > div > a': {
      height: '100%',
      background: 'linear-gradient(99.78deg, #CC95DF -24.64%, #4F80FF 62.6%)',
      boxShadow:
        '0px 6px 15px rgba(79, 128, 255, 0.3), inset 0px -3px 10px rgba(12, 37, 100, 0.3)',
    },
    '& > div:last-of-type > div': {
      height: '100%',
      boxShadow:
        '0px 4px 13px rgba(0, 0, 0, 0.1), inset 0px -3px 10px rgba(149, 149, 149, 0.2)',
    },
    '& > div > div > a > img': {
      width: 77,
    },
    '& > div > div > a > svg': {
      width: 'auto!important',
      height: 'auto!important',
    },
    '& > div > div > a': {
      ...theme.ui.bordered,
      display: 'block',
      position: 'relative',
      height: '100%',
      padding: 32,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    '& > div > div div svg': {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div:first-of-type': {
        marginBottom: '2rem',
      },
      '& > div:first-of-type, & > div:last-of-type': {
        padding: 0,
        width: '100%',
      },
    },
  },
  heading: {
    '& > div': {
      display: 'none',
    },
    '& > h1': {
      fontFamily: 'Space Grotesk',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '2.8rem',
      lineHeight: '2.8rem',
      textAlign: 'center',
      color: theme.palette.newDarkBlue,
      '& > span': {
        color: theme.palette.normalBlue,
      },
    },
    '& > h2': {
      fontFamily: 'Space Grotesk',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '2.2rem',
      lineHeight: '2.8rem',
      textAlign: 'center',
      color: theme.palette.newDarkBlue,
      '& > span': {
        color: theme.palette.normalBlue,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem',
      textAlign: 'center',
      '& > div': {
        display: 'block',
        marginBottom: 15,
      },
      '& img': {
        height: 50,
        display: 'inline-block',
        width: 'auto',
      },
    },
  },
  welcomeSub: {
    fontFamily: 'Space Grotesk',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '1.6rem',
    lineHeight: '2rem',
    color: theme.palette.newLightBlue,
  },
  lastSearch: {
    position: 'relative',
    border: '2px solid #EFF4FF',
    boxSizing: 'border-box',
    borderRadius: '12px',
    marginTop: '8px',
    padding: '1.8rem',
    background: '#FFFFFF',
    '& h2': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '18px',
        lineHeight: '23px',
      },
      marginBottom: '4px',
      color: theme.palette.normalBlue,
    },
    '& p': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
        lineHeight: '18px',
      },
    },
    '& span': {
      position: 'absolute',
      top: '50%',
      right: '1.6rem',
      transform: 'translateY(-50%)',
    },
  },
  lastViewdContainer: {
    margin: '24px 0',
    '& h2': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '20px',
        lineHeight: '23px',
      },
      marginBottom: '8px',
    },
  },
  lastSearchContainer: {
    '& h2': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '20px',
        lineHeight: '23px',
      },
      marginBottom: '4px',
    },
  },
  advisorContainer: {
    '& h2': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '20px',
        lineHeight: '23px',
      },
      marginBottom: '4px',
    },
  },
  advisorInfo: {
    flexGrow: '1',
    paddingLeft: '1.6rem',
    paddingTop: '1rem',
    '& h2': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '18px',
        lineHeight: '23px',
      },
      color: theme.palette.normalBlue,
    },
    '& p': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
        lineHeight: '18px',
      },
      marginBottom: 0,
    },
  },
  advisorContact: {
    '& svg:first-of-type': {
      marginRight: '1.4rem',
    },
  },
  subTitle: {
    margin: '.4rem 0 2.2rem',
  },
  customH2: {
    fontFamily: theme.typography.secondFontFamily,
    fontWeight: 'bold',
  },

  nouveauH2: {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '23px',
    color: '#1A2E6C',
  },
  nouveauGrid: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginBottom: '16px',
  },
  gridPoints: {
    background: 'white',
    width: '100%',
    borderRadius: '12px',
    border: '1px solid #EAEFFA',
    padding: '24px',
    marginBottom: '16px',
  },
  numeroPoints: {
    background: 'rgba(248, 191, 44, 1)',
    width: '34px',
    heigth: '44px',
    borderRadius: '50%',
    padding: '12px',
    marginBottom: '10px',
  },
  presentationCardTitle: {
    color: theme.palette.newBlue,
    margin: '1.6rem 0 .5rem',
  },
  buyText: {
    color: '#526190',
  },
  partnerDescription: {
    margin: '.4rem 0 2rem',
  },
  partnerListContainer: {
    width: '33.33%',
    '& > a': {
      display: 'block',
      background: '#ffffff',
      ...theme.ui.bordered,
      border: `1px solid ${theme.palette.lightBlue}`,
      padding: '2rem',
      marginBottom: '2rem',
    },
    ...theme.ui.listContainer,
  },
  whiteColor: {
    color: 'white',
  },
  partnerListImgContainer: {
    height: 70,
    marginTop: '3rem',
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  partnerCardType: {
    display: 'inline-block',
    padding: '.8rem 1.4rem',
    borderRadius: '9px',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '16px',
    color: '#BE8B07',
    background: 'rgba(248, 191, 44, 0.2)',
    margin: '1rem 0 1.6rem',
  },
  partnerCardTitle: {
    marginBottom: '.8rem',
    color: '#4F80FF',
  },
  partnerListTextContainer: {
    position: 'relative',
    width: '100%',
    '& > p': {
      width: 'calc(100% - 3rem)',
      margin: 0,
      ...theme.typography.body1,
      color: '#6976A0',
      height: '6.5rem',
      overflow: 'hidden',
    },
    '& p': {
      margin: 0,
    },
    '& > svg': {
      position: 'absolute',
      bottom: '0',
      right: '0',
      transform: 'translateY(.5rem)',
    },
  },
});

const AuthContext = ({
  classes,
  liked = [],
  userSearch = {},
  handleBookmark,
}) => (
  <div className=" mt-6">
    <div className={classes.lastSearchContainer}>
      <Typography variant="h2">Vos recherches récentes</Typography>
      {userSearch.lastSearch
        ?.slice(0, 3)
        .map(({ loc, maxPrice, page, pieces, sort, ...search }, index) => (
          <a
            key={index}
            href={`/dashboard/search/${
              search.typeOfAnnonce === 'Location' ? 'location' : 'buy'
            }/?${toQueryParams({
              loc,
            })}`}
          >
              <div className={classes.lastSearch}>
                <p className=" text-_aPropos lg:text-[20px] md:text-sm md:font-bold">
                  {loc}
                </p>
                <Typography>
                  {`${
                    pieces ? toArr(pieces).join(', ') : 'Toute type de'
                  } pièces | ${
                    maxPrice && maxPrice > 0 ? `${maxPrice}€` : 'Prix indéfini'
                  }`}
                </Typography>
                <span classes={classes.iconContainer}>
                  <Icon type="sliderArrow" size="small" />
                </span>
              </div>
          </a>
        ))}
    </div>
    <div className={classes.lastViewdContainer}>
      <Typography variant="h2">Vos récentes consultations</Typography>
      <Grid  justifyContent="space-between" className='tablette:grid tablette:grid-cols-2 tablette:gap-2'>
        {userSearch.lastViewed?.slice(0, 3).map((elem, index) => (
          <ListElement
            key={index}
            liked={liked}
            {...elem}
            handleBookmark={handleBookmark}
          />
        ))}
      </Grid>
    </div>
    <div className={classes.advisorContainer}>
      <Typography variant="h2">Votre conseiller</Typography>
      <Grid container alignItems="center">
        <Grid item>
          <img src="static/img/advisor.png" alt="" />
        </Grid>
        <Grid item className={classes.advisorInfo}>
          <Grid container justify="space-between">
            <Grid item>
              <Grid container justify="space-between">
                <div>
                  <Typography variant="h2">Nicolas BLOUIN</Typography>
                  <Typography>nblouin@nexity.fr</Typography>
                  <Typography>06 65 07 11 66</Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.advisorContact}>
                <a href='tel:+33 06 65 07 11 66'>
                <Icon type="phone" /></a>
                <a href='mailto:nblouin@nexity.fr'>
                <Icon type="mail" /></a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </div>
);

const NoAuthDashboard = ({ user = {}, partners, classes }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const isMdView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isMdView ? (
        <>
          <div className="">
            <div className="flex flex-col mx-4">
              <div className="lg:order-last -mx-4 mb-10 my-12 ">
                <img
                  src="../static/img/House1.svg"
                  className=" w-full h-_175 rounded-xl object-cover mx-2"
                />
              </div>
            </div>
            <div className="  ">
              <div className="flex flex-row-reverse items-start mx-4 mb-4">
                <div className=" mx-4 w-full">
                  <p className="text-_bleuMarine font-_spaceGrotesk text-[18px] font-bold">
                    Des logements dans toute la France
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk mt-1 text-[14px]">
                    Accéder à notre carte avec plus de 2 500 logements neufs
                    disponibles.{' '}
                  </p>
                </div>
                <div>
                  <svg
                    width={53}
                    height={53}
                    viewBox="0 0 53 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-_53 h-_53 relative"
                    preserveAspectRatio="none"
                  >
                    <circle cx="26.5" cy="26.5" r="26.5" fill="#DCE6FF" />
                    <path
                      d="M33.6585 24.7013L26.6585 18.5763C26.2815 18.2464 25.7185 18.2464 25.3415 18.5763L18.3415 24.7013C18.1245 24.8912 18 25.1655 18 25.4539V34.0001C18 34.5524 18.4477 35.0001 19 35.0001H23C23.5523 35.0001 24 34.5524 24 34.0001V30.0001C24 29.4478 24.4477 29.0001 25 29.0001H27C27.5523 29.0001 28 29.4478 28 30.0001V34.0001C28 34.5524 28.4477 35.0001 29 35.0001H33C33.5523 35.0001 34 34.5524 34 34.0001V25.4539C34 25.1655 33.8755 24.8912 33.6585 24.7013Z"
                      stroke="#6A7CA8"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-row-reverse items-start mx-4 mb-4 ">
                <div className="mx-4 w-full">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-[18px] font-bold">
                    Accès libre aux plans
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk  mt-1 text-[14px]">
                    Télécharger gratuitement les plans des appartements et les
                    plaquettes de présentation de nos résidences.{' '}
                  </p>
                </div>
                <div>
                  <svg
                    width={53}
                    height={53}
                    viewBox="0 0 53 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-_53 h-_53 relative"
                    preserveAspectRatio="none"
                  >
                    <circle cx="26.5" cy="26.5" r="26.5" fill="#FEF2D5" />
                    <path
                      d="M30 18H22C21.4477 18 21 18.4477 21 19V35C21 35.5523 21.4477 36 22 36H30C30.5523 36 31 35.5523 31 35V19C31 18.4477 30.5523 18 30 18Z"
                      stroke="#DCC07E"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M26 33H26.002V33.002H26V33Z"
                      stroke="#DCC07E"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-row-reverse items-start mx-4 mb-4">
                <div className="mx-4 w-full">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-[18px] font-bold">
                    Un unique conseiller dédié
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk  mt-1 text-[14px]">
                    Une même personne pour vous accompagner, de la recherche de
                    votre appartement jusqu’à votre emménagement.
                  </p>
                </div>
                <div>
                  <svg
                    width={53}
                    height={53}
                    viewBox="0 0 53 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[53px] h-[53px] relative"
                    preserveAspectRatio="none"
                  >
                    <circle cx="26.5" cy="26.5" r="26.5" fill="#F5EAF9" />
                    <path
                      d="M21 35C21 33.3431 23.2386 32 26 32C28.7614 32 31 33.3431 31 35"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M32 29.2495C33.7659 29.7124 35 30.7697 35 31.9999"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 29.2495C18.2341 29.7124 17 30.7697 17 31.9999"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M26 29C27.6569 29 29 27.6569 29 26C29 24.3431 27.6569 23 26 23C24.3431 23 23 24.3431 23 26C23 27.6569 24.3431 29 26 29Z"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M32 25.2361C32.6137 24.6868 33 23.8885 33 23C33 21.3431 31.6569 20 30 20C29.2316 20 28.5308 20.2889 28 20.7639"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 25.2361C19.3863 24.6868 19 23.8885 19 23C19 21.3431 20.3431 20 22 20C22.7684 20 23.4692 20.2889 24 20.7639"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-row-reverse items-start mx-4 mb-12">
                <div className="mx-4 w-full">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-[18px] font-bold">
                    Des aides pour votre premier achat{' '}
                  </p>
                  <p className="text-_grisBleu font-_spaceGrotesk mt-1 text-[14px]">
                    Prêt à Taux Zéro - TVA 5,5 % Des remises(2) sur 100% des
                    logements Nexity.{' '}
                  </p>
                </div>
                <div>
                  <svg
                    width={53}
                    height={53}
                    viewBox="0 0 53 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=" w-_53 h-_53 relative"
                    preserveAspectRatio="none"
                  >
                    <circle cx="26.5" cy="26.5" r="26.5" fill="#EDF8F0" />
                    <path
                      d="M29 21L35 18V33L29 36V21Z"
                      stroke="#93C8A2"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M23 33L29 36V21L23 18V33Z"
                      stroke="#93C8A2"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17 21L23 18V33L17 36V21Z"
                      stroke="#93C8A2"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>


            <div className='bg-white border-1 border-_bordureBleu rounded-[12px] p-4 mb-4'>
             <div className="w-8 h-8 mb-2">
                <div className="flex items-center justify-center flex-1 h-full px-3 py-0.5 bg-yellow-400 rounded-full">
                    <p className="text-base font-bold leading-loose text-white">1</p>
                </div>
              </div>
              <div>
                <h1 className=' text-_aPropos font-bold text-[18px] mb-2'>
                    Rejoignez la plateforme Kit le Nid
                </h1>
                <p className=' text-[#849CD9] font-bold text-[14px]'>
                    Inscrivez-vous et développez votre projet avec nos conseillers.
                </p>
              </div>
            </div>



            <div className='bg-white border-1 border-_bordureBleu rounded-[12px] p-4 mb-4'>
             <div className="w-8 h-8 mb-2">
                <div className="flex items-center justify-center flex-1 h-full px-3 py-0.5 bg-yellow-400 rounded-full">
                    <p className="text-base font-bold leading-loose text-white">2</p>
                </div>
              </div>
              <div>
                <h1 className=' text-_aPropos font-bold text-[18px] mb-2'>
                    Sélectionnez votre logement
                </h1>
                <p className=' text-[#849CD9] font-bold text-[14px]'>
                    Choisissez et réservez votre appartement en ligne.
                </p>
              </div>
            </div>



            <div className='bg-white border-1 border-_bordureBleu rounded-[12px] p-4 mb-4'>
             <div className="w-8 h-8 mb-2">
                <div className="flex items-center justify-center flex-1 h-full px-3 py-0.5 bg-yellow-400 rounded-full">
                    <p className="text-base font-bold leading-loose text-white">3</p>
                </div>
              </div>
              <div>
                <h1 className=' text-_aPropos font-bold text-[18px] mb-2'>
                    Profitez d’un financement simplifié
                </h1>
                <p className=' text-[#849CD9] font-bold text-[14px]'>
                   Kit le nid vous accompagne dans toutes vos démarches de prêt.
                </p>
              </div>
            </div>




            <div className='bg-white border-1 border-_bordureBleu rounded-[12px] p-4 mb-4'>
             <div className="w-8 h-8 mb-2">
                <div className="flex items-center justify-center flex-1 h-full px-3 py-0.5 bg-yellow-400 rounded-full">
                    <p className="text-base font-bold leading-loose text-white">4</p>
                </div>
              </div>
              <div>
                <h1 className=' text-_aPropos font-bold text-[18px] mb-2'>
                    Personnalisez votre bien avec nos équipes
                </h1>
                <p className=' text-[#849CD9] font-bold text-[14px]'>
                    Trouvez les meilleures solutions de décoration et d’aménagement pour votre appartement en attendant sa livraison.
                </p>
              </div>
            </div>





            <div className='mb-2'>
                <div className="" >
                  <img src="static/img/icons/group123.svg" />
                </div>
              </div>

            {/* <p class=" text-[18px] font-semibold text-_bleuMarine mx-4">
              Nos services partenaires pour les étudiants
            </p>
            <div class="text-[14px] text-_grisBleu p-3 mx-4">
              Kit le nid vous propose un ensemble d’offres avantageuses pour
              mieux répondre à vos besoins lors de vos études :
              <ul>
                <li>une location en résidence étudiante</li>
                <li>une mutuelle santé</li>
                <li>un garant solide pour vous</li>
              </ul>
            </div> */}

            


            
            <div className=" text-_grisBleu font-thin text-[12px] mt-16 ">
              (1) Mensualités données à titre indicatif uniquement et non
              contractuelles, pour l’achat d’un appartement de 187 000 €, sur
              une base de durée de 25 ans, à un taux d’intérêt fixe moyen
              constaté sur le marché de 1.4%, hors frais, hors assurance et avec
              un apport personnel de 7 500€. Pour être éligible au PTZ : il doit
              s’agir de votre premier achat en résidence principale et votre
              revenu fiscal de référence sur l’année 2 ans avant la réservation
              de l’appartement doit être inférieur à 37 000 €
            </div>
          </div>
        </>
      ) : (
        <>
          {/* s*/}

          <div className="w-full h-full relative overflow-hidden mt-16">
            <div className=''>
              <div className='flex gap-3'>
                  <div className=''>
                      <p className=' text-[#113EB6] text-[28px]'>
                        Etudiant, Jeune Actifs. <br/>
                        <strong> La première Offre Jeune pour devenir propriétaire</strong>
                      </p>
                      <p className='text-[#849CD9] text-[20px]'>
                        Réalisez votre <strong>premier achat immobilier</strong> <br/> pour seulement <strong>699€/mois ! (1)</strong>
                      </p>
                      <div className=' absolute mt-4  w-[80%]'>
                      <SearchBar />
                      </div>
                  </div>
                  <div>
                  <div className="rounded-[20px]  object-cover">
                    <img
                    src="/static/img/House1.svg"
                    
                  />
                  </div></div>
                  
              </div>
             
            </div>

            <div className='flex  mt-[62px] mb-[62px] justify-between gap-8'>

              <div className='flex flex-col w-full '>
                
                  <div className='justify-center flex mb-4'>
                    <svg
                      width={53}
                      height={53}
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-_53 h-_53 relative"
                      preserveAspectRatio="none"
                    >
                      <circle cx="26.5" cy="26.5" r="26.5" fill="#DCE6FF" />
                      <path
                        d="M33.6585 24.7013L26.6585 18.5763C26.2815 18.2464 25.7185 18.2464 25.3415 18.5763L18.3415 24.7013C18.1245 24.8912 18 25.1655 18 25.4539V34.0001C18 34.5524 18.4477 35.0001 19 35.0001H23C23.5523 35.0001 24 34.5524 24 34.0001V30.0001C24 29.4478 24.4477 29.0001 25 29.0001H27C27.5523 29.0001 28 29.4478 28 30.0001V34.0001C28 34.5524 28.4477 35.0001 29 35.0001H33C33.5523 35.0001 34 34.5524 34 34.0001V25.4539C34 25.1655 33.8755 24.8912 33.6585 24.7013Z"
                        stroke="#6A7CA8"
                        stroke-width={2}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className=" mx-4 w-full">
                    <p className="text-_bleuMarine font-_spaceGrotesk text-xl font-bold mb-2">
                      Des logements dans toute la France
                    </p>
                    <p className=" text-_grisBleu font-_spaceGrotesk mt-1 text-[18px]">
                      Accéder à notre carte avec plus de 2 500 logements neufs
                      disponibles.{' '}
                    </p>
                  </div>
              </div>
              <div className='flex flex-col w-full'>
                
                  <div className='justify-center flex mb-4'>
                    <svg
                      width={53}
                      height={53}
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" w-_53 h-_53 relative"
                      preserveAspectRatio="none"
                    >
                      <circle cx="26.5" cy="26.5" r="26.5" fill="#EDF8F0" />
                      <path
                        d="M29 21L35 18V33L29 36V21Z"
                        stroke="#93C8A2"
                        stroke-width={2}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23 33L29 36V21L23 18V33Z"
                        stroke="#93C8A2"
                        stroke-width={2}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 21L23 18V33L17 36V21Z"
                        stroke="#93C8A2"
                        stroke-width={2}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mx-4 w-full">
                    <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold mb-2">
                      Des aides pour votre premier achat{' '}
                    </p>
                    <p className="text-_grisBleu font-_spaceGrotesk text-[18px] mt-1">
                      Prêt à Taux Zéro - TVA 5,5 % Des remises(2) sur 100% des
                      logements Nexity.{' '}
                    </p>
                  </div>
              </div>
              <div className='flex flex-col w-full'>
                <div className='justify-center flex mb-4'>
                      <svg
                        width={53}
                        height={53}
                        viewBox="0 0 53 53"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-_53 h-_53 relative"
                        preserveAspectRatio="none"
                      >
                        <circle cx="26.5" cy="26.5" r="26.5" fill="#FEF2D5" />
                        <path
                          d="M30 18H22C21.4477 18 21 18.4477 21 19V35C21 35.5523 21.4477 36 22 36H30C30.5523 36 31 35.5523 31 35V19C31 18.4477 30.5523 18 30 18Z"
                          stroke="#DCC07E"
                          stroke-width={2}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M26 33H26.002V33.002H26V33Z"
                          stroke="#DCC07E"
                          stroke-width={2}
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  <div className="mx-4 w-full">
                      <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold mb-2">
                        Accès libre aux plans
                      </p>
                      <p className=" text-_grisBleu font-_spaceGrotesk text-[18px] mt-1">
                        Télécharger gratuitement les plans des appartements et les
                        plaquettes de présentation de nos résidences.{' '}
                      </p>
                    </div>
                    
              </div>
              <div className='flex flex-col w-full'>
              
                <div className='justify-center flex mb-4'>
                  <svg
                    width={53}
                    height={53}
                    viewBox="0 0 53 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[53px] h-[53px] relative"
                    preserveAspectRatio="none"
                  >
                    <circle cx="26.5" cy="26.5" r="26.5" fill="#F5EAF9" />
                    <path
                      d="M21 35C21 33.3431 23.2386 32 26 32C28.7614 32 31 33.3431 31 35"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M32 29.2495C33.7659 29.7124 35 30.7697 35 31.9999"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 29.2495C18.2341 29.7124 17 30.7697 17 31.9999"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M26 29C27.6569 29 29 27.6569 29 26C29 24.3431 27.6569 23 26 23C24.3431 23 23 24.3431 23 26C23 27.6569 24.3431 29 26 29Z"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M32 25.2361C32.6137 24.6868 33 23.8885 33 23C33 21.3431 31.6569 20 30 20C29.2316 20 28.5308 20.2889 28 20.7639"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 25.2361C19.3863 24.6868 19 23.8885 19 23C19 21.3431 20.3431 20 22 20C22.7684 20 23.4692 20.2889 24 20.7639"
                      stroke="#B985CC"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="mx-4 w-full">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold mb-2">
                    Un unique conseiller dédié
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk text-[18px] mt-1">
                    Une même personne pour vous accompagner, de la recherche de
                    votre appartement jusqu’à votre emménagement.
                  </p>
                </div>
              </div>
            </div>


            <div className='flex '>
              <div>
                <h2 className='text-[#0E215C] text-[28px] font-bold mb-[14px]'>
                  Nos services partenaires
                </h2>
                <p className='text-[#849CD9] text-[18px]'>
                  Kit le nid vous propose un <strong>ensemble d'offres avantageuses </strong> pour mieux répondre à vos bésoins lors de vos études:
                  <br/>
                  - Une location en résidence étudiante <br/>
                  - Une mutuelle santé <br/>
                  - Un garant pour vous 
                </p>
              </div>
              <div className=''>
                <div className="" >
                  <img src="static/img/icons/group123.svg" />
                </div>
              </div>
            </div>
            {/* <div className="w-[936px] h-[97px] absolute left-[106.5px] top-[398.5px] rounded-[20px] bg-white" /> */}
           

            <div className="flex items-start relative justify-between gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-5 mb-5 mx-4">
              <div>
                <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-_titre">
                Découvrez notre guide du premier achat.
              </p>
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-_grisBleu">
                Kit le nid et La Banque Postale s’unissent pour t’aider à voler
                de tes propres ailes.
              </p>
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-_aPropos mt-6">
                <a className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-_aPropos" href='static/img/Guideachat.pdf'>
                  Télécharger notre guide
                </a>
              </div>
              </div>
              <div >
                <img src="static/img/GuideAchat.svg" />
              </div>
            </div>
            <div className=" text-_grisBleu font-thin text-sm ">
              (1) Mensualités données à titre indicatif uniquement et non
              contractuelles, pour l’achat d’un appartement de 187 000 €, sur
              une base de durée de 25 ans, à un taux d’intérêt fixe moyen
              constaté sur le marché de 1.4%, hors frais, hors assurance et avec
              un apport personnel de 7 500€. Pour être éligible au PTZ : il doit
              s’agir de votre premier achat en résidence principale et votre
              revenu fiscal de référence sur l’année 2 ans avant la réservation
              de l’appartement doit être inférieur à 37 000 €
            </div>

           </div>
        </>
      )}
    </>
  );
};

const Dashboard = ({ classes, user = {}, userSearch, update }) => {
  const theme = useTheme();
  const isMdView = useMediaQuery(theme.breakpoints.down('sm'));
  const [liked, setLiked] = useState(
    user?.bookmarks?.map((elem) => elem._id) || []
  );
  const [showSearch, setShowSearch] = useState(false);
  const isAuth = user?._id;
  const handleBookmark = (id) => {
    setLiked(toggleArray(liked, id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };

  return (
    <AdminContentWrapper noRedirect>
      <div className={classes.heading}>
        <div className=" flex">
          <div className='flex justify-center'>
          <Icon type="LogoVV" /></div>
        </div>
        {/* <p className='text-[#113EB6] font-[800] text-[28px] text-center mb-6 lg:mt-8'>
          {isAuth ? 'Ravis de vous revoir ' : 'La première offre Jeune pour  '}
          <span className=' text-[#3679FF]'>
            {isAuth ? (
              <>
                <br />
                {`${ucfirst(user?.firstName)}  !`}
              </>
            ) : (
              'devenir propriétaire.'
            )}
          </span>
          <p className={classes.welcomeSub}>
            {!isAuth &&
              'Réalisez votre premier achat immobilier pour seulement 700€ par mois !*'}
          </p>
        </p> */}

        {isAuth ?(
          <p className='text-[#113EB6] font-[800] text-[28px] text-center mb-6 lg:mt-8'>
            Ravis de vous revoir <span className=' text-[#3679FF]'> <br/> {`${ucfirst(user?.firstName)}  !`} </span>
          </p>
        ):(
          <p className='text-[#113EB6] font-[800] text-[28px] text-center mb-6 lg:mt-8 lg:hidden'>
            La première Offre Jeune pour <span className=' text-[#3679FF]'> <br/> devenir propriétaire.</span>

            <p className={classes.welcomeSub}>
              Réalisez votre premier achat immobilier pour seulement 700€ par mois !*
          </p>
          </p>

        )}

        
      </div>
      {isAuth ? (
        isMdView ? (
          <div
            onClick={() => setShowSearch(!showSearch)}
            className="flex flex-row-reverse mt-4 rounded-xl h-_53 bg-white border border-_bordureBleu  "
          >
            <div
              style={{
                background:
                  'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                width: '39px',
                height: '39px',
                borderRadius: '12px',
                padding: '7px',
                paddingTop:'4px',
                marginTop: '7px',
                marginRight: '9px',
              }}
            >
              <Icon type="recherche" color="white" />
            </div>
          </div>
        ) : (
          <div className="">
            <SearchBar />
          </div>
        )
      ) : (
        
        <div
          onClick={() => setShowSearch(!showSearch)}
          className="flex flex-row-reverse mt-4 rounded-xl h-_53 bg-white border border-_bordureBleu absolute min-w-[70%] ml-9 lg:hidden"
        >
          <div
            style={{
              background:
                'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
              width: '39px',
              height: '39px',
              borderRadius: '12px',
              padding: '7px',
              paddingTop:'4px',
              marginTop: '7px',
              marginRight: '9px',
            }}
          >
            <Icon type="recherche" color="white" size='small' />
          </div>
        </div>
      )}

      {isAuth ? (
        <AuthContext
          classes={classes}
          liked={liked}
          userSearch={userSearch}
          handleBookmark={handleBookmark}
        />
      ) : (
        <NoAuthDashboard classes={classes} />
      )}
      <SearchDrawer showSearch={showSearch} setShowSearch={setShowSearch} />
    </AdminContentWrapper>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  update: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

Dashboard.getInitialProps = async ({ req }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const { list } = await getPartnersApiMethod({ headers });

  let userSearch = {};
  if (req && req.user)
    // console.log('START RESEARCH!');
    userSearch = (
      await getUserLatestSearchApiMethod({
        headers,
      })
    )?.userSearch;
  console.log('END');

  return { partners: list, userSearch };
};
const mapState = (state) => {
  const { user } = state?.authentication;
  return { user };
};
const actionCreators = {
  update: userActions.updateUserDataOnly,
};
export default withAuth(
  withStyles(styles)(connect(mapState, actionCreators)(Dashboard))
);

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
  <div className="mt-10 xl:mt-60 lg:mt-60 md:mt-10">
    <div className={classes.lastSearchContainer}>
      <Typography variant="h2">Vos recherches récentes</Typography>
      {userSearch.lastSearch
        ?.slice(0, 3)
        .map(({ loc, maxPrice, page, pieces, sort, ...search }, index) => (
          <Link
            key={index}
            href={`/dashboard/search/${
              search.typeOfAnnonce === 'Location' ? 'location' : 'buy'
            }/?${toQueryParams({
              loc,
            })}`}
          >
            <a>
              <div className={classes.lastSearch}>
                <Typography variant="h2" className="text-xs">
                  {loc}
                </Typography>
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
          </Link>
        ))}
    </div>
    <div className={classes.lastViewdContainer}>
      <Typography variant="h2">Vos récentes consultations</Typography>
      <Grid container justifyContent="space-between">
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
                  <Typography variant="h2">Raphael Altman</Typography>
                  <Typography>raltman@nexity.fr</Typography>
                  <Typography>06 99 77 65 16</Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.advisorContact}>
                <Icon type="phone" />
                <Icon type="mail" />
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
          <div className="  lg:w-screen lg:-mx-52">
            <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:order-first lg:justify-between lg:items-end">
              <div className="lg:order-last -mx-4 mb-10 my-12 ">
                <img
                  src="static/img/icons/House1.svg"
                  className=" w-_388 h-_175 rounded-xl object-cover lg:w-_515 lg:h-_460 mx-2"
                />
              </div>
            </div>
            <div className=" lg:flex lg:flex-row lg:mb-32 ">
              <div className="flex flex-row-reverse items-start mx-4 mb-4 lg:w-_388 lg:h-_198">
                <div className=" mx-4 ">
                  <p className="text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
                    Des logements dans toute la France
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk mt-1">
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
              <div className="flex flex-row-reverse items-start mx-4 mb-4 lg:w-_388 lg:h-_198">
                <div className="mx-4">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
                    Accès libre aux plans
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk  mt-1">
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

              <div className="flex flex-row-reverse items-start mx-4 mb-4 lg:w-_388 lg:h-_198">
                <div className="mx-4">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
                    Un unique conseiller dédié
                  </p>
                  <p className=" text-_grisBleu font-_spaceGrotesk  mt-1">
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

              <div className="flex flex-row-reverse items-start mx-4 mb-12 lg:w-_388 lg:h-_198">
                <div className="mx-4">
                  <p className=" text-_bleuMarine font-_spaceGrotesk text-xl font-bold">
                    Des aides pour votre premier achat{' '}
                  </p>
                  <p className="text-_grisBleu font-_spaceGrotesk mt-1">
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

            <p class=" text-2xl font-semibold text-_bleuMarine mx-4">
              Nos services partenaires pour les étudiants
            </p>
            <div class="text-md text-_grisBleu p-3 mx-4">
              Kit le nid vous propose un ensemble d’offres avantageuses pour
              mieux répondre à vos besoins lors de vos études :
              <ul>
                <li>une location en résidence étudiante</li>
                <li>une mutuelle santé</li>
                <li>un garant solide pour vous</li>
              </ul>
            </div>

            <div class="relative" style={{ height: '487.03px' }}>
              <div
                class="w-40 h-40 absolute bg-indigo-50  rounded-xl"
                style={{ left: '110.90px', top: '260.36px' }}
              />
              <div
                class="w-40 h-40 absolute bg-indigo-50  rounded-xl"
                style={{ left: '200.66px', top: '48.79px' }}
              />
              <div
                class="w-20 h-20 absolute bg-green-50  rounded-xl"
                style={{ left: '382.59px', top: '311.62px' }}
              />
              <div
                class="w-20 h-20 absolute bg-yellow-100  rounded-xl"
                style={{ left: '370.76px', top: '0px' }}
              />
              <div
                class="w-20 h-20 absolute bg-purple-100  rounded-xl border-purple-100 border-opacity-10"
                style={{ left: '0px', top: '201.83px' }}
              />
              <div
                class="w-40 h-40 absolute"
                style={{ left: '180.76px', top: '320.68px' }}
              >
                <div class="flex items-center justify-center flex-1 h-full px-4 py-14 bg-white rounded-xl">
                  <div class="inline-flex flex-col space-y-2 items-center justify-end flex-1 h-full">
                    <img class="w-28 h-4" src="static/img/LogoCautioneo.svg" />
                    <div class="w-full h-8">
                      <div class="flex items-center justify-center flex-1 h-full pl-3 pr-3.5 pt-1.5 pb-1 bg-indigo-600 bg-opacity-10 rounded-lg">
                        <p class="flex-1 h-full text-sm font-bold text-center text-indigo-600">
                          3 mois offerts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="w-40 h-40 absolute"
                style={{ left: '130.59px', top: '90.90px' }}
              >
                <div class="flex items-center justify-center flex-1 h-full px-5 py-10 bg-white rounded-xl">
                  <div class="inline-flex flex-col space-y-0.5 items-center justify-end flex-1 h-full">
                    <img class="w-full h-1/2" src="static/img/LogoHeyme.svg" />
                    <div class="w-3/4 h-10">
                      <div class="flex items-center justify-center flex-1 h-full px-5 py-1.5 bg-red-500 bg-opacity-10 rounded-xl">
                        <p class="flex-1 h-full text-base font-bold text-center text-red-500">
                          -15%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start relative gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-5 mb-5 mx-4">
              <p className="flex-grow-0 flex-shrink-0 w-72 text-lg font-bold text-left text-_titre">
                Découverz notre guide du premier achat.
              </p>
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-sm font-medium text-left text-_grisBleu">
                Kit le nid et La Banque Postale s’unissent pour t’aider à voler
                de tes propres ailes.
              </p>
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-10 py-3 rounded-xl border border-_aPropos">
                <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-_aPropos">
                  Télécharger notre guide
                </p>
              </div>
            </div>
            <div className=" text-_grisBleu font-thin text-sm mt-16 -mb-10">
              (1) Mensualités données à titre indicatif uniquement et non
              contractuelles, pour l’achat d’un appartement de 187.000 €, sur
              une base de durée de 25 ans, à un taux d’intérêt fixe moyen
              constaté sur le marché de 1.4%, hors frais, hors assurance et avec
              un apport personnel de 7.500€. Pour être éligible au PTZ : il doit
              s’agir de votre premier achat en résidence principale et votre
              revenu fiscal de référence sur l’année 2 ans avant la réservation
              de l’appartement doit être inférieur à 37 000 €
            </div>
          </div>
        </>
      ) : (
        <>
          {/* s*/}

          <div className="w-[1480px] h-[1930px] relative overflow-hidden bg-[#f9fbff]">
            <div className="w-[344px] h-[46px]">
              <div className="w-[163.32px] h-[46px]">
                <div className="w-[163.32px] h-[46px] absolute left-[1123px] top-[-418px] rounded-[55px] bg-white border-2 border-[#4f80ff]" />
                <p className="w-[115.69px] h-[23.7px] absolute left-[1147.48px] top-[-405.5px] text-base font-bold text-center text-[#4f80ff]">
                  Se connecter
                </p>
              </div>
              <div className="w-[162.3px] h-[46px]">
                <div
                  className="w-[162.3px] h-[46px] absolute left-[1305.2px] top-[-417.5px] rounded-[55px] bg-[#4f80ff]"
                  style={{
                    boxShadow: '0px 10px 44px -5px rgba(14,108,218,0.35)',
                  }}
                />
                <p className="w-[74.52px] h-[23px] absolute left-[1349.59px] top-[-405.5px] text-base font-bold text-center text-white">
                  S’inscrire
                </p>
              </div>
            </div>
            <img
              src="static/img/icons/House1.svg"
              className="w-[515px] h-[460px] absolute left-[846.42px] top-[135.42px] rounded-[20px] object-cover"
            />
            <p className="w-[426px] absolute left-[108px] top-80 text-xl text-left text-[#849cd9]">
              <span className="w-[426px] text-xl text-left text-[#849cd9]">
                Réalisez votre{' '}
              </span>
              <span className="w-[426px] text-xl font-bold text-left text-[#849cd9]">
                premier achat immobilier
              </span>
              <span className="w-[426px] text-xl text-left text-[#849cd9]">
                {' '}
                pour seulement{' '}
              </span>
              <span className="w-[426px] text-xl font-bold text-left text-[#849cd9]">
                699 €/mois !(1)
              </span>
            </p>
            {/* <div className="w-[936px] h-[97px] absolute left-[106.5px] top-[398.5px] rounded-[20px] bg-white" /> */}
            <SearchBar />
            <div className="w-[1251px] h-[298px] absolute left-[109.5px] top-[1389.5px] rounded-[20px] bg-white" />
            <div className="flex justify-center items-center w-[213px] h-14 absolute left-[172px] top-[1570px] gap-2.5 px-[103px] py-[9px] rounded-xl bg-white border border-[#3679ff]">
              <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
                Télécharger notre guide
              </p>
            </div>
            {/* 
            <div className="w-[150px] h-12">
              <p className="absolute left-[152px] top-[451px] text-base font-semibold text-left text-[#8c97b6]">
                Où cherchez-vous ?
              </p>
              <p className="absolute left-[152px] top-[425px] text-base font-bold text-left text-[#4f80ff]">
                Localisation
              </p>
            </div>
            <div className="w-[278px] h-12">
              <p className="absolute left-[365px] top-[451px] text-base font-semibold text-left text-[#8c97b6]">
                Combien de pièces souhaitez-vous ?
              </p>
              <p className="absolute left-[365px] top-[425px] text-base font-bold text-left text-[#4f80ff]">
                Nombre de pièces{' '}
              </p>
            </div>
            <div className="w-[179px] h-12">
              <p className="absolute left-[735px] top-[451px] text-base font-semibold text-left text-[#8c97b6]">
                Quel est votre budget ?
              </p>
              <p className="absolute left-[735px] top-[425px] text-base font-bold text-left text-[#4f80ff]">
                Budget
              </p>
            </div> */}
            <svg
              width={1}
              height={49}
              viewBox="0 0 1 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[332px] top-[423px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <line
                x1="0.5"
                y1="2.18557e-8"
                x2="0.499998"
                y2={49}
                stroke="url(#paint0_linear_1215_5710)"
              />
              <defs>
                <lineargradient
                  id="paint0_linear_1215_5710"
                  x1="-0.00000107093"
                  y1="24.5"
                  x2={-1}
                  y2="24.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3563DC" />
                  <stop offset="0.0434107" stop-color="#3E6FEF" />
                  <stop offset="0.940497" stop-color="#3062E3" />
                  <stop offset={1} stop-color="#154AD2" />
                </lineargradient>
              </defs>
            </svg>
            <svg
              width={1}
              height={49}
              viewBox="0 0 1 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[711px] top-[423px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <line
                x1="0.5"
                y1="2.18557e-8"
                x2="0.499998"
                y2={49}
                stroke="url(#paint0_linear_1215_5711)"
              />
              <defs>
                <lineargradient
                  id="paint0_linear_1215_5711"
                  x1="-0.00000107093"
                  y1="24.5"
                  x2={-1}
                  y2="24.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3563DC" />
                  <stop offset="0.0434107" stop-color="#3E6FEF" />
                  <stop offset="0.940497" stop-color="#3062E3" />
                  <stop offset={1} stop-color="#154AD2" />
                </lineargradient>
              </defs>
            </svg>

            <p className="w-[489px] absolute left-[166px] top-[1136px] text-lg font-semibold text-left text-black">
              <br />
            </p>
            <div className="w-[300px] h-[198px]">
              <p className="w-[253px] absolute left-[109px] top-[727px] text-xl font-bold text-center text-[#0e215c]">
                Des logements dans toute la France
              </p>
              <p className="w-[300px] absolute left-[86px] top-[787px] text-lg text-center text-[#849cd9]">
                Accéder à notre carte avec plus de 2 500 logements neufs
                disponibles.
              </p>
              <svg
                width={53}
                height={53}
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[53px] h-[53px] absolute left-[208.5px] top-[657.5px]"
                preserveAspectRatio="none"
              >
                <circle cx="26.5" cy="26.5" r="26.5" fill="#DCE6FF" />
                <path
                  d="M33.6585 24.701L26.6585 18.576C26.2815 18.2461 25.7185 18.2461 25.3415 18.576L18.3415 24.701C18.1245 24.8909 18 25.1653 18 25.4536V33.9998C18 34.5521 18.4477 34.9998 19 34.9998H23C23.5523 34.9998 24 34.5521 24 33.9998V29.9998C24 29.4476 24.4477 28.9998 25 28.9998H27C27.5523 28.9998 28 29.4476 28 29.9998V33.9998C28 34.5521 28.4477 34.9998 29 34.9998H33C33.5523 34.9998 34 34.5521 34 33.9998V25.4536C34 25.1653 33.8755 24.8909 33.6585 24.701Z"
                  stroke="#6A7CA8"
                  stroke-width={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="w-[300px] h-[221px]">
              <p className="w-[300px] absolute left-[1082px] top-[787px] text-lg text-center text-[#849cd9]">
                Une même personne pour vous accompagner, de la recherche de
                votre appartement jusqu’à votre emménagement.{' '}
              </p>
              <p className="w-[189px] absolute left-[1137px] top-[727px] text-xl font-bold text-center text-[#0e215c]">
                Un unique conseiller dédié
              </p>
              <svg
                width={53}
                height={53}
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[53px] h-[53px] absolute left-[1204.5px] top-[657.5px]"
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
            <div className="w-[300px] h-[152px]">
              <p className="w-[300px] absolute left-[418px] top-[787px] text-lg text-center text-[#849cd9]">
                Prêt à Taux Zéro - TVA 5,5 %
              </p>
              <p className="w-[262px] absolute left-[437px] top-[727px] text-xl font-bold text-center text-[#0e215c]">
                Des aides pour votre premier achat{' '}
              </p>
              <svg
                width={53}
                height={53}
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[53px] h-[53px] absolute left-[540.5px] top-[657.5px]"
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
            <p className="w-[1243px] absolute left-[119px] top-[1731px] text-lg font-light text-left text-[#98aad7]">
              <span className="w-[1243px] text-lg font-light text-left text-[#98aad7]">
                (1) Mensualités données à titre indicatif uniquement et non
                contractuelles, pour l’achat d’un appartement de 187.000 €, sur
                une base de durée de 25 ans, à un taux d’intérêt fixe moyen
                constaté sur le marché de 1.4%, hors frais, hors assurance et
                avec un apport personnel de 7.500€.{' '}
              </span>
              <br />
              <span className="w-[1243px] text-lg font-light text-left text-[#98aad7]">
                Pour être éligible au PTZ : il doit s’agir de votre premier
                achat en résidence principale et votre revenu fiscal de
                référence sur l’année 2 ans avant la réservation de
                l’appartement doit être inférieur à 37 000 €
              </span>
              <br />
              <br />
            </p>
            <p className="w-[742px] absolute left-[108px] top-[236px] text-[28px] text-left text-[#113eb6]">
              <span className="w-[742px] text-[28px] text-left text-[#113eb6]">
                Etudiants, Jeunes Actifs.
              </span>
              <br />
              <span className="w-[742px] text-[28px] font-bold text-left text-[#113eb6]">
                La première Offre Jeune pour devenir propriétaire{' '}
              </span>
            </p>
            <p className="absolute left-[105px] top-[1039px] text-[28px] font-bold text-left text-[#0e215c]">
              Nos services partenaires pour les étudiants
            </p>
            <p className="w-[534px] absolute left-[105px] top-[1089px] text-lg text-left text-[#849cd9]">
              <span className="w-[534px] text-lg text-left text-[#849cd9]">
                Kit le nid vous propose un{' '}
              </span>
              <span className="w-[534px] text-lg font-bold text-left text-[#849cd9]">
                ensemble d’offres avantageuses
              </span>
              <span className="w-[534px] text-lg text-left text-[#849cd9]">
                {' '}
                pour mieux répondre à vos besoins lors de vos études :{' '}
              </span>
              <br />
              <span className="w-[534px] text-lg text-left text-[#849cd9]">
                une location en résidence étudiante
              </span>
              <br />
              <span className="w-[534px] text-lg text-left text-[#849cd9]">
                une mutuelle santé
              </span>
              <br />
              <span className="w-[534px] text-lg text-left text-[#849cd9]">
                un garant solide pour vous
              </span>
              <br />
            </p>
            <svg
              width={64}
              height={64}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect
                x="7.68018"
                y="7.68018"
                width="49.92"
                height="49.92"
                rx="15.36"
                fill="url(#paint0_linear_1215_5775)"
              />
              <path
                d="M30.1868 38.7734C34.929 38.7734 38.7734 34.929 38.7734 30.1868C38.7734 25.4445 34.929 21.6001 30.1868 21.6001C25.4445 21.6001 21.6001 25.4445 21.6001 30.1868C21.6001 34.929 25.4445 38.7734 30.1868 38.7734Z"
                stroke="white"
                stroke-width="2.56"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.3198 36.3198L43.6798 43.6798"
                stroke="white"
                stroke-width="2.56"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <lineargradient
                  id="paint0_linear_1215_5775"
                  x1="32.6402"
                  y1="5.20253"
                  x2="32.6402"
                  y2="61.6378"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0434107" stop-color="#81A3F9" />
                  <stop offset={1} stop-color="#3462D8" />
                </lineargradient>
              </defs>
            </svg>

            <div className="w-[631px] h-[387.03px]">
              <div className="w-[166.34px] h-[166.34px] absolute left-[838.79px] top-[1096.25px] rounded-[11.09px] bg-[#ebf0f9]" />
              <div className="w-[166.34px] h-[166.34px] absolute left-[1192.55px] top-[988.69px] rounded-[11.09px] bg-[#ebf0f9]" />
              <div className="w-[75.41px] h-[75.41px] absolute left-[1110.48px] top-[1251.51px] rounded-[11.09px] bg-[#edf8f0]" />
              <div className="w-[75.41px] h-[75.41px] absolute left-[1081.65px] top-[939.89px] rounded-[11.09px] bg-[#fef2d5]" />
              <div className="w-[75.41px] h-[75.41px] absolute left-[727.89px] top-[1141.72px] rounded-[11.09px] bg-[#f5eaf9] border-[2.22px] border-[#f5eaf9]/10" />
              <div className="w-[166.34px] h-[166.34px]">
                <div className="w-[166.34px] h-[166.34px] absolute left-[908.65px] top-[1160.57px] rounded-[11.09px] bg-white" />
                <div className="w-[131.27px] h-[59.43px]">
                  <img
                    src="static/img/LogoCautioneo.svg"
                    className="w-[104.24px] h-[17.74px] absolute left-[940.3px] top-[1214.4px] object-cover"
                  />
                  <div className="w-[131.27px] h-[32.82px]">
                    <div className="w-[131.27px] h-[32.82px] absolute left-[926.92px] top-[1240.95px] rounded-[8.13px] bg-[#4842e3]/10" />
                    <p className="w-[104.55px] h-[22.07px] absolute left-[940.28px] top-[1247.34px] text-[16.26403045654297px] font-bold text-center text-[#4842e3]">
                      3 mois offerts
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[166.34px] h-[166.34px]">
                <div className="w-[166.34px] h-[166.34px] absolute left-[1110.48px] top-[1050.79px] rounded-[11.09px] bg-white" />
                <div className="w-[123.9px] h-[81.89px]">
                  <img
                    src="static/img/LogoHeyme.svg"
                    className="w-[123.9px] h-[41.51px] absolute left-[1132.15px] top-[1093.52px] object-cover"
                  />
                  <div className="w-[92.97px] h-[40.05px]">
                    <div className="w-[92.97px] h-[40.05px] absolute left-[1147.51px] top-[1135.16px] rounded-[10.01px] bg-[#ff3a3d]/10" />
                    <p className="w-[52.92px] h-[27.18px] absolute left-[1166.82px] top-[1143.02px] text-[20.025270462036133px] font-bold text-center text-[#ff3a3d]">
                      -15%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[300px] h-[195px]">
              <p className="w-[300px] absolute left-[750px] top-[761px] text-lg text-center text-[#849cd9]">
                Télécharger gratuitement les plans des appartements et les
                plaquettes de présentation de nos résidences.
              </p>
              <p className="absolute left-[798px] top-[727px] text-xl font-bold text-center text-[#0e215c]">
                Accès libre aux plans
              </p>
              <svg
                width={53}
                height={53}
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[53px] h-[53px] absolute left-[872.5px] top-[657.5px]"
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
            <p className="w-[488px] absolute left-[173px] top-[1501px] text-lg text-left text-[#849cd9]">
              N’attendez pas d’avoir 30 ans pour devenir propriétaire !
              Découvrez comment avec notre guide gratuit.
            </p>
            <p className="w-[567px] absolute left-[173px] top-[1453px] text-[28px] font-bold text-left text-[#113eb6]">
              Découvrez notre guide du premier achat.
            </p>
            <div className="w-[233.63px] h-[205px]">
              <img
                src="static/img/GuideA.svg"
                className="w-[233px] h-[205px] absolute left-[984.5px] top-[1437.5px] rounded-[10px] object-cover"
              />
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
        <div className="flex justify-center px-20 md:px-80">
          <Icon type="LogoVV" />
        </div>
        <Typography variant="h2">
          {isAuth ? 'Ravis de vous revoir ' : 'La première ofrre Jeune pour  '}
          <span>
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
        </Typography>
      </div>
      {isAuth ? (
        isMdView ? (
          <div
            onClick={() => setShowSearch(!showSearch)}
            className="flex flex-row-reverse mt-4 rounded-xl h-_53 bg-white border border-_bordureBleu   sm:w-_295 md:w-_536"
          >
            <div
              style={{
                background:
                  'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                width: '39px',
                height: '39px',
                borderRadius: '12px',
                padding: '7px',
                marginTop: '7px',
                marginRight: '9px',
              }}
            >
              <Icon type="recherche" color="white" />
            </div>
          </div>
        ) : (
          <div className="absolute z-10 top-[-15%]">
            <SearchBar />
          </div>
        )
      ) : (
        <div
          onClick={() => setShowSearch(!showSearch)}
          className="flex flex-row-reverse mt-4 rounded-xl h-_53 bg-white border border-_bordureBleu absolute w-_426 sm:w-_295 md:w-_536"
        >
          <div
            style={{
              background:
                'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
              width: '39px',
              height: '39px',
              borderRadius: '12px',
              padding: '7px',
              marginTop: '7px',
              marginRight: '9px',
            }}
          >
            <Icon type="recherche" color="white" />
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

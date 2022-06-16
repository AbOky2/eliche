import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid, Drawer } from '@material-ui/core';
import { openPopupWidget } from 'react-calendly';
import { isFn, pages } from 'helpers';
import Dialog from '@material-ui/core/Dialog';

import LogoImg from 'static/img/logo.png';
import { UpdateProfile, Btn } from 'components';
import { Icon, Modal } from '../form';
import useStyles from './styles';
import { Authentification } from 'components/authentification';
import { Partenaires } from 'components/Partenaires/index';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const styles = (theme) => ({
  toggleList: {
    padding: '4rem',
    backgroundColor: 'red',
  },
});

const MobileItems = [
  {
    href: '/dashboard',
    iconProps: { type: 'home' },
    txt: 'Accueil',
  },
  {
    href: '/dashboard/search/buy',
    singleType: '/dashboard/property/buy',
    iconProps: { type: 'search', style: { padding: 1 } },
    txt: 'Recherche',
  },

  // {
  //   href: '/dashboard/bookmark',
  //   iconProps: { type: 'heart' },
  //   txt: 'Favoris',
  // },
  // {
  //   href: '/dashboard/search/location',
  //   singleType: '/dashboard/property/location',
  //   iconProps: { type: 'profile' },
  //   txt: 'Mon profil',
  // },
];

const search = {
  href: '/dashboard/search/buy',
  singleType: '/dashboard/property/buy',
  iconProps: { type: 'search', style: { padding: 1 } },
  txt: 'Recherche',
};

const sponsorship = {
  href: '/dashboard/sponsorship',
  iconProps: { type: 'mobileSponsorship' },
  txt: 'Parrainage',
};

const partenaires = {
  //href: '/dashboard/demo2',
  iconProps: { type: 'mobileSponsorship' },
  txt: 'Partenaires',
};

const about = {
  href: '/dashboard/about',
  iconProps: { type: 'mobileSponsorship' },
  txt: 'Qui sommes nous ?',
};

const MenuItems = [MobileItems[0], about, search];

export const MobileMenu = ({
  user = {},
  logout,
  update,
  login,
  authSocialMedia,
  register,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const isAuth = user?._id;
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const classes = useStyles();
  const { asPath } = useRouter();
  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleModal = () => setShowModal(!showModal);
  const toggleModal1 = () => setShowModal1(!showModal1);
  const toggleModalMenu = () => setShowModalMenu(!showModalMenu);

  const handleSumbit = () => console.log('submit');

  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={clsx(classes.navContainer, classes.mobileContainer)}
      >
        {MobileItems?.map((props) => {
          let { href, txt, singleType, iconProps } = props;
          if (user && !user._id) {
            if (href === '/dashboard/bookmark') return null;
            txt = 'Recherche';
          }

          return (
            <Grid key={href} item>
              <Link href={href}>
                <a>
                  <Grid container alignItems="center" direction="column">
                    <Icon {...iconProps} />
                    <p>{txt}</p>
                  </Grid>
                </a>
              </Link>
            </Grid>
          );
        })}

      
       {isAuth?(
        <div >
          <a href="/dashboard/favoris">
            <div className=' px-2'>
          <Icon
              type="heart"
              noColor
              /></div>
            <p>Favoris</p> 
          </a>
        </div>
      ):(
        ""
      )}

      {isAuth?(
        <div className=' flex'>
          <a href="/dashboard/bookmark">
            <div className='items-center px-2'>
            <Icon
                type="profile"
                noColor
              /></div>
              <div className=''>
            <p>Mon Profil</p> </div>
            
       {/* { href: '/dashboard/bookmark',
        iconProps: { type: 'profile', style: { padding: 1 } },
        txt: 'Mon Profile',} */}
            </a>
          </div>
        ) : (
          ''
        )}

        {isAuth ? (
          ''
        ) : (
          <Grid item onClick={toggleModal} justifyContent="center">
            <Grid container alignItems="center" direction="column">
              <Icon type="profile" />
              <p>Connexion</p>
            </Grid>
          </Grid>
        )}

        <Grid item onClick={toggleMenu} className={classes.calendar}>
          <Icon type="menu" />
          <p>Menu</p>
        </Grid>
        <Dialog
          open={showMenu}
          onClose={toggleMenu}
          PaperProps={{
            style: {
              borderRadius: '12px',
              padding: '24px',
              width: '269px',
              height: '253px',
              // backgroundColor: 'red',
              display: 'absolute',

              top: '200px',
              left: '50px',
            },
          }}

          // onClick={handleSumbit}
          // title={
          //   changeName ? 'Finalise ton inscription' : 'Connexion ou inscription'
          // }
          // confirmText="Enregistrer"
        >
          <ul style={{}}>
            <li>
              <a
                href="/dashboard/bookmark"
                className="text-[14px] font-[700] leading-[18px] text-[#43434A]"
              >
                Mon profil
              </a>
            </li>
            <li>
              <a
                // href="news.asp"
                onClick={toggleModal1}
                className="text-[14px] font-[700] leading-[18px] text-[#43434A]"
              >
                Partenaires
              </a>
            </li>
            <div
              onClick={() =>
                openPopupWidget({ url: 'https://calendly.com/kitlenid' })
              }
              style={{
                padding: '12px 40px',
                fontSize: '14px',
                color: 'white',
                width: '221px',
                height: '42px',
                wordBreak: 'keep-all',
                marginTop: '0.6rem',
                background:
                  'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                transition: 'background .1s ease-out, box-shadow .1s ease-out',
                color: 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontFamily: 'Space Grotesk',
                '&:hover': {
                  background:
                    'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
                  transition:
                    'background .1s ease-out, box-shadow .1s ease-out',
                },
                '&:focus': {
                  color: 'white',
                },
              }}
            >
              Prendre rendez-vous
            </div>
            <div
              style={{
                marginTop: '16px',
                marginBottom: '6px',
                // marginLeft: '1.3rem',
                border: '1px solid #EFF4FF',
                height: '0px',
                width: '221px',
              }}
            />
            <li>
              <a
                href="/dashboard/about"
                className="text-[14px] font-[700] leading-[18px] text-[#6976A0]"
              >
                Qui sommes nous?
              </a>
            </li>
            <li>
              <a
                href="https://kitlenid.fr/blog"
                className="text-[14px] font-[700] leading-[18px] text-[#6976A0]"
              >
                Blog
              </a>
            </li>
          </ul>
        </Dialog>

        {/* <Drawer anchor="bottom" open={showMenu} onClose={toggleMenu}>
          <div className={classes.drawer}>
            <div className={clsx(classes.rightMenu, classes.rightMenuMobile)}>
              <div>
                <Link href={sponsorship.href}>
                  <a
                    className={
                      asPath === sponsorship.href ||
                      asPath.includes(sponsorship.href)
                        ? classes.mobileDrawerActiveMobile
                        : null
                    }
                  >
                    <span>{sponsorship.txt}</span>
                  </a>
                </Link>
                <br />

                <a
                  onClick={toggleModal1}
                  className={
                    asPath === partenaires.href ||
                    asPath.includes(partenaires.href)
                      ? classes.mobileDrawerActiveMobile
                      : null
                  }
                >
                  <span>{partenaires.txt}</span>
                </a>
                <br />
                <Link href="https://kitlenid.fr/blog">
                  <a>Blog</a>
                </Link>
              </div> */}
        {/* <UpdateProfile
              text="Mon compte"
              user={user}
              logout={logout}
              update={update}
              transparent
            />
             <div>
              <Btn
                text="Prendre rendez-vous"
                iconType="calendar"
                onClick={() =>
                  openPopupWidget({ url: 'https://calendly.com/kitlenid' })
                }
              />
            </div> */}
        {/* </div>
          </div>
        </Drawer> */}

        <Modal
          openModal={showModal}
          onClose={toggleModal}
          onClick={handleSumbit}
          showActions={false}
          title={
            changeName ? 'Finalise ton inscription' : 'Connexion ou inscription'
          }
          // confirmText="Enregistrer"
        >
          <Authentification
            setChangeName={setChangeName}
            login={login}
            register={register}
            authSocialMedia={authSocialMedia}
          />
        </Modal>

        <Modal
          openModal={showModal1}
          onClose={toggleModal1}
          onClick={handleSumbit}
          showActions={false}
          title="Partenaires"

          // confirmText="Enregistrer"
        >
          <Partenaires />
        </Modal>
      </Grid>
    </>
  );
};

const StudentProfile = ({
  user = {},
  logout,
  login,
  authSocialMedia,
  update,
  register,
  noHeaderMargin,
}) => {
  const { asPath } = useRouter();
  const classes = useStyles();
  const isAuth = user?._id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [changeName, setChangeName] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleModal1 = () => setShowModal1(!showModal1);

  return (
    <div className="m-4">
      <div
        className="flex flew-row justify-between"
        style={{
          alignItems: 'center',
        }}
      >
        <div className="align-start">
          <Link href={pages.dashboard}>
            <a>
              <Icon type="LogoVV" size="large" />
            </a>
          </Link>
        </div>
        <div
          className="flex font-_spaceGrotesk text-xl font-bold  text-[#113eb6] content-end gap-7 pr-10"
          style={{
            alignItems: 'center',
          }}
        >
          {(isAuth ? MenuItems : MenuItems.slice(0, 2))?.map(
            ({ href, txt, singleType }) => (
              <div key={href} item>
                <Link href={href}>
                  <a
                    className={
                      asPath === href ||
                      (href.includes('search') && asPath.includes(href)) ||
                      (singleType && asPath.includes(singleType))
                        ? classes.activeLink
                        : null
                    }
                  >
                    <span className="font-bold text-[#113eb6] text-2xl">
                      {txt}
                    </span>
                  </a>
                </Link>
              </div>
            )
          )}
          {/*  <div>
          <Btn
            text="Prendre rendez-vous"
            iconType="calendr"
            whiteColor
            onClick={() =>
              openPopupWidget({ url: 'https://calendly.com/kitlenid' })
            }
          />
            </div>*/}

          <div>
            <Link href="https://kitlenid.fr/blog">
              <a className=" text-2xl font-bold text-center text-[#113eb6]">
                Blog
              </a>
            </Link>
          </div>

          <div className=" text-red-800 -p-3">
            {/* <UpdateProfile
                      user={user}
                      logout={logout}
                      update={update}
                      transparent
                    />*/}
          </div>
          {!isAuth ? (
            <div
              style={{
                padding: '1.0rem 1.8rem',
                fontStyle: 'normal',
                fontSize: '1.2rem',
                color: 'white',
                wordBreak: 'keep-all',
                width: 'auto',
                background:
                  'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                transition: 'background .1s ease-out, box-shadow .1s ease-out',
                color: 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontFamily: 'Space Grotesk',
                '&:hover': {
                  background:
                    'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
                  transition:
                    'background .1s ease-out, box-shadow .1s ease-out',
                },
                '&:focus': {
                  color: 'white',
                },
              }}
              onClick={toggleModal}
            >
              Connexion / Inscription
            </div>
          ) : (
            <div
              style={{
                paddingLeft: '4rem',
              }}
            >
              {/* <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button> */}
              <div
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Icon type="menu" size="small" color="#4F80FF" />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '217px',
                    // height: '215px',
                    padding: '24px',
                    border: '1px solid #3679FF',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    boxShadow: 'none',
                  },
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => (window.location = '/dashboard/favoris')}
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '23px',
                    fontSize: '18px',
                    width: '72px',
                    color: '#43434A',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  Favoris
                </MenuItem>
                <MenuItem
                  onClick={toggleModal1}
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '23px',
                    width: '110px',
                    fontSize: '18px',
                    color: '#43434A',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  Partenaires
                </MenuItem>
                <MenuItem
                  onClick={() => (window.location = '/dashboard/bookmark')}
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '23px',
                    width: 100,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    fontSize: '18px',
                    color: '#43434A',
                  }}
                >
                  Mon profil
                </MenuItem>
                <div
                  onClick={logout}
                  style={{
                    padding: '12px 40px',
                    fontSize: '14px',
                    color: 'white',
                    width: '169px',
                    height: '42px',
                    wordBreak: 'keep-all',
                    marginTop: '0.6rem',
                    background:
                      'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                    transition:
                      'background .1s ease-out, box-shadow .1s ease-out',
                    color: 'white',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontFamily: 'Space Grotesk',
                    '&:hover': {
                      background:
                        'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
                      transition:
                        'background .1s ease-out, box-shadow .1s ease-out',
                    },
                    '&:focus': {
                      color: 'white',
                    },
                  }}
                >
                  Déconnexion
                </div>
              </Menu>
            </div>
          )}
        </div>
      </div>
      <Modal
        openModal={showModal}
        onClose={toggleModal}
        // onClick={handleSumbit}
        showActions={false}
        title={
          changeName ? 'Finalise ton inscription' : 'Connexion ou inscription'
        }
        // confirmText="Enregistrer"
      >
        <Authentification
          setChangeName={setChangeName}
          login={login}
          register={register}
          authSocialMedia={authSocialMedia}
        />
      </Modal>
      <Modal
        openModal={showModal1}
        onClose={toggleModal1}
        showActions={false}
        title="Partenaires"

        // confirmText="Enregistrer"
      >
        <Partenaires />
      </Modal>
    </div>
  );
};
StudentProfile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authSocialMedia: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default StudentProfile;

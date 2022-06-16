import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { Grid, Drawer } from '@material-ui/core';
import { openPopupWidget } from 'react-calendly';
import { isFn, pages } from 'helpers';
import LogoImg from 'static/img/logo.png';
import { UpdateProfile } from 'components';
import { Icon, Btn, Modal } from '../form';
import useStyles from './styles';
import { Authentification } from 'components/authentification';
import {Partenaires} from 'components/Partenaires/index';



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


const MenuItems = [...MobileItems, sponsorship];

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
  const [showModalMenu, setShowModalMenu] = useState(false)
  const classes = useStyles();
  const { asPath } = useRouter();
  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleModal = () => setShowModal(!showModal);
  const toggleModal1 = () => setShowModal1(!showModal1);
  const toggleModalMenu=() => setShowModalMenu(!showModalMenu)

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
      ):(
        ""
      )}

{isAuth?(
        ''
       
      ):(
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
      <Drawer anchor="bottom" open={showMenu} onClose={toggleMenu}>
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
            <br/>
            
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
                <br/>
                <Link href='https://kitlenid.fr/blog'>
                <a>
                  Blog
                </a>
              </Link>
              
            </div>
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
          </div>
        </div>
      </Drawer>

      
      {console.log(changeName)}
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
        title='Partenaires'
   
        // confirmText="Enregistrer"
      >
        <Partenaires />
      </Modal>
    </Grid>

    </>
  );


};

const StudentProfile = ({ user = {}, logout, update, noHeaderMargin }) => {
  const { asPath } = useRouter();
  const classes = useStyles();

  return (
    <div
     className='m-4'
    >
      <div className='flex justify-between'>
        <div >
          <Link href={pages.dashboard}>
            <a>
            <Icon
            type='LogoVV'
            size='large'
            />
            </a>
          </Link>
        </div>
        <div className="flex font-_spaceGrotesk text-xl font-bold  text-[#113eb6] content-end gap-7">
          {MenuItems?.map(({ href, txt, singleType }) => (
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
                  <span className='font-bold text-[#113eb6] text-3xl'>{txt}</span>
                </a>
              </Link>
            </div>
          ))}
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
                <Link href='https://kitlenid.fr/blog'>
                <a className=" text-3xl font-bold text-center text-[#113eb6]">
                Blog
              </a></Link>
              </div>
              <div className=' text-red-800 -p-3'>  
             {/* <UpdateProfile
                      user={user}
                      logout={logout}
                      update={update}
                      transparent
                    />*/}
              </div>
            
          </div>
      </div>
      
    </div>
  );
};
StudentProfile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default StudentProfile;

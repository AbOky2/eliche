import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userActions } from 'redux/_actions';
import { AdminContentWrapper } from 'components/wrapper';
import { addBookmarkApiMethod } from 'lib/api/customer';
import { Card, Btn, btnHover } from 'components';
import { getAddress, getNbPieces, getCardImg, singlePath } from 'helpers';
import withAuth from 'lib/withAuth';


const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '3.2rem',
    color: theme.palette.blue,
  },
  notFound: {
    '& > div:first-of-type': {
      marginBottom: '40px',
      padding: '3.2rem',
      borderRadius: '2.5rem',
      color: 'white',
      background: 'white',
      boxShadow: '0px 4px 20px rgba(24, 55, 50, 0.04)',
    },
    '& > div:first-of-type h3': {
      marginBottom: '1.7rem',
      color: theme.palette.blue,
      fontWeight: 800,
      '& span': {
        marginRight: 5,
      },
    },
  },
  card: {
    
  },
  btnContainer: {
    textAlign: 'center',
    '& > div': {
      display: 'inline-block',
      background: '#4f80ff',
      borderRadius: '10px',
      marginBottom: '1rem',
      '&:first-of-type': {
        marginRight: 12,
      },
      '&:last-of-type': {
        marginLeft: 12,
        background: 'white',
        border: `1px solid ${theme.palette.newBlue}`,
        ...btnHover.white,
        '& a': {
          color: '#4f80ff',
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: '2rem',
        padding: '1.8rem 1rem',
        width: '100%',
        '&:first-of-type': {
          marginRight: 0,
          '& a': {
            padding: 0,
          },
        },
        '&:last-of-type': {
          marginLeft: 0,
          marginBottom: 0,
          padding: 0,
        },
        '& a': {
          justifyContent: 'center',
        },
      },
    },
    '& a': {
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '28px',
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff',
    },
  },
  listContainer: {
    '& > a > div': {
      border: `1px solid ${theme.palette.hoverGray}`,
    },
  },
}));
const QuiSommesNous = ({ user, update }) => {
  const [state, setState] = useState(user?.bookmarks);
  const classes = useStyles();
  
  const handleBookmark = (id) => {
    setState(state.filter((elem) => elem._id !== id));
    addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
  };
  const [visible, setVisible] = useState(false);
  useEffect(() =>{
    setTimeout(() => setVisible(true), 10);
    return () => setVisible(false);
  }, []);
 
  return (

/*<Partenaires />*/
    
    <AdminContentWrapper noRedirect mobilePadding>

        <div className='text-[28px] text-_grisBleu mb-4  lg:mt-20 md:20 font-bold'>
            “Et pourquoi l’achat immobilier ne serait-il pas accessible aux jeunes ?”    
        </div>
        <div className='text-[14px] text-_gris lg:text-[18px] mb-4'>
        Nous avons créé Kit le nid au sein du groupe immobilier Nexity pour aider les jeunes à devenir propriétaire.
         Aucun acteur ne s’adresse à eux et pourtant leur intérêt pour l’achat immobilier est croissant.
        </div>
        <div className='text-_grisBleu text-[28px] mb-1 font-bold'>Notre objectif :</div>
        <div className='text-[14px] text-_gris lg:text-[18px] mb-4'>Les accompagner dans cette étape en simplifiant et en digitalisant le parcours d’achat.</div>

        <div>
            <img src='/static/img/quiSommes.png'/>
        </div>
     
   
    </AdminContentWrapper>
    
  );
};

QuiSommesNous.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};
const mapState = (state) => {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
};

const actionCreators = {
  update: userActions.updateUserDataOnly,
};
export default withAuth(connect(mapState, actionCreators)(QuiSommesNous));
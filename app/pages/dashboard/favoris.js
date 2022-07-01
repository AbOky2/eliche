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
const BookmarkPage = ({ user, update }) => {
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
      <div className=' p-4'>
        <Typography variant="h1" className={classes.title} style={{color:"#3679FF", fontWeight:"bold"}}>
          Favoris
        </Typography>
        {state?.length ? (
          <Grid  spacing={3} className=' tablette:grid tablette:grid-cols-2 tablette:gap-4'>
            {state.map(
              ({
                _id,
                heading,
                pictures,
                city,
                postal,
                typeOfAnnonce,
                minPieces,
                maxPieces,
                dimensions,
                price,
              }) => (
                <Grid
                  item
                  key={_id}
                 
                
                >
                  <Link href={singlePath({ typeOfAnnonce, _id })}>
                    <a >
                      <Card
                        _id={_id}
                        title={heading}
                        src={getCardImg(pictures?.[0])}
                        address={getAddress({ city, postal })}
                        description={getNbPieces(minPieces, maxPieces)}
                        dimensions={dimensions}
                        price={price}
                        liked
                        onClick={handleBookmark}
                      />
                    </a>
                  </Link>
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <div className={classes.notFound}>
            <div>
              <Typography variant="h3">
                <span role="img" aria-label="cring">
                  😢
                </span>
                Vous n’avez pas encore de logements sauvegardés en favoris
              </Typography>
              <Typography variant="body1">
                Pour ajouter un logement dans vos favoris, il vous suffit de
                cliquer sur le coeur en haut à gauche quand vous effectuez une
                recherche de logements. Ou bien, vous pouvez cliquer sur le
                bouton “sauvegarder” quand vous êtes sur la page d’un logement.
              </Typography>
            </div>

              
            <div>
              <Grid container justify="center" className={classes.btnContainer}>
                <Btn
                  href="/dashboard/search/buy"
                  text="Rechercher un logement à acheter"
                />
                <Btn
                  href="/dashboard/search/location"
                  text="Rechercher un logement à louer"
                  whiteColor
                />
              </Grid>
            </div>
          </div>
        )}
      </div>
    </AdminContentWrapper>
    
  );
};

BookmarkPage.propTypes = {
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
export default withAuth(connect(mapState, actionCreators)(BookmarkPage));
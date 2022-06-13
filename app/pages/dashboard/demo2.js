/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { GoogleMaps } from 'components/form/Input';
import { Grid } from '@material-ui/core';
import Router, { withRouter } from 'next/router';
import { Card } from 'components';
import {
  getPublicPropertiesApiMethod,
  togglePromotedApiMethod,
  getPromotedApiMethod,
} from 'lib/api';
import withAuth from 'lib/withAuth';

import { ListContainer } from 'components/page/search/views/partials';
import {
  sortByKeys,
  defaultLimit,
  defaultLoc,
  toggleArray,
  getAddress,
  getNbPieces,
  getCardImg,
} from 'helpers';

const useStyles = makeStyles((theme) => ({
  promotedViewContainer: {
    marginTop: '2rem',
    '& > div': {
      margin: '0 1rem',
      width: '30%',
    },
  },
  mapsViewContainer: {
    height: 'calc(100vh - 218px)',
    flexFlow: 'initial',
    '& > div': {
      '&:first-of-type': {
        maxWidth: 550,
      },
      '&:last-of-type': {
        position: 'sticky',
        top: 0,
        minHeight: '50vh',
        maxHeight: '100vh',
        maxWidth: '100%',
        flexGrow: 1,
        '& > div': {
          zIndex: 3,
          '&:first-of-type': {
            borderTopLeftRadius: '1.5rem',
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
              borderTopLeftRadius: 0,
            },
          },
          '& > div > div': {
            width: '20%',
            padding: '1rem',
          },
          '& #pagintationContainer': {
            width: '100%',
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        '&:first-of-type': {
          display: 'none',
        },
        '&:last-of-type': {
          paddingLeft: 0,
          minHeight: '65vh',
          '& > div:last-of-type': {
            position: 'absolute',
            bottom: '2rem',
          },
        },
      },
    },
  },
  listViewContainer: {
    height: '100%',
    padding: '0 2.4rem',
    '& > div:last-of-type': {
      height: '100%',
      paddingBottom: '7rem',
      paddingRight: 5,
      '&::-webkit-scrollbar': {
        width: '.7rem',
        background: 'transparent',
      },
      '&::-webkit-scrollbar-track': {
        width: '.7rem',
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.2)',
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        borderRadius: '.7rem',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    },
  },
  pagination: {
    marginTop: '1rem',
  },
  paginationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    height: '32px',
    margin: '0 3px',
    padding: '0 6px',
    fontSize: '1.4rem',
    minWidth: '32px',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: '1.43',
    borderRadius: '16px',
    userSelect: 'none',
  },
  paginationDisabledItem: {
    cursor: 'initial',
    opacity: 0.38,
  },
  paginationSelectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));
const defaultPage = 1;
const PartnersDashboard = ({ loc, typeOfAnnonce, sort, pieces }) => {
  const [state, setState] = useState([]);
  const [curr, setCurr] = useState(null);
  const [promotedList, setPromotedList] = useState(null);
  const [liked, setLiked] = useState([]);
  const [sortBy, setSortBy] = useState(sortByKeys[0]);
  const [searchValue, setSearchValue] = useState(defaultLoc.buy);
  const [queryData, setQueryData] = useState({
    loc,
    maxPrice: -1,
    typeOfAnnonce,
    sort,
    pieces,
  });
  const [page, setPage] = useState({
    pageList: state?.slice(0, defaultLimit),
    limit: defaultLimit,
    totalPages: state?.length,
  });
  const classes = useStyles();

  const reloadPartners = async ({ label } = {}) => {
    const loc = label ?? searchValue;

    const {
      list: { docs = [], ...pageInfo } = {},
    } = await getPublicPropertiesApiMethod({
      ...queryData,
      loc,
      page: 1,
      typeOfAnnonce: 'Vente',
    });

    if (docs) setState(docs);
    setSearchValue(loc);

    Router.push(
      {
        query: {
          page: pageInfo.page,
          loc: queryData.loc,
          sort: sortBy,
          maxPrice: -1,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const paginate = (page_number) =>
    state?.slice((page_number - 1) * page.limit, page_number * page.limit) ||
    [];
  const handlePage = (e, pageOffset) => {
    e.preventDefault();
    setPage({ ...page, page: pageOffset });
  };
  const handleSortSelect = () => ({ target: { value } }) => {
    setSortBy(value);
    setState(
      state.sort((a, b) => {
        if (value === sortByKeys[0]) return +a.price - +b.price;
        return +b.price - +a.price;
      })
    );
    setQueryData({ ...queryData, sort: value });
    Router.push(
      {
        query: {
          ...Router.query,
          sort: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  useEffect(
    () =>
      setPage({
        ...page,
        pageList: paginate(page.page),
      }),
    [page.page]
  );
  useEffect(() => {
    const currPage = defaultPage || 1;

    setPage({
      ...page,
      page: currPage,
      pageList: paginate(currPage),
      totalPages: Math.ceil(state?.length / page.limit),
    });
  }, [state, state[0], defaultPage]);

  const handleBookmark = (id) => {
    let data = [...liked];

    if (liked.length < 3 || liked.includes(id)) data = toggleArray(liked, id);

    setLiked(data);

    togglePromotedApiMethod({ data }).then(({ list = [] }) =>
      setPromotedList(list)
    );
  };
  useEffect(() => {
    (async () => {
      const { list = [] } = await getPromotedApiMethod();

      setPromotedList(list);
      setLiked(list.map((e) => e._id));
      reloadPartners();
    })();
  }, []);

  console.log(state.length);
  console.log("toute les pages", page);



  return (
    <>
      <GoogleMaps
        name="loc"
        value={searchValue}
        onChange={reloadPartners}
        placeholder="Où cherchez-vous ?"
      />
      <Grid
        container
        justify="center"
        className={classes.promotedViewContainer}
      >
        {promotedList?.map(
          ({
            _id,
            heading,
            pictures,
            dimensions,
            price,
            city,
            postal,
            minPieces,
            maxPieces,
          }) => (
            <Grid item key={_id}>
              <Card
                _id={_id}
                title={heading}
                src={getCardImg(pictures?.[0])}
                address={getAddress({ city, postal })}
                description={getNbPieces(minPieces, maxPieces)}
                dimensions={dimensions}
                price={price}
                liked={liked?.includes(_id)}
                onClick={handleBookmark}
              />
            </Grid>
          )
        )}
      </Grid>
      <Grid container className={classes.mapsViewContainer}>
        <ListContainer
          classes={classes}
          curr={curr}
          data={state}
          sortBy={sortBy}
          handleSortSelect={handleSortSelect}
          hasData={state.length}
          page={page}
          handlePage={handlePage}
          liked={liked}
          noRedirect
          handleBookmark={handleBookmark}
        />
      </Grid>
    </>
  );
};
export default withAuth(withRouter(PartnersDashboard), { adminRequired: true });

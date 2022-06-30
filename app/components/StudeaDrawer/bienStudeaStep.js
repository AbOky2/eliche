import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Router, { withRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ListContainer } from 'components/page/search/views/partials';
import  { useState, useEffect } from 'react';

import {
  getPublicPropertiesApiMethod,
  getPropertiesByCoordApiMethod,
  addBookmarkApiMethod,
} from 'lib/api/customer';
import {
  toggleArray,
  isArray,
  pick,
  typeOfAnnonciesObj,
  sortByKeys,
  defaultLimit,

} from 'helpers';
import { NotFound, AdminContentWrapper,Icon } from 'components';
import { MapsView } from 'components/page/search/views';
import SearchFields from 'components/page/search/searchFields';
import withStyles from 'components/page/search/styles';



export const BienStudea = ({
    classes,
  user,
  properties = {},
  typeOfAnnonce,
  update,
  loc,
  maxPrice,
  sort,
  pieces = [],
  handleChange,
  showSearch,
  setShowSearch,
  handleNextStep,
}) => {
    const isMapsView = false;

    const pagePropertyWhilist = ['page', 'limit', 'totalPages'];
    const defaultPage = 1;

    const [page, setPage] = useState({
        pageList: state?.slice(0, defaultLimit),
        limit: defaultLimit,
        totalPages: state?.length,
      });
      const [currView, setCurrView] = useState(isMapsView);
      const [center, setCenter] = useState([]);
      const [mapOptions, setMapOptions] = useState({});
      const [list, setList] = useState([]);
      const [refresh, setRefresh] = useState(false);
      const [isFirstRequest, setIsFirstRequest] = useState(true);
      const [makeChangeRequest, setMakeChangeRequest] = useState(false);
      const [makeRequest, setMakeRequest] = useState(false);
      const [allData, setAllData] = useState(properties);
      const [state, setState] = useState(allData.docs);
      const [delimiter, setDelimiter] = useState({
        coord: allData.coord,
        department: allData?.department,
      });
      const [sortBy, setSortBy] = useState(sort || sortByKeys[0]);
      const [liked, setLiked] = useState(
        user?.bookmarks?.map((elem) => elem._id) || []
      );
      const [queryData, setQueryData] = useState({
        loc,
        maxPrice,
        typeOfAnnonce,
        sort,
        pieces,
      });
    
      const toggleRefresh = (refresh) => setRefresh(refresh);
      const toggleView = () => setCurrView(!currView);
    
      const handleBudget = (value) =>
        setQueryData({ ...queryData, maxPrice: value });
      const handleMapSearch = (value) => {
        setQueryData({ ...queryData, loc: value?.label });
        setMakeRequest(true);
      };
      const handleSelect = (arg) => {
        let pieces = isArray(arg) ? arg : [arg];
    
        pieces = pieces.map((e) => parseInt(e, 10));
        setQueryData({ ...queryData, pieces });
      };
      const [curr, setCurr] = useState(null);
    
      const handleSortSelect =
        () =>
        ({ target: { value } }) => {
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
      const handleBookmark = (id) => {
        setLiked(toggleArray(liked, id));
        addBookmarkApiMethod({ id }).then(({ user: currUser }) => update(currUser));
      };
      const handlePage = (e, pageOffset) => {
        e.preventDefault();
        setPage({ ...page, page: pageOffset });
      };
    
      const handlePointChange = async (list, mapOptions = {}) => {
        if (isArray(mapOptions.center)) return;
    
        setMapOptions(mapOptions);
        setCenter(mapOptions.center);
        setList(list);
        setMakeChangeRequest(true);
      };
    
      const isLocation = typeOfAnnonce === typeOfAnnonciesObj.location;
      const requestData = async (page = 1) => {
        if (!queryData.maxPrice) queryData.maxPrice = -1;
        if (!queryData.loc) return (queryData.loc = null);
    
       
        const { list: { docs, near, zoom, coord, department, ...pageInfo } = {} } =
          await getPublicPropertiesApiMethod({
            ...queryData,
            page,
          });
    
        setState(docs);
        setAllData({ docs, near, zoom, department, coord });
        setDelimiter({ department, coord });
        setPage(pick(pageInfo, pagePropertyWhilist));
    
        Router.push(
          {
            query: {
              listView: currView,
              page: pageInfo.page,
              loc: queryData.loc,
              sort: sortBy,
              maxPrice: queryData.maxPrice,
              ...(isLocation ? {} : { pieces: queryData.pieces }),
            },
          },
          undefined,
          { shallow: true }
        );
      };
    
      const paginate = (page_number) =>
        state?.slice((page_number - 1) * page.limit, page_number * page.limit) ||
        [];
    
      const handleSumit = () => requestData();
      const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('xs'));
      const isMdView = useMediaQuery(theme.breakpoints.down('sm'));
      
      const [show, setShow] = useState(true);
    
    
      useEffect(() => {
        if (isFirstRequest) return;
        setMakeRequest(true);
      }, [queryData.loc]);
      useEffect(() => {
        const fetchByCoord = async () => {
          if (!makeChangeRequest || isArray(center)) return;
          if (!queryData.maxPrice) queryData.maxPrice = -1;
          if (!queryData.loc) queryData.loc = null;
          
    
          const { list: { docs, near, zoom, ...pageInfo } = {} } =
            await getPropertiesByCoordApiMethod({
              ...queryData,
              loc: center,
              zoom: mapOptions.zoom,
              box: mapOptions.box,
              page: 1,
            });
          const listId =
            list?.map(({ points = [] }) => points.map((e) => e.id)).flat() || [];
          const newState = docs?.filter((e) => listId.includes(e._id));
    
          if (newState) setState(newState);
          setState(docs);
          setAllData({ docs, near, zoom, department: null });
          setPage(pick(pageInfo, pagePropertyWhilist));
          setMakeChangeRequest(false);
        };
        fetchByCoord();
      }, [makeChangeRequest]);
    
      useEffect(() => {
        if (makeRequest) {
          requestData();
          setMakeRequest(false);
        }
      }, [makeRequest]);
    
      if (!state) return <NotFound showLink={false} />;
      // console.log({ loc, list, state });
    
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
    
      console.log("toute les données", state.length);
      console.log("La page ", page);
      
    
      function listMap(){
        document.getElementById("classe")
      }
    
 
  return (
    <Slide direction="up" in={showSearch} container={containerRef.current}>
      <div
        className=" w-full"
        style={{
          background:
            'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
          paddingTop: '48px',
          borderRadius: '5px',
          alignContent: 'center',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            top: '48px',
            padding: '24px',
            color: 'black',
            backgroundColor: 'white',
            borderTopLeftRadius: '22px',
            borderTopRightRadius: '22px',
          }}
        >
          <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
          <div className=' flex flex-row justify-between gap-2'>
          <section className=' w-full mt-8 '>
              <MapsView
                allData={allData}
                queryData={queryData}
                delimiter={delimiter}
                isFirstRequest={isFirstRequest}
                data={state}
                liked={liked}
                // sortBy={sortBy}
                refresh={refresh}
                setIsFirstRequest={setIsFirstRequest}
                handleBookmark={handleBookmark}
                handleSortSelect={handleSortSelect}
                toggleView={toggleView}
                // page={page?.page}
                matches={matches}
                isMdView={isMdView}
                handlePointChange={handlePointChange}
                toggleRefresh={toggleRefresh}
                isMapsView={currView}
              />
        </section>

        <section className='  order-first overflow-scroll min-w-[487px] p-4'>
          <>
          <div className=' w-full'>
          <div  className={
               clsx(
                  classes.searchMapContainer,
                  classes.resetSearchMapContainer
                )
          }>
          <SearchFields
            isLocation={isLocation}
            queryData={queryData}
            isMdView={isMdView}
            handleMapSearch={handleMapSearch}
            handleBudget={handleBudget}
            handleSumit={handleSumit}
            toggleView={toggleView}
            handleSelect={handleSelect}
            isMapsView={currView}
          /> </div></div>
            <ListContainer
            classes={classes}
              curr={currView}
              data={state}
              sortBy={sortBy}
              handleSortSelect={handleSortSelect}
              hasData={state.length}
              page={page}
              //handlePage={handlePage}
              liked={liked}
              noRedirect
              handleBookmark={handleBookmark}
            />
            </>
      </section>

      </div>
          </Box>
        </Box>
      </div>
    </Slide>
  );
};
BienStudea.propTypes = {
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
  user: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  maxPrice: PropTypes.string,
  page: PropTypes.any,
  typeOfAnnonce: PropTypes.string.isRequired,
  pieces: PropTypes.array,
  update: PropTypes.func.isRequired,
  loc: PropTypes.string,
};
BienStudea.defaultProps = {};

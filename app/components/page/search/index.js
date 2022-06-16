/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {ListContainer} from './views/partials'

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
import { MapsView } from './views';
import SearchFields from './searchFields';
import withStyles from './styles';





const pagePropertyWhilist = ['page', 'limit', 'totalPages'];
const defaultPage = 1;

const isMapsView = false;
const SearchPage = ({
  classes,
  user,
  properties = {},
  typeOfAnnonce,
  update,
  loc,
  page: defaultPage,
  maxPrice,
  sort,
  pieces = [],
}) => {
  // const [page, setPage] = useState({
  //   ...pick(properties, pagePropertyWhilist),
  //   page: defaultPage,
  // });
  const [page, setPage] = useState({
    pageList: state?.slice(0, defaultLimit),
    limit: defaultLimit,
    totalPages: state?.length,
  });
  const [curr, setCurr] = useState(null);
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
    <AdminContentWrapper noRedirect noPadding>
      <div>
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
          /> </div>

         {isMdView?(

          <div className=' flex flex-row justify-between gap-4'>
            
             {show?(<section className=' w-[900px]'>
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
                  <div className=" w-40 h-12  rounded-xl bg-_switchButton flex flex-row my-96 cursor-pointer z-10 absolute top-[38%] sm:top-[40%] xs:top-[20%] items-center left-[40%]  " onClick={()=>setShow(!show)} >
                          <p className="left-4 top-2 text-sm font-bold text-white text-center p-3 mx-4">Mode Liste</p>
                          <div 
                          className=' py-3 -mx-3'
                          >
                          <Icon
                            type="liste"
                            size="small"
                            color='white'
                          />
                        </div>
                  </div>
              </section>):(

               <section id='classe' className=' p-6 order-first overflow-scroll w-[700px] h-[560px]'>
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
                  
                    <div className=" w-40 h-12  rounded-xl bg-_switchButton flex flex-row my-96 cursor-pointer z-10 absolute top-[38%] sm:top-[40%] xs:top-[20%  items-center left-[40%] " onClick={()=>setShow(!show)}>
                          <p className="left-4 top-2 text-sm font-bold text-white text-center p-3 mx-4">Mode Carte</p>
                          <div 
                          className=' py-3 -mx-3'
                          >
                          <Icon
                            type="carte"
                            size="small"
                            color='white'
                          />
                        </div>
                  </div>
              </section> 
                )}
            
            

              </div>

         ):(
          <div className=' flex flex-row justify-between gap-4'>
          <section className=' w-[900px]'>
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

        <section className=' p-6 order-first overflow-scroll w-[700px] h-[560px] '>
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
      </section>

      </div>
         )}
       
      </div>
    </AdminContentWrapper>
  );
};

SearchPage.propTypes = {
  user: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  maxPrice: PropTypes.string,
  page: PropTypes.any,
  typeOfAnnonce: PropTypes.string.isRequired,
  pieces: PropTypes.array,
  update: PropTypes.func.isRequired,
  loc: PropTypes.string,
};
SearchPage.defaultProps = {
  loc: '',
  page: '1',
  maxPrice: null,
  pieces: [],
};
export default withRouter(withStyles(SearchPage));

import { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { GoogleMaps, CustomInput } from 'components/form/Input';
import { propertyPiecesSelectMap, isArray, typeOfAnnonciesObj } from 'helpers';

import { Grid } from '@material-ui/core';
import { DropdownSelect } from 'components/form/Select';

export const SearchBar = ({}) => {
  const [queryData, setQueryData] = useState({
    loc: '',
    maxPrice: 0,
    typeOfAnnonce: typeOfAnnonciesObj.buy,
    pieces: null,
  });
  const [state, setState] = useState({});
  const [makeRequest, setMakeRequest] = useState(false);
  const handleSelectPieces = (arg) => {
    let pieces = isArray(arg) ? arg : [arg];

    pieces = pieces.map((e) => parseInt(e, 10));
    setQueryData({ ...queryData, pieces });
  };
  const isLocation = queryData.typeOfAnnonce === typeOfAnnonciesObj.location;
  const handleFinish = () => {
    Router.push({
      pathname: 'dashboard/search/buy',
      query: { ...queryData },
    });
  };
  const handleMapSearch = (value) => {
    setQueryData({ ...queryData, loc: value?.label });
    setMakeRequest(true);
  };
  const handleBudget = (value) =>
    setQueryData({ ...queryData, maxPrice: value });

  return (
    <Grid className="flex container w-[936px] h-[97px] absolute left-[106.5px] border-2 top-[398.5px] rounded-[20px] bg-white">
      <Grid item md={3}>
        <p className="relative left-[39px] top-[5px] text-[1.1rem] mt-3 font-[900] text-left text-[#4f80ff]">
          Localisation
        </p>
        <GoogleMaps
          name="loc"
          className="border-none"
          value={queryData.loc}
          onChange={handleMapSearch}
          placeholder={'Où cherchez-vous ?'}
        />
      </Grid>
      <div
        style={{
          marginTop: '1.4rem',
          marginLeft: '1.6rem',
          borderLeft: '0.08rem solid #113EB6',
          height: '50px',
        }}
      />
      <Grid item md={6}>
        <p className="relative left-[29px] top-[5px] text-[1.1rem] mt-3 font-[900] text-left text-[#4f80ff]">
          Nombre de pièce
        </p>
        <DropdownSelect
          name="typeOfAnnonce"
          placeholder="Combien de pièce souhaitez-vous?"
          list={propertyPiecesSelectMap}
          value={queryData.pieces}
          onChange={handleSelectPieces}
        />
      </Grid>
      <div
        style={{
          marginTop: '1.4rem',
          marginLeft: '1.3rem',
          borderLeft: '0.08rem solid #113EB6',
          height: '50px',
        }}
      />
      <Grid
        item
        md={5}
        // className="w-[350px] h-12"
        // className={clsx(classes.search, classes.locationMaxBudget)}
      >
        <p className="relative left-[39px] top-[5px] text-[1.1rem] mt-3 font-[900] text-left text-[#4f80ff]">
          Budget
        </p>
        <CustomInput
          name="maxPrice"
          value={
            queryData.maxPrice > 0 && !Number.isNaN(queryData.maxPrice)
              ? queryData.maxPrice
              : ''
          }
          showSub={!isLocation}
          onChange={handleBudget}
          placeholder="Quel est votre budget?"
          handleSumit={handleFinish}
        />
      </Grid>
    </Grid>
    // <div>
    //   <div className="w-[936px] h-[97px] absolute left-[106.5px] top-[398.5px] rounded-[20px] bg-white" />
    //   {/* <div className="w-[1251px] h-[298px] absolute left-[109.5px] top-[1389.5px] rounded-[20px] bg-white" /> */}
    //   {/* <div className="flex justify-center items-center w-[213px] h-14 absolute left-[172px] top-[1570px] gap-2.5 px-[103px] py-[9px] rounded-xl bg-white border border-[#3679ff]">
    //     <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-[#3679ff]">
    //       Télécharger notre guide
    //     </p>
    //   </div> */}

    //   <div className="w-[150px] h-12">
    //     <LocationStep />
    //     {/* <p className="absolute left-[152px] top-[451px] text-base font-semibold text-left text-[#8c97b6]">
    //       Où cherchez-vous ?
    //     </p>
    //     <p className="absolute left-[152px] top-[425px] text-base font-bold text-left text-[#4f80ff]">
    //       Localisation
    //     </p> */}
    //   </div>
    //   <div className="w-[278px] h-12">
    //     <p className="absolute left-[365px] top-[451px] text-base font-semibold text-left text-[#8c97b6]">
    //       Combien de pièces souhaitez-vous ?
    //     </p>
    //     <p className="absolute left-[365px] top-[425px] text-base font-bold text-left text-[#4f80ff]">
    //       Nombre de pièces{' '}
    //     </p>
    //   </div>
    //   <div className="w-[179px] h-12">
    //     <p className="absolute left-[735px] top-[451px] text-base font-semibold text-left text-[#8c97b6]">
    //       Quel est votre budget ?
    //     </p>
    //     <p className="absolute left-[735px] top-[425px] text-base font-bold text-left text-[#4f80ff]">
    //       Budget
    //     </p>
    //   </div>
    // </div>
  );
};
SearchBar.propTypes = {};
SearchBar.defaultProps = {};

import React, { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import {
  getAddress,
  getNbPieces,
  getCardImg,
  spaceCurrency,
  singlePath,
} from 'helpers';

import { Icon } from 'components';
import useStyles from './styles';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export const Card = ({
  _id,
  title,
  src,
  address,
  description,
  dimensions,
  price,
  onClick,
  liked,
  showLikes = true,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const isMdView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>

    {isMdView? (

<div className='rounded-xl border border-_bordureBleu flex gap-5 p-4 w-full mb-4 flex-row bg-white'>
        <div className='order-first w-1/2'>
          <div className="w-[109px] h-[109px] p-4 rounded-[10px] bg-[#c4c4c4] object-contain bg-cover" style={{ backgroundImage: `url(${src})` }}></div>
        </div>
        <div className=' w-full'>
                <div className="text-xs font-[700] text-left text-[#3679ff] text-[18px] leading-5">
                  {title}
                </div>
                <div className='text-xs text-[#6976a0] mt-2'> {address}</div>
                <div className='text-[#1a2e6c] text-lg'>{description}</div>
                <div className='text-[#6976a0] text-sm'> à partir de 
                  <strong className='text-xs text-[#1a2e6c]'>{` ${spaceCurrency(price)}€`}</strong>
                </div>
                <div className='text-[#6976a0] text-sm'> soit
                  <strong className='text-xs text-[#1a2e6c]'>{` ${spaceCurrency(price)}€ / mois`}</strong>
                </div>
        </div>
        <div className=' flex flex-col-reverse w-full'>
            {showLikes && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick(_id);
                  }}
                  className="pointer like flex-row-reverse flex"
                >
                  <Icon
                    type="heart"
                    size="medium"
                    strokeColor={liked ? 'red' : 'newBlue'}
                    color={liked ? 'red' : 'white'}
                  />
                </span>
              )}
        </div>


</div>
    ):(
      
      
<div className='rounded-xl border border-_bordureBleu flex  p-4 w-full mb-4 flex-row bg-white '>
        <div className='order-first w-[80%]'>
          <div className="w-[109px] h-[109px] p-4 rounded-[10px] bg-[#c4c4c4] object-contain bg-cover" style={{ backgroundImage: `url(${src})` }}></div>
        </div>
        <div className=' w-full'>
                <div className="text-xs font-[700] text-left text-[#3679ff] text-[18px] leading-5">
                  {title}
                </div>
                <div className='text-xs text-[#6976a0] mt-2'> {address}</div>
                <div className='text-[#1a2e6c] text-lg'>{description}</div>
                <div className='text-[#6976a0] text-sm'> à partir de 
                  <strong className='text-xs text-[#1a2e6c]'>{` ${spaceCurrency(price)}€`}</strong>
                </div>
                <div className='text-[#6976a0] text-sm'> soit
                  <strong className='text-xs text-[#1a2e6c]'>{` ${spaceCurrency(price)}€ / mois`}</strong>
                </div>
        </div>
        <div className=' flex flex-col-reverse w-full'>
            {showLikes && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick(_id);
                  }}
                  className="pointer like flex-row-reverse flex"
                >
                  <Icon
                    type="heart"
                    size="medium"
                    strokeColor={liked ? 'red' : 'newBlue'}
                    color={liked ? 'red' : 'white'}
                  />
                </span>
              )}
        </div>


</div>
      )}

      {/* 
    // <div className={classes.container}>
    //   <div className='bg-black' >
    //     <div style={{ backgroundImage: `url(${src})` }}></div>
    //   </div>
    //   <div className=' text-_aPropos bg-blue-600'>
    //   <p className=" text-lg font-bold text-left text-[#3679ff]">{title}</p>
    //     <Typography
    //       variant="body1"
    //       style={{ display: address ? 'block' : 'none' }}
    //     >
    //       {address}
    //     </Typography>
    //     <Typography variant="body1">{description}</Typography>
    //      <Typography variant="body1">{dimensions}</Typography> 
    //     <Typography variant="body1">
    //       <span>à partir de</span>
    //       {` ${spaceCurrency(price)}€`}
    //     </Typography>
    //     <Typography variant="body1">
    //       <span>soit</span>
    //       {` ${spaceCurrency(price)}€ / mois`}
    //     </Typography>
    //     {showLikes && (
    //       <span
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           e.preventDefault();
    //           onClick(_id);
    //         }}
    //         className="pointer like"
    //       >
    //         <Icon
    //           type="heart"
    //           size="medium"
    //           strokeColor={liked ? 'red' : 'newBlue'}
    //           color={liked ? 'red' : 'white'}
    //         />
    //       </span>
    //     )}
    //   </div>
    // </div> 
  */}
    </>
  );
};

export const MapsCard = ({
  _id,
  heading,
  city,
  postal,
  minPieces,
  maxPieces,
  pictures = [],
  typeOfAnnonce,
  ...mapsProps
}) => {
  const [state, setState] = useState(0);
  const classes = useStyles();
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setState(state < pictures.length - 1 ? state + 1 : 0);
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    setState(state === 0 ? pictures.length - 1 : state - 1);
  };

  return (
    <div className={classes.mapsContainer}>
      <Link href={singlePath({ typeOfAnnonce, _id })}>
        <a>
          <Card
            {...mapsProps}
            title={heading}
            src={getCardImg(pictures[state])}
            address={getAddress({ city, postal })}
            description={getNbPieces(minPieces, maxPieces)}
            typeOfAnnonce={typeOfAnnonce}
          />
        </a>
      </Link>
      {pictures.length > 1 && (
        <>
          <span onClick={handlePrev} onDoubleClick={handleDoubleClick}>
            <Icon
              type="sliderArrow"
              size="small"
              color="iconBlue"
              rotate="180deg"
            />
          </span>
          <span onClick={handleNext} onDoubleClick={handleDoubleClick}>
            <Icon type="sliderArrow" size="small" color="iconBlue" />
          </span>
        </>
      )}
    </div>
  );
};

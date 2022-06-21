import { useState } from 'react';
import clsx from 'clsx';
import { openPopupWidget } from 'react-calendly';
import { Grid, Typography } from '@material-ui/core';
import { Icon, Btn } from 'components';
import { tranportationsKeys, individualAdvantages } from 'helpers';

const BtnCalendly = () => (
  <div
    className="flex justify-center  relative  py-4 rounded-xl mb-1 mt-6 cursor-pointer w-[343px] sm:w-[260px] xs:w-[200px]"
    onClick={() => openPopupWidget({ url: 'https://calendly.com/kitlenid' })}
    style={{
      background: 'linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)',
    }}
  >
    <p className=" flex-shrink-0 text-sm font-bold text-left text-white">
      Être rappelé selon mes dispos{' '}
    </p>
  </div>
);

const Extras = ({ advantages = [] }) => (
  <>
    <p className="flex-grow-0 flex-shrink-0 w-[295px] font-bold text-left  text-_rougeStudea text-2xl">
      Les petits plus{' '}
    </p>
    <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mt-9 mb-5">
      {advantages.map((elem) => (
        <div key={elem} alignItems="center">
          <Icon
            type="checked"
            color="newRed"
            customSize={{ width: 20, height: 20 }}
          />
          <p>{elem}</p>
        </div>
      ))}
    </div>
  </>
);
const currIcons = ['bus', 'rer', 'tramway', 'metro'];
const Sidebar = ({ isLocation, property, classes }) => {
  const [showExtra, setShowExtra] = useState(false);
  const transportations = property.transportations || {};
  const advantages =
    property.advantages?.filter((e) => !individualAdvantages.includes(e)) || [];
  const limit = 8;
  let maxLength = 0;

  const toggleExtra = () => setShowExtra(!showExtra);

  return (
    <div>
      {Object.keys(transportations).length ? (
        <div className="flex flex-col justify-center items-center relative gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mb-[8px] ">
          {isLocation ? (
            <p className=" ext-[18px] font-bold text-center text-_rougeStudea mb-5">
              Transports à proximité
            </p>
          ) : (
            <p className=" text-[18px] font-bold text-center text-_aPropos mb-5">
              Transports à proximité
            </p>
          )}

          <Grid container justify="flex-start">
            {Object.keys(transportations)
              .sort((a, b) => a < b)
              .map((elem) => {
                const list = transportations[elem];
                maxLength = list.length > maxLength ? list.length : maxLength;

                return (
                  <Grid item key={elem} xs={4}>
                    <h2>
                      {currIcons.includes(tranportationsKeys[elem]) ? (
                        <Icon
                          type={tranportationsKeys[elem]}
                          noColor
                          size="middle"
                        />
                      ) : (
                        tranportationsKeys[elem]
                      )}
                    </h2>
                    <ul>
                      {list.map((e) =>
                        e.name.length < 5 ? (
                          <li
                            key={e.name}
                            style={{
                              backgroundColor: e.At.color,
                              color: e.At.textColor,
                              minWidth: '2em',
                              borderRadius: e.name.length < 3 ? '50px' : '2px',
                              fontSize: '0.9em',
                              textAlign: 'center',
                              fontFamily: 'Arial',
                              marginTop: '20px',
                              padding: '6px',
                              float: 'left',
                              clear: 'left',
                            }}
                          >
                            <b>{e.name}</b>
                          </li>
                        ) : (
                          <></>
                        )
                      )}
                    </ul>
                  </Grid>
                );
              })}
          </Grid>
          {maxLength > limit ? (
            <div className={classes.transportDisplayMore} onClick={toggleExtra}>
              <Icon
                type="sliderArrow"
                size="small"
                rotate={showExtra ? '270deg' : '90deg'}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}

      {isLocation && (
        <div className="flex flex-col justify-start items-start  gap-2 p-6 rounded-xl bg-white border border-_bordureBleu mb-5">
          <p className="flex-grow-0 flex-shrink-0 w-[295px] font-bold text-left  text-_rougeStudea text-2xl">
            Frais à prevoir:
          </p>
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[295px] text-sm font-normal text-left  text-_gris">
            Il s’agit de frais uniques, à débourser une seule et unique fois.
            <br />
            Honoraires d’organisation de la visite + Constitution du dossier +
            Rédaction du bail à la charge du locataire :{' '}
            <strong className=" text-_rougeStudea font-semibold">
              502€ TTC
            </strong>
            <br />
            Honoraires de réalisation d’état des lieux à la charge du locataire
            :
            <strong className=" text-_rougeStudea font-semibold">
              {' '}
              188€ TTC
            </strong>
            <br />
            <br />{' '}
            <strong className=" text-_rougeStudea font-semibold">
              Total des frais : 1284€ TTC
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};
export { BtnCalendly };
export default Sidebar;

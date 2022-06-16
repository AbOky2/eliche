import { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { LocationStep } from './locationStep';
import { BudgetStep } from './budgetStep';
import { PieceStep } from './pieceStep';

const compList = [LocationStep, BudgetStep, PieceStep];
export const SearchDrawer = ({ showSearch, setShowSearch }) => {
  const [state, setState] = useState({});
  const [step, setStep] = useState(0);

  const handleChange = ({ name, value }) =>
    setState({ ...state, [name]: value });
  const handleFinish = () => {
    Router.push({
      pathname: 'dashboard/search/buy',
      query: { ...state },
    });
  };
  const handleNextStep = () =>
    step < compList.length - 1 ? setStep(step + 1) : handleFinish();

  const Component = compList[step];

  return (
    <div
      id="test1"
      style={{
        position: 'fixed',
        width:'100%',
        height: '100%',
        top: '0',
        left: '0',
        zIndex: 100,
        display: showSearch ? 'flex' : 'none',
      }}
    >
      <Component
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleChange={handleChange}
        setStep={setStep}
        handleNextStep={handleNextStep}
      />
    </div>
  );
};
SearchDrawer.propTypes = {
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
};
SearchDrawer.defaultProps = {
  showSearch: false,
  setShowSearch: undefined,
};

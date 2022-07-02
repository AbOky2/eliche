import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import Header from 'components/Header/Header';
// import Coeur from 'components/Coeur/Coeur';
// import Footer from 'components/Footer/Footer';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Kit le nid</title>
          <meta name="description" content="List of purchased books." />
        </Head>
        {/* <Header />
        <Coeur />
        <Footer /> */}
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;

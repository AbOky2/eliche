/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Icon } from 'components';
import { logOut } from 'lib/api/public';

import MenuWithAvatar from './MenuWithAvatar';

const styleToolbar = {
  background: '#FFF',
  height: '64px',
  paddingRight: '20px',
};
const optionsMenuCustomer = [
  {
    text: 'My books',
    href: '/customer/my-books',
    as: '/my-books',
  },
  {
    text: 'Log out',
    href: '/logout',
  },
];

const optionsMenuAdmin = [
  {
    text: 'Admin',
    href: '/admin',
  },
  {
    text: 'Log out',
    href: '/logout',
    onClick: (e) => {
      e.preventDefault();
      logOut().then(() => (window.location = '/'));
    },
  },
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
    isAdmin: PropTypes.bool,
    isGithubConnected: PropTypes.bool,
  }),
  hideHeader: PropTypes.bool,
  redirectUrl: PropTypes.string,
};

const defaultProps = {
  user: null,
  hideHeader: false,
  redirectUrl: '',
};

export const Header = ({ user, hideHeader, redirectUrl }) => (
  <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      top: hideHeader ? '-64px' : '0px',
      transition: 'top 0.5s ease-in',
    }}
  >
    <Toolbar style={styleToolbar}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item sm={8} xs={7} style={{ textAlign: 'left' }}>
          <Link href="/admin">
            <a>
              <Icon type="logoFull" customSize={{ width: 137, height: 50 }} />
            </a>
          </Link>
        </Grid>
        <Grid item sm={2} xs={5} style={{ textAlign: 'right' }}>
          {user ? (
            <div style={{ whiteSpace: ' nowrap' }}>
              {!user.isAdmin ? (
                <MenuWithAvatar
                  options={optionsMenuCustomer}
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              ) : null}
              {user.isAdmin ? (
                <MenuWithAvatar
                  options={optionsMenuAdmin}
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              ) : null}
            </div>
          ) : (
            <Link
              href={{
                pathname: '/public/',
                query: { redirectUrl },
              }}
              as={{
                pathname: '/',
                query: { redirectUrl },
              }}
            >
              <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
            </Link>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

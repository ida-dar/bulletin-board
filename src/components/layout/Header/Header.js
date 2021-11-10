import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllUsers, getUserStatus } from '../../../redux/usersRedux.js';

import styles from './Header.module.scss';
import { Link } from '@material-ui/core';

const Component = ({className, user, userStatus}) => {

  const handleUserChange = (e) => {
    e.preventDefault();

    if(user.logged === false) userStatus(true);
    else userStatus(false);
  };

  return(
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar disableGutters className={clsx(className, styles.toolbar)}>
          <Link href="/">Posts</Link>
          {user.logged === true ?
            <div className={clsx(className, styles.profile)}>
              <Button>My profile</Button>
              <Button>My posts</Button>
              <Link href="/" onClick={handleUserChange}>Logout</Link>
            </div>
            :
            <>
              {/* <Link component={Button} href="https://google.com" onClick={() => setUser(!user)}>Login</Link> */}
              <Button href="/" onClick={handleUserChange}>Login</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  userStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  userStatus: status => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};

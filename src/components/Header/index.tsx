import * as React from 'react';
import { connect } from 'react-redux';
import { withState, withHandlers, compose } from 'recompose';
import Hamburger from 'react-hamburger-menu';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import Navigation from '../Navigation';
import { Link } from 'react-router-dom';
import { HOME, LANDING } from '../../constants/routes';

const connectToRedux = connect(
  (state: any) => ({
    currentUser: state.session.currentUser,
  }),
);

const enhance: any = compose(
  connectToRedux,
  withState('isExpand', 'setIsExpand', false),
  withHandlers({
    toggleExpand: ({ isExpand, setIsExpand }) => () => setIsExpand(!isExpand),
  }),
);

const Header = ({ currentUser, toggleExpand, isExpand }) => (
  <nav className="header">
    <div className="navbar navbar-wide">
      {currentUser === null
        ? <Link className="brand" to={LANDING}>🍯</Link>
        : <Link className="brand" to={HOME}>🍯</Link>
      }
      <Navigation type="wide" />
    </div>
    <div className="navbar navbar-tiny">
      {currentUser === null
        ? <Link className="brand" to={LANDING}>🍯</Link>
        : <Link className="brand" to={HOME}>🍯</Link>
      }
      <Hamburger
        isOpen={isExpand}
        menuClicked={toggleExpand}
        width={24}
        height={16}
      />
    </div>
    <div className="navbar-tiny-links">
      <SlideDown>
        {isExpand ? <Navigation type="tiny" /> : null}
      </SlideDown>
    </div>
  </nav>
);

export default enhance(Header);

import * as React from 'react';
import { withState, withHandlers, compose } from 'recompose';
import Hamburger from 'react-hamburger-menu';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import Navigation from '../Navigation';

const enhance: any = compose(
  withState('isExpand', 'setIsExpand', false),
  withHandlers({
    toggleExpand: ({ isExpand, setIsExpand }) => () => setIsExpand(!isExpand),
  }),
);

const Header = ({ toggleExpand, isExpand }: { toggleExpand: (event: any) => void, isExpand: boolean }) => (
  <nav className="header">
    <div className="navbar navbar-wide">
      <span className="brand">🍯</span>
      <Navigation type="wide" />
    </div>
    <div className="navbar navbar-tiny">
      <span className="brand">🍯</span>
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

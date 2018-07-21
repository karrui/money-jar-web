import * as React from "react";
import { Link } from 'react-router-dom';
import { SIGN_UP, SIGN_IN } from "../constants/routes";

const LandingPage = () => (
  <div className="landing-container">
  <div className="left">
    <div className="tagline">
      <h1>A sharable, online memory jar</h1>
      <h2>Keep track of contributions and goals</h2>
    </div>
    <div className="action-area">
      <Link className="signup-btn" to={SIGN_UP}>Sign up for free</Link>
      <Link className="login-btn" to={SIGN_IN}>Log in</Link>
    </div>
    <div className="credits">
      made by <a href="https://github.com/karrui">@karrui</a>
    </div>
  </div>
  <div className="right">
    <div className="landing-gif-container">
      <video
        width="100%"
        height="100%"
        controls={true}
        loop={true}
        autoPlay={true}
        style={{ position: 'absolute' }}
      >
        <source src={'./landing-demo.mp4'} type="video/mp4" />
      </video>
    </div>
  </div>
  </div>
);

export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";

const Main = () => (
  <div className="main-container">
    <h1 className="main-heading">Voting app</h1>
    <h5>Hi Folks!! Welcome to the Realtime Voting App</h5>
    <div className="main-btn-section">
      <Link to="/voting" target="_blank" className="show-stats-btn">
        Voting App
      </Link>
      <a href="#" target="blank" className="article">Learn how to build this Voting App.</a>
    </div>
    <div className="footer">
      <p>Powered by <a href="https://www.ably.io/" target = "blank">Ably Realtime</a></p>
    </div>
  </div>
);

export default Main;

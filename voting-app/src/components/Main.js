import React from "react";
import { Link } from "react-router-dom";

const Main = () => (
  <div>
    <h1 className="main-heading">Voting app</h1>
    <h5>Hi Folks!! Welcome to the Realtime Voting App</h5>
    <div className="main-btn-section">
      <Link to="/dashboard" target="_blank" className="show-stats-btn">
        Dashboard
      </Link>
      <Link to="/voting" target="_blank" className="show-stats-btn">
        Voting App
      </Link>
    </div>
  </div>
);

export default Main;

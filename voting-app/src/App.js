import React from 'react';
import logo from './logo.svg';
import './App.css';
import Voting from './components/Voting';
import Chart from './components/Chart';
import Header from './components/Header';
import { HashRouter as Router, Route, Switch,Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path ="/chart">
               <Chart/>
            </Route>
            
            <Route exact path="/">
               <Header/>
               <Voting/>
              </Route>
            </Switch>
            {/* <Chart/> */}
      </Router>
    </div>
  );
}

export default App;

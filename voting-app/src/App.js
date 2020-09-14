import React from 'react';
import './App.css';
import Voting from './components/Voting';
import Dashboard from './components/Dashboard';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path ="/dashboard">
               <Dashboard/>
            </Route>
            <Route exact path="/voting">
               <Voting/>
            </Route>
            <Route exact path='/'>
               <Main/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Voting from './components/Voting';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
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

import React from 'react';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Signin from './pages/signin';
import Team from './pages/team';
import Projects from './pages/project';
import Profile from './pages/profile';
import History from './pages/history';
import Balances from './pages/balances';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>     
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/team" element = {<Team/>} /> 
        <Route path="/history" element = {<History/>} /> 
        <Route path="/balances" element = {<Balances/>} /> 
        <Route path="/project" element = {<Projects/>} />   
        <Route path="/profile" element = {<Profile/>} /> 
        <Route path="/settings/balances" element = {<Settings/>} /> 
        <Route path="/" element = {<Dashboard/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

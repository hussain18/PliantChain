import React from 'react';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import signin from './pages/signin';
import Team from './pages/team';
import Projects from './pages/project';
import Profile from './pages/profile';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>     
        <Route path="/signin" element = {<signin/>} />
        <Route path="/team" element = {<Team/>} /> 
        <Route path="/project" element = {<Projects/>} />   
        <Route path="/profile" element = {<Profile/>} /> 
        <Route path="/settings" element = {<Settings/>} /> 
        <Route path="/" element = {<Dashboard/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

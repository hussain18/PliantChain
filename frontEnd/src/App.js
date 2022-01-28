import React from 'react';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Signin from './pages/signin';
import Team from './pages/team';
import Projects from './pages/project';
import Profile from './pages/profile';
import History from './pages/history';
import Balances from './pages/balances';
import ProjectTeam from './pages/projectteam';
import SignUp from './pages/signup';
import LandingPage from './pages/landingPage';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>     
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/signup" element = {<SignUp/>} />
        <Route path="/team" element = {<Team/>} /> 
        <Route path="/history" element = {<History/>} /> 
        <Route path="/balances" element = {<Balances/>} /> 
        <Route path="/project" element = {<Projects/>} />   
        <Route path="/profile" element = {<Profile/>} /> 
        <Route path="/settings" element = {<Settings/>} /> 
        <Route path='/project/:projectName' element={<ProjectTeam />} />
        <Route path="/home" element = {<Dashboard/>} /> 
        <Route path="/" element = {<LandingPage/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

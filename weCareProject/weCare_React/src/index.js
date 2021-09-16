import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import CoachSignup from './CoachSignup';
import CoachLogin from './CoachLogin';
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';
import HomePage from './HomePage';
import UserHome from './UserHome';
import CoachHome from './CoachHome';
import CoachProfile from './CoachProfile';
import CoachSchedules from './CoachSchedules';
import UserViewProfile from './UserViewProfile';
import UserSchedules from './UserSchedules'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component = {HomePage}/>
      <Route exact path="/coachSignup" component={CoachSignup} />
      <Route exact path="/coachLogin" component={CoachLogin} />
      <Route exact path="/userSignup" component={UserSignup} />
      <Route exact path="/userLogin" component={UserLogin} />
      <Route exact path="/userhome" component={UserHome} />
      <Route exact path="/coachhome" component={CoachHome} />
      <Route exact path="/coachViewProfile" component={CoachProfile} />
      <Route exact path="/coachSchedules" component={CoachSchedules} />
      <Route exact path="/userViewProfile" component={UserViewProfile} />
      <Route exact path="/userAppointments" component={UserSchedules} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

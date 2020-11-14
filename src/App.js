import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './components/Home'
import Header from './components/header/Header'
import Feed from './components/Feed';
import Profile from './components/profile/Profile'
import MyProfile from './components/profile/MyProfile'
function App() {
  
  return (
    <div id='App'>
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/feed' component={Feed}/>
      <Route exact path='/profile/:id' component={Profile}/>
      <Route exact path='/myprofile' component={MyProfile}/>
      <div id='portal'></div>
    </div>
  );
}

const mapStateToProps = state => ({
  userData: state.userData
})

export default connect(mapStateToProps)(App);

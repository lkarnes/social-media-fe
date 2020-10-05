import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './components/Home'
import Header from './components/Header'
import Feed from './components/Feed';
import Profile from './components/Profile'
import MyProfile from './components/MyProfile'
function App() {
  return (
    <div id='App'>
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/feed' component={Feed}/>
      <Route exact path='/profile/:id' component={Profile}/>
      <Route exact path='/myprofile' component={MyProfile}/>
    </div>
  );
}

const mapStateToProps = state => ({
  userData: state.userData
})

export default connect(mapStateToProps)(App);

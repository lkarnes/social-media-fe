import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './components/Home'
import Header from './components/Header'
import Feed from './components/Feed';
import Profile from './components/Profile'
function App() {
  return (
    <div>
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/feed' component={Feed}/>
      <Route path='/profile/:id' component={Profile}/>
    </div>
  );
}

const mapStateToProps = state => ({
  userData: state.userData
})

export default connect(mapStateToProps)(App);

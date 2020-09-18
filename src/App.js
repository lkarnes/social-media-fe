import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header'
import Feed from './components/Feed';
function App() {
  return (
    <div>
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/feed' component={Feed}/>
    </div>
  );
}

export default App;

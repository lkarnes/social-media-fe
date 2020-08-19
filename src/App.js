import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header'
function App() {
  return (
    <div>
      <Header/>
      <Route path='/' component={Home}/>
    </div>
  );
}

export default App;

import React, { Component } from 'react';

import './App.css';

// import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppNavigationBar from './AppNavigationBar.js';
import Recommendation from './Recommendation.js';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
       <AppNavigationBar />    
       <Recommendation/> 
       </MuiThemeProvider>
  
    );
  }
}

export default App;

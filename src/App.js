import './App.css';
import React,{Component} from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/MainComponents';
function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react'
import './App.css'
import background from "./images/Space.png";
import SearchForm from './components/SearchForm';
import SpaceAppHeader from './components/SpaceAppHeader';

function App() {
  return (
    <div>
      <SpaceAppHeader/>
      <hr></hr>
      <SearchForm/>

    </div>

  );
}



export default App;

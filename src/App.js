import './App.css';
import {useEffect, useState} from 'react';

function Header(props) {

  return (
      <header className="App-header">
          <h2 onClick={e=>{
              props.onChange();
          }}>react {props.title}</h2>
      </header>
  );
}
export default App;

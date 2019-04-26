import React from "react";
import Snake from './Snake'
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Snake at home</h1>
        <Snake logo={logo} />
      </header>
    </div>
  );
}

export default App;

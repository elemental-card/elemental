import React, { Component } from 'react';
import Card from './Card';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Table">
        <Card element="earth" rank={14} />
        <Card element="water" rank={3} />
        <Card element="air" rank={2} />
        </div>

        <div className="Hand">
          <Card element="fire" rank={2} />
          <Card element="magic" rank={0} />
          <Card element="magic" rank={1} />
        </div>
      </div>
    );
  }
}

export default App;

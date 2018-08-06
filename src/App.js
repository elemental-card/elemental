import React, { Component } from 'react';
import PlayerLabel from './PlayerLabel';
import WinningPlayerIndicator from './WinningPlayerIndicator';
import Card from './Card';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Table">
          <div className="Table__NameList">
            <PlayerLabel><WinningPlayerIndicator />JCL</PlayerLabel>
            <PlayerLabel>MXW</PlayerLabel>
            <PlayerLabel>JXL</PlayerLabel>
            <PlayerLabel>KJL</PlayerLabel>
          </div>

          <div className="Table__CardList">
            <Card element="earth" rank={13} />
            <Card element="water" rank={3} />
            <Card element="air" rank={2} />
          </div>

          <div className="Table__TrickList">
            <PlayerLabel>0/2</PlayerLabel>
            <PlayerLabel>4/3</PlayerLabel>
            <PlayerLabel>1/3</PlayerLabel>
            <PlayerLabel>0/1</PlayerLabel>
          </div>
        </div>

        <div className="Hand">
          <div className="Hand__CardList">
            <Card element="fire" isTrump rank={2} />
            <Card element="magic" rank={0} />
            <Card element="magic" rank={1} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

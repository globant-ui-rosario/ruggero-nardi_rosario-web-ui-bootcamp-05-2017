import React, { Component } from 'react';
import MovieList from './components/MovieList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>My Movie List</h2>
        </div>
        <div className="app-content">
          <MovieList />
        </div>
        <div className="app-footer">
          
        </div>
      </div>
    );
  }
}

export default App;

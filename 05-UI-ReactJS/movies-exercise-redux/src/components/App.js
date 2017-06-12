import React, { Component } from 'react';
import MovieList from '../containers/movieList';
import MovieDetails from '../containers/movieDetails'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>My Movie List</h2>
          <MovieList />
          <MovieDetails />
        </div>
      </div>
    );
  }
}

export default App;

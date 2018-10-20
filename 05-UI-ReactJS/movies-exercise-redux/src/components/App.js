import React, { Component } from 'react';
import MovieList from '../containers/movieList';
import MovieDetails from '../containers/movieDetails';
import FavouriteMoviesList from '../containers/movieFavouriteList'
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h2>My Movie List</h2>
        </div>
        <div className="content">
          <MovieList  />
          <MovieDetails />
          <FavouriteMoviesList />
        </div>
      </div>
    );
  }
}

export default App;

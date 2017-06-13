import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMovie } from '../actions/selectMovie';
import { deleteMovie } from '../actions/deleteMovie';
import { addMovie } from '../actions/addMovie';
import { addToFavourite } from '../actions/addToFavourite';

class MovieList extends Component {

  addMovieToList() {
    let newMovie = {
      id: Math.random(),
      title: 'New Movie',
      genre: '',
      year: '',
      plot: '',
      editModeOn: true,
      favourite: false
    }
    this.props.addMovie(newMovie);
    this.props.selectMovie(newMovie);
  }

  deleteMovie(id) {
    this.props.deleteMovie(id);
  }

  addToFavouriteList(id) {
    this.props.addToFavourite(id);
  }

  createMovieList() {
    if (this.props.movies) {
      return this.props.movies.map((movie) => {
        return (
          <li key={movie.id}>
            <div onClick={() => this.props.selectMovie(movie)}>
              {movie.title}
            </div>
            <button onClick={() => this.deleteMovie(movie.id)}>X</button>
            <button onClick={() => this.addToFavouriteList(movie.id)}>ADD TO FAVOURITE</button>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div className="movie-list">
        <button onClick={() => this.addMovieToList()}>Add Movie</button>
        <ul>
          {this.createMovieList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps, { selectMovie, deleteMovie, addMovie, addToFavourite })(MovieList);

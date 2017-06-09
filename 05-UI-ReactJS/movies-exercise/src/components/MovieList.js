import React, { Component } from 'react';
import Movie from './MovieList/Movie'

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movieList: []
    };
  }
  addNewMovie() {
    let movieList = this.state.movieList;
    let newMovie = {
      title: "Title",
      genre: "Genre",
      year: "Year"
    };
    movieList.push(newMovie);
    this.setState({ movieList: movieList });
  }
  deleteMovie(index) {
    let movieList = this.state.movieList;
    movieList.splice(index, 1);
    this.setState({ movieList: movieList });
  }
  editMovie(title, genre, year, index) {
    console.log('updating text');
    let movieList = this.state.movieList;
    movieList[index] = {
      title: title,
      genre: genre,
      year: year
    };
    this.setState({ movieList: movieList });
  }

  prepareTag(movie, index) {
    return (<Movie key={index} index={index} title={movie.title} genre={movie.genre} year={movie.year} deleteMovie={this.deleteMovie.bind(this)} editMovie={this.editMovie.bind(this)} />);
  }
  render() {
    return (
      <div>
        <button onClick={this.addNewMovie.bind(this)}>ADD NEW MOVIE</button>
        {this.state.movieList.map(this.prepareTag.bind(this))}
      </div>
    );
  }
}
export default MovieList;
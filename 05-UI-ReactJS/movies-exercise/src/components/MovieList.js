import React, { Component } from 'react';
import Movie from './MovieList/Movie'
import './movieList.css'

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
      year: "Year",
      favourite: false
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
      year: year,
      favourite: false
    };
    this.setState({ movieList: movieList });
  }
  addToFavouriteList(index){
    let movieList = this.state.movieList;
    movieList[index].favourite = true;
    this.setState({movieList: movieList});
  }
  removeFromFavouriteList(index){
    let movieList = this.state.movieList;
    movieList[index].favourite = false;
    this.setState({movieList: movieList});
  }

  prepareMovieTag(movie, index) {
    return (<Movie className="movie" key={index} index={index} title={movie.title} genre={movie.genre} year={movie.year} deleteMovie={this.deleteMovie.bind(this)} editMovie={this.editMovie.bind(this)} addToFavouriteList={this.addToFavouriteList.bind(this)} />);
  }
  prepareFavouriteMovieTag(movie, index) {
    if(movie.favourite) {
    return (
      <div key={index} className="favourite-list-item">
        {movie.title}
        <button className="button-remove" onClick={ ()=>{this.removeFromFavouriteList(index)}}>X</button>
      </div>
    );
    }
  }

  render() {
    return (
      <div>
        <div className="list-container">
          <button className="button-add button" onClick={this.addNewMovie.bind(this)}>ADD NEW MOVIE</button>
          {this.state.movieList.map(this.prepareMovieTag.bind(this))}
        </div>
        <div className="favourite-container">
          <h2>Favourites</h2>
          <div className="favourite-movie">
            {this.state.movieList.map(this.prepareFavouriteMovieTag.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}
export default MovieList;
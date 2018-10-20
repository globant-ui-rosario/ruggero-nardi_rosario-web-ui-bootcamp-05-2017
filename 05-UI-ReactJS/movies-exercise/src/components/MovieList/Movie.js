import React, { Component } from 'react';
import './movie.css'

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
    };
  }
  editMovieData() {
    this.setState({ editMode: true });
  }


  deleteMovie() {
      this.props.deleteMovie(this.props.index);
  }

  saveEdit() {
    let title = this.refs.titleInput.value;
    let genre = this.refs.genreInput.value;
    let year = this.refs.yearInput.value;
    this.props.editMovie(title, genre, year, this.props.index);
    this.setState({ editMode: false });
  }
  addToFavourite() {
    this.props.addToFavouriteList(this.props.index);
  }


  render() {

    if (this.state.editMode) {
      return (
        <div className="movie-edit-container">
          <div className="movie">
            <input placeholder="Title..." className="input" ref="titleInput" defaultValue={this.props.title} ></input>
            <select className="input" ref="genreInput" defaultValue={this.props.genre}>
              <option label="Select Genre" hidden></option>
              <option value="Action">Action</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Documentary">Documentary</option>
            </select>
            <input placeholder="Year..." className="input" ref="yearInput" defaultValue={this.props.year}></input>
          </div>
          <button className="button-edit" type="input" onClick={this.saveEdit.bind(this)}>SAVE</button>
        </div>
      );
    } else {
      return (
        <div className="movie-container">
          <div className="movie">
            <span>"{this.props.title}" - </span>
            <span>{this.props.genre} - </span>
            <span>{this.props.year}</span>
          </div>
          <button className="button-delete" onClick={this.deleteMovie.bind(this)}>DELETE</button>
          <button className="button-edit" onClick={this.editMovieData.bind(this)}>EDIT</button>
          <button className="button-edit" onClick={this.addToFavourite.bind(this)}>FAV</button>
        </div>
      );
    }

  }
}

export default Movie;
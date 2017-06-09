import React, { Component } from 'react';

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
    };
  }
  editMovieData() {
    console.log('in editMovie');
    this.setState({ editMode: true });
  }


  deleteMovie() {
    console.log('in deleteMovie' + this.props.index);
    this.props.deleteMovie(this.props.index);
  }

  saveEdit() {
    let title = this.refs.titleInput.value;
    let genre = this.refs.genreInput.value;
    let year = this.refs.yearInput.value;
    this.props.editMovie(title, genre, year, this.props.index);
    this.setState({ editMode: false });
  }


  render() {

    if (this.state.editMode) {
      return (
        <div className="movie-container">
          Title:<input ref="titleInput" defaultValue={this.props.title}></input>
          Genre:
          <select ref="genreInput" defaultValue={this.props.genre}>
            <option value="Action">Action</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Documentary">Documentary</option>
          </select>
          Year:<input ref="yearInput" defaultValue={this.props.year}></input>
          <button className="button-add" type="input" onClick={this.saveEdit.bind(this)}>SAVE</button>
        </div>
      );
    } else {
      return (
        <div className="movie-container">
          <span>{this.props.title} - </span>
          <span>{this.props.genre} - </span>
          <span>{this.props.year}.</span>
          <button className="button-edit" onClick={this.editMovieData.bind(this)}>EDIT</button>
          <button className="button-delete" onClick={this.deleteMovie.bind(this)}>DELETE</button>
        </div>
      );
    }

  }
}

export default Movie;
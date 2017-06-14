import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editMovie } from '../actions/editMovie';


class MovieDetail extends Component {
  constructor() {
    super();
    this.state = {
      editModeOn: false
    };
  }

  editModeToggle() {
    let editModeOn = this.state.editModeOn;
    editModeOn = !editModeOn;
    this.setState({ editModeOn });
  }
  saveMovieInfo(movie) {
    this.props.editMovie(movie);
    this.editModeToggle();
  }

  render() {
    let returnValue;
    if (!this.props.movie) {
      returnValue = (<div className="movie-details-container start" >Select Movie</div>);
    } else {
      if (this.state.editModeOn) {
        let editedMovie = {
          id: this.props.movie.id,
          title: this.props.movie.title,
          genre: this.props.movie.genre,
          year: this.props.movie.year,
          plot: this.props.movie.plot
        }
        returnValue = (
          <div className="movie-details-container" >
            <div className="movie-details">
              <form className="form"
                onSubmit={event => {
                  event.preventDefault();
                  this.saveMovieInfo(editedMovie);
                }}>
                Title<input className="input-text" type="text" defaultValue={this.props.movie.title} onChange={event => editedMovie.title = event.target.value} name="title" />
                Genre<input className="input-text" type="text" defaultValue={this.props.movie.genre} onChange={event => editedMovie.genre = event.target.value} name="genre" />
                Year<input className="input-text" type="text" defaultValue={this.props.movie.year} onChange={event => editedMovie.year = event.target.value} name="year" />
                Plot<textarea className="input-textarea" defaultValue={this.props.movie.plot} onChange={event => editedMovie.plot = event.target.value} name="plot" />
                <button type='submit'>SAVE</button>
                <button onClick={() => this.editModeToggle()}>CANCEL</button>
              </form>
            </div>
          </div>
        );
      } else {
        returnValue = (
          <div className="movie-details-container" >
            <div className="movie-details">
              <h2>"{this.props.movie.title}"</h2>
              <h3>Genre: {this.props.movie.genre}</h3>
              <h3>Age: {this.props.movie.year}</h3>
              <p>{this.props.movie.plot}</p>
              <button onClick={() => this.editModeToggle()}>EDIT</button>
            </div>
          </div>
        );
      }
    }
    return returnValue;
  }
}


function mapStateToProps(state) {
  return {
    movie: state.selectedMovie,
  }
}

export default connect(mapStateToProps, { editMovie })(MovieDetail);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectMovie } from '../actions/selectMovie';

class MovieList extends Component {

  createMovieList() {
    return this.props.movies.map((movie) => {
      return (
        <li onClick={() => this.props.selectMovie(movie)} key={movie.id}>{movie.title}</li>
      );
    });
  }

  render() {
    return (
      <ul>
        {this.createMovieList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectMovie: selectMovie }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MovieList);

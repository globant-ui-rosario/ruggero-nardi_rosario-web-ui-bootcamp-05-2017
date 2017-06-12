import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetail extends Component {
  render() {
    let returnValue;
    if (!this.props.movie) {
      returnValue = (<h4>Select Movie</h4>);
    } else {
      returnValue = (
        <div>
          <h2>{this.props.movie.title}</h2>
          <h3>Genre: {this.props.movie.genre}</h3>
          <h3>Age: {this.props.movie.year}</h3>
          <h4>{this.props.movie.plot}</h4>
        </div>
      );
    }
    return returnValue;
  }
}

function mapStateToProps(state) {
  return {
    movie: state.selectedMovie
  }
}

export default connect(mapStateToProps)(MovieDetail);

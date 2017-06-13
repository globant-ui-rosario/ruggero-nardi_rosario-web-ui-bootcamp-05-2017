import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromFavourites } from '../actions/removeFromFavourites';

class FavouriteMoviesList extends Component {

  removeFromFavouritesList(id) {
    this.props.removeFromFavourites(id);
  }

  createFavouriteList() {
    return this.props.movies.map(
      (movie) => {
        let listItem = null;
        if (movie.favourite) {
          listItem = (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <button onClick={() => this.removeFromFavouritesList(movie.id)}>Remove From Favourites</button>
            </li>
          );
        }
        return listItem;
      }
    )
  }

  render() {
    return (
      <div>
        <ul>
          {this.createFavouriteList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  }
}

export default connect(mapStateToProps, { removeFromFavourites })(FavouriteMoviesList);
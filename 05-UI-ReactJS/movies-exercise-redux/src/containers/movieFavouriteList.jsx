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
            <li className="favourite-list-item" key={movie.id}>
              <span className="favourite-list-item-title">{movie.title}</span>
              <button className="favourite-list-item-button" onClick={() => this.removeFromFavouritesList(movie.id)}>Remove From Favourites</button>
            </li>
          );
        }
        return listItem;
      }
    )
  }

  render() {
    return (
      <div className="favourite-list-container">
        <h3 className="favourite-list-title">Favourite Movies</h3>
        <ul className="favourite-list">
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
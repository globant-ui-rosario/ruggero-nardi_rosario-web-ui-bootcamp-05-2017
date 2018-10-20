import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import selectedMovieReducer from './selectedMovieReducer'

const allReducers = combineReducers({
  movies: moviesReducer,
  selectedMovie: selectedMovieReducer
});

export default allReducers;

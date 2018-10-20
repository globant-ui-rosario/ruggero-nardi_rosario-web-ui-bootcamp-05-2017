import _ from 'lodash';

export default function (state = null, action) {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case 'MOVIE_SELECTED':
      console.log(newState);
      newState = action.movie;
      break;
    case 'DELETE_MOVIE':
      newState = null;
      break;
    case 'ADD_MOVIE':
      newState = action.movie;
      break;
    case 'EDIT_MOVIE':
      newState.title = action.movie.title;
      newState.genre = action.movie.genre;
      newState.year = action.movie.year;
      newState.plot = action.movie.plot;
      break
    default:
      break;
  }
  return newState;
}

export default function (state = null, action) {
  switch (action.type) {
    case 'MOVIE_SELECTED':
      state = action.movie;
      break;
    case 'DELETE_MOVIE':
      state = null;
      break;
    case 'ADD_MOVIE':
      state = action.movie;
      break;
    case 'EDIT_MOVIE':
      let movie = state;
      movie.title = action.movie.title;
      movie.genre = action.movie.genre;
      movie.year = action.movie.year;
      movie.plot = action.movie.plot;
      state = movie;
      break
    default:
      break;
  }
  return state;
}

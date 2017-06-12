export const selectMovie = (movie) => {
  console.log('Selected Movie: ' + movie.title);
  return {
    type: 'MOVIE_SELECTED',
    payload: movie
  }
};

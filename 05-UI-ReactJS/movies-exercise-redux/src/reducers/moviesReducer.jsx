import _ from 'lodash';

const initialMovies = [{
  id: Math.random(),
  title: 'Terminator',
  genre: 'Action',
  year: '1984',
  plot: 'A cyborg is sent from the future on a deadly mission. He has to kill Sarah Connor, a young woman whose life will have a great significance in years to come. Sarah has only one protector - Kyle Reese - also sent from the future. The Terminator uses his exceptional intelligence and strength to find Sarah, but is there any way to stop the seemingly indestructible cyborg ?',
  editModeOn: false,
  favourite: false
},
{
  id: Math.random(),
  title: 'Terminator 2',
  genre: 'Action',
  year: '1991',
  plot: 'Over 10 years have passed since the first cyborg called The Terminator tried to kill Sarah Connor and her unborn son, John Connor. John Connor, the future leader of the human resistance, is now a healthy young boy. However another Terminator is sent back through time called the T-1000, which is more advanced and more powerful than its predecessor. The Mission: to kill John Connor when he\'s still a child. However, Sarah and John do not have to face this threat of a Terminator alone. Another Terminator is also sent back through time. The mission: to protect John and Sarah Connor at all costs. The battle for tomorrow has begun...',
  editModeOn: false,
  favourite: false
}];

export const moviesReducer = (state = initialMovies, action) => {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case 'ADD_MOVIE':
      newState = [...newState, action.movie];
      break;
    case 'DELETE_MOVIE':
      newState = newState.filter(movie => movie.id !== action.id);
      break;
    case 'ADD_TO_FAVOURITES':
      newState[newState.findIndex(movie => movie.id === action.id)].favourite = true;
      break;
    case 'REMOVE_FROM_FAVOURITES':
      newState[newState.findIndex(movie => movie.id === action.id)].favourite = false;
      break;
    case 'EDIT_MOVIE':
      const index = newState.findIndex(movie => movie.id === action.movie.id);
      newState[index].title = action.movie.title;
      newState[index].genre = action.movie.genre;
      newState[index].year = action.movie.year;
      newState[index].plot = action.movie.plot;
      break
    default:
      break;
  }
  return newState;
}

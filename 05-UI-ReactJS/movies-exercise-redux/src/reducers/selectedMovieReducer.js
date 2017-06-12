export default function (state = null, action) {
  console.log(action);
  let returnValue;
  switch(action.type) {
    case 'MOVIE_SELECTED':
       returnValue = action.payload;
       break;
    default: returnValue = state;
  }
  return returnValue;
}

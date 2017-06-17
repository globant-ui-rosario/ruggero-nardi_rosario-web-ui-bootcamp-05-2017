
export const regionReducer = (state, action) => {
  let newState = null;
  switch (action.type) {
    case 'REGION_SELECTED':
      newState = action.region;
      break;
    case 'SET_REALMS':
      console.log('in set realms');
      break;
    default:
      break;
  }
  return newState;
};
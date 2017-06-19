import _ from 'lodash';

export const regionReducer = (state = null, action) => {
  let newState = null;
  if (state) { newState = _.cloneDeep(state); }
  switch (action.type) {
    case 'REGION_SELECTED':
      newState = _.cloneDeep(action.region);
      break;
    case 'SET_REALMS':
      newState = { ...newState, realms: action.realms };
      break;
    default:
      break;
  };
  return newState;
};
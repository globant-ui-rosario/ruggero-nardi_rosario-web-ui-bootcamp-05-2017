import _ from 'lodash';

export const realmReducer = (state = null, action) => {
  let newState = null;
  if (state) {newState=_.cloneDeep(state)}
  switch (action.type) {
    case 'SELECTED_REALM':
      newState = _.cloneDeep(action.realm);
      break;
    default:
      break;
  }
  return newState;
};
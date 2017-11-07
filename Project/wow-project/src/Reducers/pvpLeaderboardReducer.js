import _ from 'lodash';

export const pvpLeaderboardReducer = (state = null, action) => {
  let newState = null;
  if (state) {newState=_.cloneDeep(state)}
  switch (action.type) {
    case 'SHOW_LEADERBOARD':
      newState = {...newState, name: action.leaderboardName};
      break;
    case 'SET_PVP_LEADERBOARD':
      newState = {...newState, pvpList: action.leaderboard};
      break;
    default:
      break;
  }
  return newState;
};
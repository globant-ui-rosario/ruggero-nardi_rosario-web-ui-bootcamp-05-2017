import _ from 'lodash';

export const challengeLeaderboardReducer = (state = null, action) => {
  let newState = null;
  if (state) { newState = _.cloneDeep(state) }
  switch (action.type) {
    case 'SET_CHALLENGE_LEADERBOARD':
      newState = action.challengeLeaderboard;
      break;
    default:
      break;
  }
  return newState;
};
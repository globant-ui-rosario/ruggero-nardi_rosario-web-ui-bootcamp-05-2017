export const selectedChallenge = (state = null, action) => {
  switch (action.type) {
    case 'SET_CHALLENGE':
      return action.challenge;
    default:
      return state;
  }
};
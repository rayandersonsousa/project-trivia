export const RESET_SCORE = 'RESET_SCORE';

const resetScore = (payload) => ({
  type: RESET_SCORE,
  payload,
});

export default resetScore;

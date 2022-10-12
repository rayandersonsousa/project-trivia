export const DISABLE_BTN = 'DISABLE_BTN';
export const RESET_TIMER = 'RESET_TIMER';
export const REMAINING_TIMER = 'REMAINING_TIMER';

export const disableBtn = (payload) => ({
  type: DISABLE_BTN,
  payload,
});

export const resetTimer = (payload) => ({
  type: RESET_TIMER,
  payload,
});

export const getRemaining = (payload) => ({
  type: REMAINING_TIMER,
  payload,
});

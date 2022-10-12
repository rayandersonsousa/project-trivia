import { DISABLE_BTN, RESET_TIMER, REMAINING_TIMER } from '../actions/actionTime';

const INITIAL_STATE = {
  btnDisabled: false,
  resetTimer: false,
  remainingTimer: 0,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_BTN:
    return {
      ...state,
      btnDisabled: action.payload,
    };
  case RESET_TIMER:
    return {
      ...state,
      resetTimer: action.payload,
    };
  case REMAINING_TIMER:
    return {
      ...state,
      remainingTimer: action.payload,
    };
  default:
    return state;
  }
};

export default timer;

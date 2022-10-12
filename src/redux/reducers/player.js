import { TYPE_EMAIL_USER } from '../actions/action';
import { SET_SCORE } from '../actions/actionScore';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_EMAIL_USER:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.user,
    };
  case SET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;

import { TYPE_EMAIL_USER } from '../actions/action';

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
  default:
    return state;
  }
};

export default player;

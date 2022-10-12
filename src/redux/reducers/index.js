import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';

const rootReducer = combineReducers({ player, timer });

export default rootReducer;

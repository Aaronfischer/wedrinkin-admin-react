import { combineReducers } from 'redux';
import user from './reducers/user';
import drinks from './reducers/drinks';

export default combineReducers({
  user,
  drinks
});

import { combineReducers } from 'redux';
import { needle, searchResults } from './reducers';

export default combineReducers({
  needle,
  searchResults,
});

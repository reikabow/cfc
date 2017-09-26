import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  EDIT_SEARCH,
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_REQUEST,
} from './actions';

export function needle(state = '', action) {
  switch (action.type) {
    case EDIT_SEARCH:
      return action.needle;
    default:
      return state;
  }
}

export function searchResults(
  state = {
    isFetching: false,
    rows: [],
  },
  action,
) {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_SEARCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, rows: action.rows });
    case FETCH_SEARCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, rows: [] });
    default:
      return state;
  }
}

export default combineReducers({
  needle,
  searchResults,
});

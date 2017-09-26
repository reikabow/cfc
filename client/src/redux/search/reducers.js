import { combineReducers } from 'redux';

import {
  EDIT_SEARCH,
  FETCH_SEARCH,
  RECEIVE_SEARCH,
  SEARCH_FAILED,
} from './actions';

export function needle(state = '', action) {
  switch (action.type) {
    case EDIT_SEARCH:
      return action.needle;
    default:
      return state;
  }
}

export function results(
  state = {
    isFetching: false,
    results: [],
  },
  action,
) {
  switch (action.type) {
    case FETCH_SEARCH:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_SEARCH:
      return Object.assign({}, state, { isFetching: false, results: action.results });
    case SEARCH_FAILED:
      return Object.assign({}, state, { isFetching: false, results: [] });
    default:
      return state;
  }
}

export default combineReducers({
  needle,
  results,
});

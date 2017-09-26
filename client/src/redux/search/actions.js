import fetch from 'isomorphic-fetch';

export const EDIT_SEARCH = 'EDIT_SEARCH';
export function editSearch(needle) {
  return {
    type: EDIT_SEARCH,
    needle,
  };
}

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export function requestSearch(needle) {
  return {
    type: REQUEST_SEARCH,
    needle,
  };
}

export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export function receiveSearch(results) {
  return {
    type: RECEIVE_SEARCH,
    results,
  };
}

export const SEARCH_FAILED = 'SEARCH_FAILED';
export function searchFailed(error) {
  return {
    type: SEARCH_FAILED,
    error,
  };
}

export const FETCH_SEARCH = 'FETCH_SEARCH';
export function fetchSearch({ needle, searchType }) {
  return function searchThunk(dispatch) {
    dispatch(requestSearch(needle));
    return fetch(`http://localhost:3001/api/search/${searchType}?q=${needle}`)
      .then(
        response => response.json(),
        error => console.log(error),
      )
      .then(json => dispatch(receiveSearch(json)));
  }
}

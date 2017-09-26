import fetch from 'isomorphic-fetch';

export const EDIT_SEARCH = 'EDIT_SEARCH';
export function editSearch(needle) {
  return {
    type: EDIT_SEARCH,
    needle,
  };
}

export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST';
export function fetchSearchRequest(needle) {
  return {
    type: FETCH_SEARCH_REQUEST,
    needle,
  };
}

export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export function fetchSearchSuccess(rows) {
  return {
    type: FETCH_SEARCH_SUCCESS,
    rows,
  };
}

export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE';
export function fetchSearchFailure() {
  return {
    type: FETCH_SEARCH_FAILURE,
  };
}

export const FETCH_SEARCH = 'FETCH_SEARCH';
export function fetchSearch({ needle, searchType }) {
  return function searchThunk(dispatch) {
    dispatch(fetchSearchRequest(needle));
    return fetch(`http://localhost:3001/api/search/${searchType}?q=${needle}`)
      .then(
        response => response.json(),
        error => dispatch(fetchSearchFailure()),
      )
      .then(
        json => dispatch(fetchSearchSuccess(json)),
        error => dispatch(fetchSearchFailure()),
      );
  };
}

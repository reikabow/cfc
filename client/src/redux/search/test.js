import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import searchReducer from './reducers';

import * as actions from './actions';
import * as reducers from './reducers';

const mockStore = configureMockStore([thunk]);

describe('editSearch', () => {
  it('should create an EDIT_SEARCH action', () => {
    const needle = 'needle';
    const expected = {
      type: actions.EDIT_SEARCH,
      needle,
    };
    expect(actions.editSearch(needle)).toEqual(expected);
  });
});

describe('fetchRequest', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create a FETCH_SEARCH_REQUEST action and then a FETCH_SEARCH_SUCCESS action on success', () => {
    nock('http://localhost:3001/')
      .get('/api/search/pinyin?q=hao3')
      .reply(200, ['row1', 'row2', 'row3']);
    const expectedActions = [
      { type: actions.FETCH_SEARCH_REQUEST, needle: 'hao3' },
      { type: actions.FETCH_SEARCH_SUCCESS, rows: ['row1', 'row2', 'row3'] },
    ];
    const store = mockStore({ needle: 'hao3', results: [] });
    return store.dispatch(actions.fetchSearch({ needle: 'hao3', searchType: 'pinyin' })).then(() =>
      expect(store.getActions()).toEqual(expectedActions),
    );
  });

  it('should create a FETCH_SEARCH_REQUEST action and then a FETCH_SEARCH_FAILED action on failure', () => {
    nock('http://localhost:3001')
      .get('/api/search/pinyin?q=hao3')
      .reply(500);
    const expectedActions = [
      { type: actions.FETCH_SEARCH_REQUEST, needle: 'hao3' },
      { type: actions.FETCH_SEARCH_FAILURE },
    ];
    const store = mockStore({ results: [] });
    return store.dispatch(actions.fetchSearch({ needle: 'hao3', searchType: 'pinyin' })).then(() =>
      expect(store.getActions()).toEqual(expectedActions),
    );
  });
});

describe('needle reducer', () => {
  it('should update needle on EDIT_SEARCH', () => {
    expect(reducers.needle(undefined, {
      type: actions.EDIT_SEARCH,
      needle: 'whatever',
    })).toEqual('whatever');
  });
});

describe('searchResults reducer', () => {
  it('should not modify rows and set isFetching on FETCH_SEARCH_REQUEST', () => {
    expect(reducers.searchResults({
      isFetching: false,
      rows: [1, 2, 3, 4],
    }, {
      type: actions.FETCH_SEARCH_REQUEST,
      needle: 'in a haystack',
    }));
  });

  it('should populate rows on FETCH_SEARCH_SUCCESS', () => {
    expect(reducers.searchResults(undefined, {
      type: actions.FETCH_SEARCH_SUCCESS,
      rows: [1, 2, 3, 4],
    })).toEqual({
      isFetching: false,
      rows: [1, 2, 3, 4],
    });
  });

  it('should empty rows on FETCH_SEARCH_FAILURE', () => {
    expect(reducers.searchResults(undefined, {
      type: actions.FETCH_SEARCH_FAILURE,
    })).toEqual({
      isFetching: false,
      rows: [],
    });
  });
});

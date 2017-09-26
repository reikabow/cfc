import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from './actions';
import * as reducers from './reducers';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  it('should create an action to edit the search', () => {
    const needle = 'needle';
    const expected = {
      type: actions.EDIT_SEARCH,
      needle,
    };
    expect(actions.editSearch(needle)).toEqual(expected);
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_SEARCH when fetching search is successful', () => {
    nock('http://localhost:3001/')
      .get('/api/search/pinyin?q=hao3')
      .reply(200, ['row1', 'row2', 'row3']);
    const expectedActions = [
      { type: actions.REQUEST_SEARCH, needle: 'hao3' },
      { type: actions.RECEIVE_SEARCH, results: ['row1', 'row2', 'row3'] },
    ];
    const store = mockStore({ needle: 'hao3', results: [] });
    return store.dispatch(actions.fetchSearch({ needle: 'hao3', searchType: 'pinyin' })).then(() =>
      expect(store.getActions()).toEqual(expectedActions),
    );
  });
});

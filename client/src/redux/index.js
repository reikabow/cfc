import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import searchReducer from './search/reducers';

const loggerMiddleware = createLogger();

export default createStore(
  searchReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

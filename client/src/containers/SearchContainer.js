import { connect } from 'react-redux';
import Search from '../components/Search';

import {
  editSearch,
  fetchSearch,
} from '../redux/search/actions';

const mapStateToProps = (state) => {
  return {
    rows: state.searchResults.rows,
    needle: state.needle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNeedleChange: (needle) => {
      dispatch(editSearch(needle));
    },
    onSearch: (needle) => {
      dispatch(fetchSearch({ needle, searchType: 'pinyin' }));
    },
  };
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

export default SearchContainer;

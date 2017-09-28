import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

import TermList from './TermList';

const Search = (props) => {
  return (
    <div>
      <Input
        placeholder="Search..."
        value={props.needle}
        onChange={({ target }) => props.onNeedleChange(target.value)}
      />
      <Button onClick={() => props.onSearch(props.needle)}>
        Search
      </Button>
      <TermList terms={props.rows} />
    </div>
  );
};

Search.propTypes = {
  needle: PropTypes.string,
  onNeedleChange: PropTypes.func,
  onSearch: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default Search;

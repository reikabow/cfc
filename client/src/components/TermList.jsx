import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import Term from './Term';

const TermList = (props) => {
  return (
    <div>
      {map(props.terms, term => <Term key={term.id} term={term} />)}
    </div>
  );
};

TermList.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.object),
};

export default TermList;

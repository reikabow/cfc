import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const Term = (props) => {
  const {
    id,
    simplified,
    traditional,
    pinyin,
    definition,
  } = props.term;
  return (
    <Card>
      <Card.Content header={`${simplified} [${pinyin}]`} />
      <Card.Content description={definition} />
    </Card>
  );
};

Term.propTypes = {
  term: PropTypes.shape({
    simplified: PropTypes.string,
    traditional: PropTypes.string,
    pinyin: PropTypes.string,
    definition: PropTypes.string,
  }),
};

export default Term;

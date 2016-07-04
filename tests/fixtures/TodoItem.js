import React from 'react';

import esi from '../../src';

function TodoItem({ item }) {
  return <div>{item}</div>;
}
TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = {
  item: React.PropTypes.string.isRequired,
};

export default esi('TodoItem')(TodoItem);

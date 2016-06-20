import React from 'react';

function TodoItem({ item }) {
  return <div>{item}</div>;
}
TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = {
  item: React.PropTypes.string.isRequired,
};

export default TodoItem;

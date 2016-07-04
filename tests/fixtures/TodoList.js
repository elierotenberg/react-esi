import React from 'react';

import esi from '../../src';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
  };
  render() {
    return <ul>{this.props.items.map((item, key) =>
      <li key={key}><TodoItem item={item} /></li>
    )}</ul>;
  }
}

export default esi('TodoList')(TodoList);

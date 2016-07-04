import React from 'react';

import TodoList from './TodoList';

class App extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
  };
  render() {
    return <TodoList items={this.props.items} />;
  }
}

export default App;

import React from 'react';
import { renderEsiToString } from './';

export default function serveEsi(Component) {
  return function* serveComponentEsi(next) {
    const props = Object.assign({}, this.query);
    this.response.type = 'html';
    this.response.body = renderEsiToString(React.createElement(Component, props));
    yield next;
  };
}

import React from 'react';
import { renderEsiToString } from './';

export default function serveEsi(Component) {
  return function serveComponentEsi(req, res, next) {
    const props = Object.assign({}, req.query);
    res.send(renderEsiToString(React.createElement(Component, props)));
    next();
  };
}

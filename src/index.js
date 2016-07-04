import 'babel-polyfill';

import url from 'url';
import React from 'react';

// Symbols dont work well as React props keys, so we use a randomized string instead
const $shouldRenderEsi = `$__shouldRenderEsi#${Math.random()}`;

// All calls to esi() will apply this function to their parameter list.
// By default, it only returns the first parameter and ignore everything else.
// This behaviour is configurable using the map function.
let transform = (...args) => args[0];

function map(_transform) {
  transform = _transform;
  return transform;
}

function forceEsiRendering(element) {
  return React.cloneElement(element, { [$shouldRenderEsi]: true });
}

function renderEsiToString(ReactDOMServer, element) {
  return ReactDOMServer.renderToString(forceEsiRendering(element));
}

function renderEsiToStaticMarkup(ReactDOMServer, element) {
  return ReactDOMServer.renderToStaticMarkup(forceEsiRendering(element));
}

function esi(...args) {
  return (Component) => {
    if(typeof window === 'object') {
      return Component;
    }
    function EsiComponent({ [$shouldRenderEsi]: shouldRenderEsi, ...otherProps }) {
      if(shouldRenderEsi) {
        return <Component {...otherProps} />;
      }
      const urlObj = Object.assign({}, url.parse(transform(...args), true), { query: {} });
      Object.assign(urlObj.query, otherProps);
      return React.createElement('esi:include', { src: url.format(urlObj) });
    }
    EsiComponent.displayName = Component.displayName ? `@esi(${Component.displayName})` : '@esi';
    EsiComponent.propTypes = {
      [$shouldRenderEsi]: React.PropTypes.bool,
    };

    EsiComponent.connect = EsiComponent.express = function connect(req, res, next) {
      const props = Object.assign({}, req.query);
      res.send(renderEsiToString(React.createElement(Component, props)));
      next();
    };

    EsiComponent.koa = function* koa(next) {
      const props = Object.assign({}, this.query);
      this.response.type = 'html';
      this.response.body = renderEsiToString(React.createElement(Component, props));
      yield next;
    };

    return EsiComponent;
  };
}

esi.map = map;

export {
  map,
  renderEsiToString,
  renderEsiToStaticMarkup,
  esi,
};

export default esi;

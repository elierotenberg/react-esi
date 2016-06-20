import url from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export express from './express';
export koa from './koa';

// Symbols dont work well as React props keys, so we use a randomized string instead
const $shouldRenderEsi = `$__shouldRenderEsi$${Math.random()}`;

let transform = (href) => href;

function forceEsiRendering(element) {
  return React.cloneElement(element, { [$shouldRenderEsi]: true });
}

export function renderEsiToString(element) {
  return ReactDOMServer.renderToString(forceEsiRendering(element));
}

export function renderEsiToStaticMarkup(element) {
  return ReactDOMServer.renderEsiToStaticMarkup(forceEsiRendering(element));
}

export default function esi(href) {
  return (Component) => {
    if(typeof window === 'object') {
      return Component;
    }
    function EsiComponent({ [$shouldRenderEsi]: shouldRenderEsi, ...otherProps }) {
      if(shouldRenderEsi) {
        return <Component {...otherProps} />;
      }
      const urlObj = Object.assign({}, url.parse(transform(href)));
      Object.assign(urlObj.query, otherProps);
      return React.createElement('esi:include', { src: url.format(urlObj) });
    }
    EsiComponent.displayName = Component.displayName ? `@esi(${Component.displayName})` : '@esi';
    return EsiComponent;
  };
}

export function map(_transform) {
  transform = _transform;
  return transform;
}

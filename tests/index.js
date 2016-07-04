const { describe, it } = global;
import { expect } from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { default as esi, renderEsiToStaticMarkup } from '../src';

import TodoItem from './fixtures/TodoItem';

esi.map((componentName) => `http://localhost:8888/${componentName}`);

/* eslint-disable no-magic-numbers */

describe('esi', () => {
  describe('#renderEsiToStaticMarkup', () => {
    it('force-renders TodoItem normally', () =>
      expect(
        renderEsiToStaticMarkup(ReactDOMServer, <TodoItem item={'foo'} />)
      )
      .to.be.equal(
        '<div>foo</div>'
      )
    );
    it('renders TodoItem as an ESI', () =>
      expect(
        ReactDOMServer.renderToStaticMarkup(<TodoItem item={'foo'} />)
      )
      .to.be.equal(
        '<esi:include src="http://localhost:8888/TodoItem?item=foo"></esi:include>'
      )
    );
  });
});

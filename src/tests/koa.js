import 'babel-polyfill';

import url from 'url';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import koa from 'koa';
import createRouter from 'koa-router';
import c2k from 'koa-connect';
import connectEsi from 'esi';
import mocha from 'mocha';
import fetch from 'node-fetch';
const { describe, it, before, after } = mocha;

import serveEsi from '../koa';

import App from './components/App';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';

const TEST_PORT = 8888;

const items = [
  'Shop groceries',
  'Make sandwich',
  'Eat sandwich',
  'Rinse',
  'Repeat',
];

function localhost(pathname, query) {
  return url.format({
    protocol: 'http:',
    hostname: 'localhost',
    port: TEST_PORT,
    pathname,
    query,
  });
}

const app = koa();
const router = createRouter()
  .get('/', function* main(next) {
    this.body = ReactDOMServer.renderToString(<App items={items} />);
    yield next;
  })
  .get('/esi/TodoList', serveEsi(TodoList))
  .get('/esi/TodoItem', serveEsi(TodoItem))
  .use(c2k(connectEsi));

app.use(router.routes());
app.use(router.allowedMethods());

describe('koa', () => {
  let server = null;
  before(() => {
    server = app.listen(TEST_PORT);
  });
  after(() => server.close());
  it('should render TodoItem', () =>
    fetch(localhost('/esi/TodoItem'))
      .then((response) => response.text())
      .then((body) => console.warn({ body }))
  );
});

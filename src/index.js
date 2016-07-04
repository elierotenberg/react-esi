import 'babel-polyfill';
import Promise from 'bluebird';
global.Promise = Promise;

export function sum(...args) {
  return args.reduce((acc, x) => acc + x, 0);
}

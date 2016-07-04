# lib-starterkit

This base repository can be forked to develop a javascript library.

### Contents

#### Directory structure

- `gulpfile.babel.js`: gulp tasks definition
- `.babelrc`, `.editorconfig`, `.eslintignore`, `.eslintrc`, `.gitignore`, `.npmignore`: dotfiles configuration
- `src`: library source files
  * `src/index.js`: library entry points
- `tests`: test files
- `dist`: compiled files, should only be populated by `gulp tasks`

##### `gulp` tasks

- `lint`: linting using `eslint` (based on `.eslintrc`)
- `test`: testing using `mocha`
- `compile`: compiling using `babel`
- `default`: lint, test and compile

##### Transpilation

Transpilation with `babel` using the `es2015` and `stage-2` presets.

##### Included libraries

For convenience, `babel-polyfill` and `bluebird` are automatically included.

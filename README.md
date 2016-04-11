# metarpheus-tcomb
generate a [tcomb](https://github.com/gcanti/tcomb) domain model interpreting [metarpheus](https://github.com/buildo/metarpheus) output

## running

```sh
git clone git@github.com:buildo/metarpheus-tcomb.git
node metarpheus-tcomb --config=path/to/config/file`
```

## configuration

An example config file is in [config.js](https://github.com/buildo/metarpheus-tcomb/blob/master/test/fixtures/config.js)

By default, the model is generated into `./model.js`

```js
export default {
  intermRepIn: 'test/fixtures/metarpheus-interm-rep.json',
  modelPrelude: `import t from 'tcomb';
`,
  apiPrelude: `import t from 'tcomb';
import * as m from './model';
`,
  apiModelPrefix: 'm.',
  modelOut: 'model.js',
  apiOut: 'api.js',
  overrides: {
    Date: (_, { prefix = '' }) => `${prefix}MyDateType`
  }
};
```

## TODO

the `api` part should be moved to its own repo, left it here for simplicity for now.

`apiOut` config param is thus optional

# metarpheus-tcomb

[![Build Status](https://travis-ci.org/buildo/metarpheus-tcomb.svg?branch=master)](https://travis-ci.org/buildo/metarpheus)

generate a [tcomb](https://github.com/gcanti/tcomb) domain model interpreting [metarpheus](https://github.com/buildo/metarpheus) output

## install

```sh
npm i metarpheus-tcomb
```

## usage

```sh
metarpheus-tcomb --config=path/to/config/file
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

## Example

Here's the gist:

```scala
sealed trait UserType extends CaseEnum
object UserType {
  case object User extends UserType
  case object SuperUser extends UserType
}

/**
  * A user
  *
  * @param _id ID of the user
  * @param username username
  * @param userType type of the user
  */
case class User(
  _id: Id[User],
  username: String,
  userType: UserType)


val route = {
  pathPrefix("users") {
    (get & pathCommit(`:Id`[User]) /**
      get user by id
    */) (returns[User].ctrlu(userController.findById)) ~
    (post & pathCommit("logout") /**
      performs the logout for the currently logged user
    */) (returns[Unit].ctrlu(userController.logout))
  }
}

```

becomes...

```js
const UserType = t.enums.of([
  'User',
  'SuperUser'
], 'UserType');

const User = t.struct({
  _id: Id/*Id[User]*/, // ID of the user
  username: t.String, // username
  userType: UserType // type of the user
}, 'User');

apis = [
  // GET /users/ : get user by id
  {
    method: 'get',
    name: ['userController', 'findById'],
    authenticated: true,
    returnType: User,
    route: (...routeParams) => ['users', routeParams[0]].join('/'),
    routeParamTypes: [Id/*Id[User]*/],
    params: {}
  },
  // POST /users/logout : performs the logout for the currently logged user
  {
    method: 'post',
    name: ['userController', 'logout'],
    authenticated: true,
    returnType: User,
    route: (...routeParams) => ['users', 'logout'].join('/'),
    routeParamTypes: [],
    params: {}
  }
];
```

## TODO

the `api` part should probably be moved to its own repo, left it here for simplicity for now.

`apiOut` config param is thus optional

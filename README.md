# Huscii

... simplifies daily work at ascii Dresden, featuring a member management, a shift planner (not yet) and an electronic cash book (not yet).


Huscii is built with [Angular 5](https://angular.io).

[![travis](https://travis-ci.org/ascii-dresden/huscii.svg?branch=master)](https://travis-ci.org/ascii-dresden/huscii/)
[![dependencies Status](https://david-dm.org/ascii-dresden/huscii/status.svg)](https://david-dm.org/ascii-dresden/huscii)
[![devDependencies Status](https://david-dm.org/ascii-dresden/huscii/dev-status.svg)](https://david-dm.org/ascii-dresden/huscii?type=dev)

[![GitHub forks](https://img.shields.io/github/forks/ascii-dresden/huscii.svg?style=social&label=Fork)](https://github.com/ascii-dresden/huscii/fork)
[![GitHub stars](https://img.shields.io/github/stars/ascii-dresden/huscii.svg?style=social&label=Star)](https://github.com/ascii-dresden/huscii)

> Build with :heart: in Dresden

:construction: Checkout the other branches to get the latest features. :construction:

## Features

- Member management
- Experimental Angular i18n support (en, [de](#i18n))

More great features will be implemented soon.

## Setup

In order to build the project, you'll need NodeJS and NPM. Yarn is optional.

**NOTE:** Feel free to run all commands with `npm` instead of `yarn`.

Install the dependencies.
```sh
yarn install
``` 

### Development

For a dev server run
```sh
yarn run start
``` 

#### i18n

To serve the application with german language run
```sh
yarn run start:de
```

### Documentation

A very handsome documentation can be generated with 
```sh
yarn run doc:buildandserve
```
This commands using JSDoc annotations from classes, methods, properties... to build a browsable documentation. Credits to [compodoc](https://github.com/compodoc/compodoc).

## License

MIT - [ascii Dresden](https://github.com/ascii-dresden) - :heart:

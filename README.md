# time-bombs

[![Build Status](https://travis-ci.org/autonomoussoftware/time-bombs.svg?branch=master)](https://travis-ci.org/autonomoussoftware/time-bombs)
[![bitHound Overall Score](https://www.bithound.io/github/autonomoussoftware/time-bombs/badges/score.svg)](https://www.bithound.io/github/autonomoussoftware/time-bombs)
[![bitHound Dependencies](https://www.bithound.io/github/autonomoussoftware/time-bombs/badges/dependencies.svg)](https://www.bithound.io/github/autonomoussoftware/time-bombs/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/autonomoussoftware/time-bombs/badges/code.svg)](https://www.bithound.io/github/autonomoussoftware/time-bombs)
[![Known Vulnerabilities](https://snyk.io/test/github/autonomoussoftware/time-bombs:package.json/badge.svg?targetFile=package.json)](https://snyk.io/test/github/autonomoussoftware/time-bombs:package.json?targetFile=package.json)

Create time bombs and listen for them to 💥

More detailed description or notes as needed.

## Installation

```bash
$ npm install --save time-bombs
```

## Usage

```js
const timeBombs = require('time-bomb')

// create the first bomb
const bomb1 = timeBombs.create(100, function () {
  console.log('This will not be called')
})
// deactivate it before it explodes!
setTimeout(function () {
  bomb1.deactivate()
}, 50)

// create a second bomb
const bomb2 = timeBombs.create(100, function () {
  console.log('This will be called in ~150ms')
})
// at 50ms, let it tick for 100ms more...
setTimeout(function () {
  bomb2.reset()
}, 50)
```

### API

#### `timeBombs.create(timeout, handler)`

Create a time bomb that will explode after the the given time in milliseconds. It will return the `bomb` object.

If the bomb explodes, the `handler` will be called with the bomb id as parameter.

#### `bomb.reset(newTimeout)`

Reset the bomb by changing its current timer to a new value. If no new time is given, it will default to the initial timeout set when the bomb was created.

#### `bomb.deactivate()`

Deactivate the bomb by clearing the current timer, if any.

## License

MIT

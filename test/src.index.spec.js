/* eslint-disable no-magic-numbers */

'use strict'

const chai = require('chai')

chai.should()

const timeBombs = require('..')

describe('Time Bombs', function () {
  it('should create a bomb and explode in the given time', function (done) {
    const time = Date.now()

    const timeout = setTimeout(function () {
      done(new Error('Bomb dod not explode'))
    }, 150)

    timeBombs.create(100, function () {
      Date.now().should.be.at.least(time + 100)

      clearTimeout(timeout)

      done()
    })
  })

  it('should create and deactivate a bomb before it explodes', function (done) {
    let exploded

    const bomb = timeBombs.create(100, function () {
      exploded = new Error('Bomb exploded')
    })

    setTimeout(function () {
      bomb.deactivate()
    }, 50)

    setTimeout(function () {
      done(exploded)
    }, 150)
  })

  it('should create and reset a bomb', function (done) {
    const time = Date.now()

    const timeout = setTimeout(function () {
      done(new Error('Bomb dod not explode'))
    }, 200)

    const bomb = timeBombs.create(100, function () {
      Date.now().should.be.at.least(time + 150)

      clearTimeout(timeout)

      done()
    })

    setTimeout(function () {
      bomb.reset()
    }, 50)

    setTimeout(function () {
      bomb.reset(50)
    }, 100)
  })

  it('should not break if missing params', function () {
    timeBombs.create()
  })
})

'use strict'

const debug = require('debug')('time-bombs')
const next = require('consecutive')()

/**
 * Create a time bomb that will explode after the the given timeout.
 *
 * The bomb's clock can be reset so it will start over and it can safely
 * deactivated to avoid it to explode.
 *
 * In the case the bomb is not deactivated on time, it will explode by calling
 * the given handler.
 *
 * @param {number} [timeout=0] is the number of milliseconds the bomb timer will
 *                             be set to.
 * @param {Function} [handler] the function that will be called when the bomb
 *                             explodes. It will receive the bomb id as
 *                             parameter.
* @returns {Object} is the created time bomb. It will have methods to reset,
 *                   deactivate and set the explosion handler.
 */
function create (timeout = 0, handler) {
  const id = next()

  if (!handler) {
    debug('Bomb explosion not to be handled?')
  }

  // Track the current bomb timer (setTimeout)
  let timer = null

  /**
   * Deactivate the bomb by clearing the current timer, if any.
   *
   * @returns {boolean} `true` if the bomb was deactivated.
   */
  function deactivate () {
    if (!timer) {
      return false
    }

    debug('(%d) Timer stopped', id)

    clearTimeout(timer)

    timer = null

    return true
  }

  /**
   * Set the bomb by deactivating the current timer and setting the timer again.
   *
   * When the timer times out, the explosion handler will be called but if none
   * was provided, the bomb will throw.
   *
   * @param {number} [ms] is the new bomb timer setting.
   * @returns {*} the current `setTimeout` instance so it can be cleared later.
   */
  function set (ms) {
    deactivate()

    timer = setTimeout(function () {
      debug('(%d) Boom!', id)

      if (handler) {
        handler(id)
      }
    }, ms)

    debug('(%d) Timer set to %dms', id, ms)

    return timer
  }

  /**
   * Reset the bomb by changing its current timer to a new value.
   *
   * @param {number} [newTimeout=timeout] is the new bomb timer setting. It will
   *                                      default to the initially given timeout
   *                                      but can be overwritten.
   */
  function reset (newTimeout = timeout) {
    set(newTimeout)
  }

  // Initialize the bomb!
  timer = set(timeout)

  debug('(%d) Bomb created and set', id)

  // Return the bomb API
  return {
    id,
    reset,
    deactivate
  }
}

module.exports = { create }

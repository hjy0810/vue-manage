/* some utils function */

/**
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source || typeof source !== 'object') {
    return source
  }
  const target = source.constructor === Array ? [] : {}
  for (const [item, value] of Object.entries(source)) {
    if (typeof value === 'object') {
      target[item] = deepClone(value)
    } else {
      target[item] = value
    }
  }
  return target
}

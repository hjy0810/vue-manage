/**
 * 一些验证
 */

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone(phone) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * @param {String} str
 * @returns {Boolean}
 */
export function validID(IDNumber) {
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(IDNumber)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'normal']
  return valid_map.indexOf(str.trim()) >= 0
}

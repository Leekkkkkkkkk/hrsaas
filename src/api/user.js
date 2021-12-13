import request from '@/utils/request'
/**
 *登录账户
 * @param {object} data {token}
 * @returns
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 *获取用户资料
 * @returns
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/**
 *获取员工资料
 * @param {*} id
 * @returns
 */
export function getUserInfoById(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'GET'
  })
}

export function logout() {
  return request()
}

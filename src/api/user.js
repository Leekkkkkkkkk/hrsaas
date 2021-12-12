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

export function logout() {
  return request()
}

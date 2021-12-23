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
/**
 *更新用户信息
 * @param {*} data
 */
export function updateUserInfoById(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'PUT',
    data
  })
}
/**
 *获取员工基本个人信息
 * @param {*} id
 * @returns
 */
export function getUserBaseInfoById(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}

/**
 * 更新员工个人信息
 * @param {Object} data
 */
export const saveEmployeeInfo = (data) => {
  return request({
    url: `/employees/${data.id}/personalInfo`,
    method: 'PUT',
    data
  })
}
/**
 *获取员工岗位信息
 * @param {*} id
 * @returns
 */
export const getEmployeesJobInfo = id => {
  return request({
    url: `/employees/${id}/jobs`
  })
}
export function logout() {
  return request()
}

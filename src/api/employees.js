import request from '@/utils/request.js'

/**
 *获取员工简单列表
 * @returns {id, username}
 */
export function getEmployeesListSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 *获取员工个人信息列表
 * @param {Object} params {page,size}
 * @returns
 */
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

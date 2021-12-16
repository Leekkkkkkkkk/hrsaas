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

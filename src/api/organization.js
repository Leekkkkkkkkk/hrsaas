import request from '@/utils/request.js'

/**
 *获取组织架构
 * @returns
 */
export function getdepartment() {
  return request({
    url: '/company/department'
  })
}

/**
 *根据id删除部门
 * @param {*} id
 * @returns
 */
export function getdepartments(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

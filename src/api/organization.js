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

/**
 *新增部门
 * @param {object} data {code.....}
 * @returns
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
/**
 *获取部门数据列表
 * @param {*} id
 * @returns {部门数据}
 */
export function getDepartmentsById(id) {
  return request({
    url: '/company/department/' + id,
    method: 'GET'
  })
}
/**
 *根据id修改部门信息
 * @param {object} data
 */
export function editDepartmentsById(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}


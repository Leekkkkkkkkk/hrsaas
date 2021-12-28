import request from '@/utils/request.js'

/**
 *获取角色列表
 * @param {*} params
 * @returns
 */
export function getRolesList(params) {
  return request({
    url: `/sys/role`,
    params
  })
}
/**
 *添加用户名
 * @param {*} data {name:名字,description:描述}
 * @returns
 */
export function addRoles(data) {
  return request({
    url: `/sys/role`,
    method: 'POST',
    data
  })
}
/**
 *根据id更新用户
 * @param {*} data
 */
export function editRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 *根据ID获取角色权限详情
 * @param {*} id
 * @returns
 */
export const getRolesInfo = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

/**
 *给角色分配权限
 * @param {*} data
 * @returns
 */
export const setRoles = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

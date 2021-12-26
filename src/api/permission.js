import request from '@/utils/request.js'

/**
 *获取所有权限点
 * @param {*} params
 * @returns
 */
export function getPermission(params) {
  return request({
    url: `/sys/permission`,
    params
  })
}

/**
 *添加权限点
 * @param {*} data
 * @returns
 */
export const addPermission = data => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 *根据ID更新权限详情
 * @param {*} data
 * @returns
 */
export const editPermission = data => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

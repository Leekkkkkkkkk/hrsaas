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

/**
 *新增员工
 * @param {*} data
 */
export const addEmployees = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
/**
 *批量导入
 * @param {*} data []
 */
export const importEmployees = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
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

/**
 * 保存更新员工岗位信息
 * @param {*} data
 */
export const saveEmployeeJob = (data) => {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}

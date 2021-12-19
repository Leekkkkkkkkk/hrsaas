import request from '@/utils/request.js'

/**
 *根据企业id查询
 * @param {*} id
 * @returns
 */
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

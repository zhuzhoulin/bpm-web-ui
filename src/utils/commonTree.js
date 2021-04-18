
import { getCompanyList } from '@/api/system/company'
import { getDeptList } from '@/api/system/dept'

import { handleTree } from './easybpm'

/**
 * 获取公司树 data, id, parentId, children, rootId
 */
export function getCompanyTree() {
  const listQuery = {}
  let options = []
  getCompanyList(listQuery).then(response => {
    console.log(2)
    console.log(handleTree(response.data, 'companyId', 'companyParentId'))
    options = handleTree(response.data, 'companyId', 'companyParentId')
  }).catch(err => {
    console.log(err)
  })
  console.log(1)
  console.log(options)
  return options
}

/**
 * 获取部门树
 */
export function getDeptTree() {
  const listQuery = {}
  let options = []
  getDeptList(listQuery).then(response => {
    options = handleTree(response.data, 'deptId', 'deptParentId', 0)
  }).catch(err => {
    console.log(err)
  })
  console.log(options)
  return options
}
/**
 * 获取机构部门树
 */

/**
 * 获取机构部门人员树
 */

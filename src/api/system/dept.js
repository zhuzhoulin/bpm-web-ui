import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getDeptListPage(query) {
  return request({
    url: '/lowCode/dept/getListPage',
    method: 'post',
    data: query
  })
}

export function getDeptList(query) {
  return request({
    url: '/lowCode/dept/getList',
    method: 'post',
    data: query
  })
}

export function saveDept(form) {
  return request({
    url: '/lowCode/dept/insert',
    method: 'post',
    data: form
  })
}

export function updateDept(form) {
  return request({
    url: '/lowCode/dept/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/dept/deleteById',
    method: 'post',
    data: { 'deptId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/dept/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/dept/getById',
    method: 'post',
    data: { 'deptId': id }
  })
}

export function getOrganDeptTree(form) {
  return request({
    url: '/lowCode/dept/getOrganDeptTree',
    method: 'post',
    data: form
  })
}

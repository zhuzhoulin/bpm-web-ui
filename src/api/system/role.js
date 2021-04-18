import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getRoleListPage(query) {
  return request({
    url: '/lowCode/role/getListPage',
    method: 'post',
    data: query
  })
}

export function getRoleList(query) {
  return request({
    url: '/lowCode/role/getList',
    method: 'post',
    data: query
  })
}

export function saveRole(form) {
  return request({
    url: '/lowCode/role/insert',
    method: 'post',
    data: form
  })
}

export function updateRole(form) {
  return request({
    url: '/lowCode/role/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/role/deleteById',
    method: 'post',
    data: { 'roleId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/role/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/role/getById',
    method: 'post',
    data: { 'roleId': id }
  })
}

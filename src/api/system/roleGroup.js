import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getRoleGroupListPage(query) {
  return request({
    url: '/lowCode/roleGroup/getListPage',
    method: 'post',
    data: query
  })
}

export function getRoleGroupList(query) {
  return request({
    url: '/lowCode/roleGroup/getList',
    method: 'post',
    data: query
  })
}

export function saveRoleGroup(form) {
  return request({
    url: '/lowCode/roleGroup/insert',
    method: 'post',
    data: form
  })
}

export function updateRoleGroup(form) {
  return request({
    url: '/lowCode/roleGroup/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/roleGroup/deleteById',
    method: 'post',
    data: { 'roleGroupId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/roleGroup/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/roleGroup/getById',
    method: 'post',
    data: { 'roleGroupId': id }
  })
}

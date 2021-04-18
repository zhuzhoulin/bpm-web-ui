import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getUserList(query) {
  return request({
    url: '/lowCode/user/getList',
    method: 'post',
    data: query
  })
}

export function getUserListPage(query) {
  return request({
    url: '/lowCode/user/getListPage',
    method: 'post',
    data: query
  })
}

export function saveUser(form) {
  return request({
    url: '/lowCode/user/insert',
    method: 'post',
    data: form
  })
}

export function updateUser(form) {
  return request({
    url: '/lowCode/user/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/user/deleteById',
    method: 'post',
    data: { 'id': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/user/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/user/getById',
    method: 'post',
    data: { 'id': id }
  })
}

export function getOrganUserTree(data) {
  return request({
    url: '/lowCode/user/getOrganUserTree',
    method: 'post',
    data
  })
}

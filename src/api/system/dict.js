import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getDictListPage(query) {
  return request({
    url: '/lowCode/dict/getListPage',
    method: 'post',
    data: query
  })
}

export function getDictList(query) {
  return request({
    url: '/lowCode/dict/getList',
    method: 'post',
    data: query
  })
}

export function saveDict(form) {
  return request({
    url: '/lowCode/dict/insert',
    method: 'post',
    data: form
  })
}

export function updateDict(form) {
  return request({
    url: '/lowCode/dict/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/dict/deleteById',
    method: 'post',
    data: { 'dictId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/dict/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/dict/getById',
    method: 'post',
    data: { 'dictId': id }
  })
}

export function getDictListByDictCode(data) {
  return request({
    url: '/lowCode/dict/getDictListByDictCode/' + data,
    method: 'post'
  })
}

export function getRoleDict(data) {
  return request({
    url: '/lowCode/dict/getRoleDictByTenantId/' + data,
    method: 'post'
  })
}

export function getRoleGroupDict(data) {
  return request({
    url: '/lowCode/dict/getRoleGroupDictByTenantId/' + data,
    method: 'post'
  })
}

export function getProcessDict(data) {
  return request({
    url: '/lowCode/dict/getProcessDict/' + data,
    method: 'post'
  })
}

export function getDeptListByTenantId(data) {
  return request({
    url: '/lowCode/dict/getDeptListByTenantId/' + data,
    method: 'post'
  })
}

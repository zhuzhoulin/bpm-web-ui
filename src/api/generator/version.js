import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getVersionListPage(query) {
  return request({
    url: '/code/version/getListPage',
    method: 'post',
    data: query
  })
}

export function getVersionList(query) {
  return request({
    url: '/code/version/getList',
    method: 'post',
    data: query
  })
}

export function saveVersion(form) {
  return request({
    url: '/code/version/insert',
    method: 'post',
    data: form
  })
}

export function updateVersion(form) {
  return request({
    url: '/code/version/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/code/version/deleteById',
    method: 'post',
    data: { 'id': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/code/version/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/code/version/getById',
    method: 'post',
    data: { 'id': id }
  })
}

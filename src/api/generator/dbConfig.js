import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getDbConfigListPage(query) {
  return request({
    url: '/code/dbConfig/getListPage',
    method: 'post',
    data: query
  })
}

export function getDbConfigList(query) {
  return request({
    url: '/code/dbConfig/getList',
    method: 'post',
    data: query
  })
}

export function saveDbConfig(form) {
  return request({
    url: '/code/dbConfig/insert',
    method: 'post',
    data: form
  })
}

export function updateDbConfig(form) {
  return request({
    url: '/code/dbConfig/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/code/dbConfig/deleteById',
    method: 'post',
    data: { 'dbId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/code/dbConfig/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/code/dbConfig/getById',
    method: 'post',
    data: { 'dbId': id }
  })
}

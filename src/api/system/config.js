import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getConfigListPage(query) {
  return request({
    url: '/lowCode/config/getListPage',
    method: 'post',
    data: query
  })
}

export function getConfigList(query) {
  return request({
    url: '/lowCode/config/getList',
    method: 'post',
    data: query
  })
}

export function saveConfig(form) {
  return request({
    url: '/lowCode/config/insert',
    method: 'post',
    data: form
  })
}

export function updateConfig(form) {
  return request({
    url: '/lowCode/config/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/config/deleteById',
    method: 'post',
    data: { 'configId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/config/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/config/getById',
    method: 'post',
    data: { 'configId': id }
  })
}

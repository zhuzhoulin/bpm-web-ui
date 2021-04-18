import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getNodeListPage(query) {
  return request({
    url: '/lowCode/node/getListPage',
    method: 'post',
    data: query
  })
}

export function getNodeList(query) {
  return request({
    url: '/lowCode/node/getList',
    method: 'post',
    data: query
  })
}

export function saveNode(form) {
  return request({
    url: '/lowCode/node/insert',
    method: 'post',
    data: form
  })
}

export function updateNode(form) {
  return request({
    url: '/lowCode/node/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/node/deleteById',
    method: 'post',
    data: { 'id': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/node/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/node/getById',
    method: 'post',
    data: { 'id': id }
  })
}

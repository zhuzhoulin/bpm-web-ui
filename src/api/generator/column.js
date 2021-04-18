import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getColumnListPage(query) {
  return request({
    url: '/code/column/getListPage',
    method: 'post',
    data: query
  })
}

export function getColumnList(query) {
  return request({
    url: '/code/column/getList',
    method: 'post',
    data: query
  })
}

export function saveColumn(form) {
  return request({
    url: '/code/column/insert',
    method: 'post',
    data: form
  })
}

export function updateColumn(form) {
  return request({
    url: '/code/column/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/code/column/deleteById',
    method: 'post',
    data: { 'columnId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/code/column/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/code/column/getById',
    method: 'post',
    data: { 'columnId': id }
  })
}

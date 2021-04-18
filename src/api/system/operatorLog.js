import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getOperatorLogListPage(query) {
  return request({
    url: '/lowCode/operatorLog/getListPage',
    method: 'post',
    data: query
  })
}

export function getOperatorLogList(query) {
  return request({
    url: '/lowCode/operatorLog/getList',
    method: 'post',
    data: query
  })
}

export function saveOperatorLog(form) {
  return request({
    url: '/lowCode/operatorLog/insert',
    method: 'post',
    data: form
  })
}

export function updateOperatorLog(form) {
  return request({
    url: '/lowCode/operatorLog/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/operatorLog/deleteById',
    method: 'post',
    data: { 'logId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/operatorLog/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/operatorLog/getById',
    method: 'post',
    data: { 'logId': id }
  })
}

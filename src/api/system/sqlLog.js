import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getSqlLogListPage(query) {
  return request({
    url: '/lowCode/sqlLog/getListPage',
    method: 'post',
    data: query
  })
}

export function getSqlLogList(query) {
  return request({
    url: '/lowCode/sqlLog/getList',
    method: 'post',
    data: query
  })
}

export function saveSqlLog(form) {
  return request({
    url: '/lowCode/sqlLog/insert',
    method: 'post',
    data: form
  })
}

export function updateSqlLog(form) {
  return request({
    url: '/lowCode/sqlLog/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/sqlLog/deleteById',
    method: 'post',
    data: { 'logId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/sqlLog/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/sqlLog/getById',
    method: 'post',
    data: { 'logId': id }
  })
}

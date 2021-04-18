import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getProcessListPage(query) {
  return request({
    url: '/lowCode/process/getListPage',
    method: 'post',
    data: query
  })
}

export function getProcessList(query) {
  return request({
    url: '/lowCode/process/getList',
    method: 'post',
    data: query
  })
}

export function saveProcess(form) {
  return request({
    url: '/lowCode/process/insert',
    method: 'post',
    data: form
  })
}

export function updateProcess(form) {
  return request({
    url: '/lowCode/process/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/process/deleteById',
    method: 'post',
    data: { 'processId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/process/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/process/getById',
    method: 'post',
    data: { 'processId': id }
  })
}

export function getProcessByKey(data) {
  return request({
    url: '/lowCode/process/getProcessByKey/' + data,
    method: 'post'
  })
}

export function initFormData(data) {
  return request({
    url: '/lowCode/process/getInitStartFormData/' + data,
    method: 'post'
  })
}

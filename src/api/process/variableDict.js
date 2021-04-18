import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getVariableDictListPage(query) {
  return request({
    url: '/lowCode/variableDict/getListPage',
    method: 'post',
    data: query
  })
}

export function getVariableDictList(query) {
  return request({
    url: '/lowCode/variableDict/getList',
    method: 'post',
    data: query
  })
}

export function saveVariableDict(form) {
  return request({
    url: '/lowCode/variableDict/insert',
    method: 'post',
    data: form
  })
}

export function updateVariableDict(form) {
  return request({
    url: '/lowCode/variableDict/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/variableDict/deleteById',
    method: 'post',
    data: { 'variableId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/variableDict/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/variableDict/getById',
    method: 'post',
    data: { 'variableId': id }
  })
}

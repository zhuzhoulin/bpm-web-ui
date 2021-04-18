import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getProcessRuleListPage(query) {
  return request({
    url: '/lowCode/processRule/getListPage',
    method: 'post',
    data: query
  })
}

export function getProcessRuleList(query) {
  return request({
    url: '/lowCode/processRule/getList',
    method: 'post',
    data: query
  })
}

export function saveProcessRule(form) {
  return request({
    url: '/lowCode/processRule/insert',
    method: 'post',
    data: form
  })
}

export function updateProcessRule(form) {
  return request({
    url: '/lowCode/processRule/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/processRule/deleteById',
    method: 'post',
    data: { 'ruleId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/processRule/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/processRule/getById',
    method: 'post',
    data: { 'ruleId': id }
  })
}

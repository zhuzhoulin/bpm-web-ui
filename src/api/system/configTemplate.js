import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getConfigTemplateListPage(query) {
  return request({
    url: '/lowCode/configTemplate/getListPage',
    method: 'post',
    data: query
  })
}

export function getConfigTemplateList(query) {
  return request({
    url: '/lowCode/configTemplate/getList',
    method: 'post',
    data: query
  })
}

export function saveConfigTemplate(form) {
  return request({
    url: '/lowCode/configTemplate/insert',
    method: 'post',
    data: form
  })
}

export function updateConfigTemplate(form) {
  return request({
    url: '/lowCode/configTemplate/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/configTemplate/deleteById',
    method: 'post',
    data: { 'templateId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/configTemplate/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/configTemplate/getById',
    method: 'post',
    data: { 'templateId': id }
  })
}

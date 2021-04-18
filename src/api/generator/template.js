import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getTemplateListPage(query) {
  return request({
    url: '/code/template/getListPage',
    method: 'post',
    data: query
  })
}

export function getTemplateList(query) {
  return request({
    url: '/code/template/getList',
    method: 'post',
    data: query
  })
}

export function saveTemplate(form) {
  return request({
    url: '/code/template/insert',
    method: 'post',
    data: form
  })
}

export function updateTemplate(form) {
  return request({
    url: '/code/template/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/code/template/deleteById',
    method: 'post',
    data: { 'templateId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/code/template/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/code/template/getById',
    method: 'post',
    data: { 'templateId': id }
  })
}

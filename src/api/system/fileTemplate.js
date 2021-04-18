import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getFileTemplateListPage(query) {
  return request({
    url: '/lowCode/fileTemplate/getListPage',
    method: 'post',
    data: query
  })
}

export function getFileTemplateList(query) {
  return request({
    url: '/lowCode/fileTemplate/getList',
    method: 'post',
    data: query
  })
}

export function saveFileTemplate(form) {
  return request({
    url: '/lowCode/fileTemplate/insert',
    method: 'post',
    data: form
  })
}

export function updateFileTemplate(form) {
  return request({
    url: '/lowCode/fileTemplate/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/fileTemplate/deleteById',
    method: 'post',
    data: { 'tempalteId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/fileTemplate/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/fileTemplate/getById',
    method: 'post',
    data: { 'tempalteId': id }
  })
}

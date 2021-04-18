import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getFormDataListPage(query) {
  return request({
    url: '/lowCode/formData/getListPage',
    method: 'post',
    data: query
  })
}

export function getFormDataList(query) {
  return request({
    url: '/lowCode/formData/getList',
    method: 'post',
    data: query
  })
}

export function saveFormData(form) {
  return request({
    url: '/lowCode/formData/insert',
    method: 'post',
    data: form
  })
}

export function updateFormData(form) {
  return request({
    url: '/lowCode/formData/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/formData/deleteById',
    method: 'post',
    data: { 'dataId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/formData/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/formData/getById',
    method: 'post',
    data: { 'dataId': id }
  })
}

import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/lowCode/form/getList',
    method: 'post',
    data
  })
}

export function insertForm(data) {
  return request({
    url: '/lowCode/form/insertForm',
    method: 'post',
    data
  })
}


export function deleteForm(data) {
  return request({
    url: '/lowCode/form/deleteForm',
    method: 'post',
    data
  })
}



export function getFormListPage(query) {
  return request({
    url: '/lowCode/form/getListPage',
    method: 'post',
    data: query
  })
}

export function getFormList(query) {
  return request({
    url: '/lowCode/form/getList',
    method: 'post',
    data: query
  })
}

export function saveForm(form) {
  return request({
    url: '/lowCode/form/insert',
    method: 'post',
    data: form
  })
}

export function updateForm(form) {
  return request({
    url: '/lowCode/form/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/form/deleteById',
    method: 'post',
    data: { 'formId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/form/download',
    query
  )
}
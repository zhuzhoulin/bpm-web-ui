import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/lowcode/form/getList',
    method: 'post',
    data
  })
}

export function insertForm(data) {
  return request({
    url: '/lowcode/form/insertForm',
    method: 'post',
    data
  })
}

export function updateForm(data) {
  return request({
    url: '/lowcode/form/updateForm',
    method: 'post',
    data
  })
}

export function deleteForm(data) {
  return request({
    url: '/lowcode/form/deleteForm',
    method: 'post',
    data
  })
}

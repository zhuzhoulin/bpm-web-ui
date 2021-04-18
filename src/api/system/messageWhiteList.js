import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getMessageWhiteListListPage(query) {
  return request({
    url: '/lowCode/messageWhiteList/getListPage',
    method: 'post',
    data: query
  })
}

export function getMessageWhiteListList(query) {
  return request({
    url: '/lowCode/messageWhiteList/getList',
    method: 'post',
    data: query
  })
}

export function saveMessageWhiteList(form) {
  return request({
    url: '/lowCode/messageWhiteList/insert',
    method: 'post',
    data: form
  })
}

export function updateMessageWhiteList(form) {
  return request({
    url: '/lowCode/messageWhiteList/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/messageWhiteList/deleteById',
    method: 'post',
    data: { 'whiteId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/messageWhiteList/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/messageWhiteList/getById',
    method: 'post',
    data: { 'whiteId': id }
  })
}

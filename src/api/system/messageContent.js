import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getMessageContentListPage(query) {
  return request({
    url: '/lowCode/messageContent/getListPage',
    method: 'post',
    data: query
  })
}

export function getMessageContentList(query) {
  return request({
    url: '/lowCode/messageContent/getList',
    method: 'post',
    data: query
  })
}

export function saveMessageContent(form) {
  return request({
    url: '/lowCode/messageContent/insert',
    method: 'post',
    data: form
  })
}

export function updateMessageContent(form) {
  return request({
    url: '/lowCode/messageContent/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/messageContent/deleteById',
    method: 'post',
    data: { 'contentId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/messageContent/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/messageContent/getById',
    method: 'post',
    data: { 'contentId': id }
  })
}

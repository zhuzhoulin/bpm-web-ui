import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getFileListPage(query) {
  return request({
    url: '/lowCode/file/getListPage',
    method: 'post',
    data: query
  })
}

export function getFileList(query) {
  return request({
    url: '/lowCode/file/getList',
    method: 'post',
    data: query
  })
}

export function saveFile(form) {
  return request({
    url: '/lowCode/file/insert',
    method: 'post',
    data: form
  })
}

export function updateFile(form) {
  return request({
    url: '/lowCode/file/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/file/deleteById',
    method: 'post',
    data: { 'fileId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/lowCode/file/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/file/getById',
    method: 'post',
    data: { 'fileId': id }
  })
}

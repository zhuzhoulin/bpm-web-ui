import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getProcessDetailListPage(query) {
  return request({
    url: '/lowCode/processDetail/getListPage',
    method: 'post',
    data: query
  })
}

export function getProcessDetailList(query) {
  return request({
    url: '/lowCode/processDetail/getList',
    method: 'post',
    data: query
  })
}

export function saveProcessDetail(form) {
  return request({
    url: '/lowCode/processDetail/insert',
    method: 'post',
    data: form
  })
}

export function updateProcessDetail(form) {
  return request({
    url: '/lowCode/processDetail/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/processDetail/deleteById',
    method: 'post',
    data: { 'processDetailId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/processDetail/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/processDetail/getById',
    method: 'post',
    data: { 'processDetailId': id }
  })
}

export function publish(data) {
  return request({
    url: '/lowCode/processDetail/publish',
    method: 'post',
    data
  })
}

export function updateDefaultVersion(processId, processDetailId) {
  return request({
    url: '/lowCode/processDetail/updateDefaultVersion/' + processId + '/' + processDetailId,
    method: 'post'
  })
}

export function getProcessDetailById(processDetailId) {
  return request({
    url: '/lowCode/processDetail/getProcessDetailById/' + processDetailId,
    method: 'post'
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/lowCode/processDetail/insertOrUpdate',
    method: 'post',
    data
  })
}

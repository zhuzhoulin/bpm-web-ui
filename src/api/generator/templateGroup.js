import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getTemplateGroupListPage(query) {
  return request({
    url: '/code/templateGroup/getListPage',
    method: 'post',
    data: query
  })
}

export function getTemplateGroupList(query) {
  return request({
    url: '/code/templateGroup/getList',
    method: 'post',
    data: query
  })
}

export function saveTemplateGroup(form) {
  return request({
    url: '/code/templateGroup/insert',
    method: 'post',
    data: form
  })
}

export function updateTemplateGroup(form) {
  return request({
    url: '/code/templateGroup/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/code/templateGroup/deleteById',
    method: 'post',
    data: { 'templateGroupId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/code/templateGroup/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/code/templateGroup/getById',
    method: 'post',
    data: { 'templateGroupId': id }
  })
}

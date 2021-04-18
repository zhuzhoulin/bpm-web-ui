import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getMenuListPage(query) {
  return request({
    url: '/lowCode/menu/getListPage',
    method: 'post',
    data: query
  })
}

export function getMenuList(query) {
  return request({
    url: '/lowCode/menu/getList',
    method: 'post',
    data: query
  })
}

export function saveMenu(form) {
  return request({
    url: '/lowCode/menu/insert',
    method: 'post',
    data: form
  })
}

export function updateMenu(form) {
  return request({
    url: '/lowCode/menu/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/menu/deleteById',
    method: 'post',
    data: { 'menuId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/menu/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/menu/getById',
    method: 'post',
    data: { 'menuId': id }
  })
}

export function getMenuTree(data) {
  return request({
    url: '/lowCode/menu/getMenuTree/' + data,
    method: 'post'
  })
}

import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getDictItemListPage(query) {
  return request({
    url: '/lowCode/dictItem/getListPage',
    method: 'post',
    data: query
  })
}

export function getDictItemList(query) {
  return request({
    url: '/lowCode/dictItem/getList',
    method: 'post',
    data: query
  })
}

export function saveDictItem(form) {
  return request({
    url: '/lowCode/dictItem/insert',
    method: 'post',
    data: form
  })
}

export function updateDictItem(form) {
  return request({
    url: '/lowCode/dictItem/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/dictItem/deleteById',
    method: 'post',
    data: { 'itemId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/dictItem/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/dictItem/getById',
    method: 'post',
    data: { 'itemId': id }
  })
}

export function getListByDictCode(data) {
  return request({
    url: '/lowCode/dictItem/getListByDictCode/' + data,
    method: 'post'

  })
}

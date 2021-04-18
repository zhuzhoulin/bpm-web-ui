import request from '@/utils/request'
import apiDownLoad from '@/utils/download'


export function getTableStrategyConfigListPage(query) {
  return request({
    url: '/code/tableStrategyConfig/getListPage',
    method: 'post',
    data: query
  })
}

export function getTableStrategyConfigList(query) {
  return request({
    url: '/code/tableStrategyConfig/getList',
    method: 'post',
    data: query
  })
}

export function saveTableStrategyConfig(form) {
  return request({
    url: '/code/tableStrategyConfig/insert',
    method: 'post',
    data: form
  })
}

export function updateTableStrategyConfig(form) {
  return request({
    url: '/code/tableStrategyConfig/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/code/tableStrategyConfig/deleteById',
    method: 'post',
    data: { 'configId': id }
  })
}

export function download(query) {
  return apiDownLoad(
   '/code/tableStrategyConfig/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/code/tableStrategyConfig/getById',
    method: 'post',
    data: { 'configId': id }
  })
}

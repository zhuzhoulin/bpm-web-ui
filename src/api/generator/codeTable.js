import request from '@/utils/request'
import { downLoadZip } from '@/utils/download'

export function getCodeTableList(query) {
  return request({
    url: '/code/codeTable/getList',
    method: 'post',
    data: query
  })
}

export function getTableColumnList(query) {
  return request({
    url: '/code/codeTable/getTableColumnList',
    method: 'post',
    data: query
  })
}

export function initAndExecute(query) {
  return request({
    url: '/code/codeTable/initAndExecute',
    method: 'post',
    data: query
  })
}

export function gengratorCode(query) {
  return request({
    url: '/code/codeTable/gengratorCode',
    method: 'post',
    data: query
  })
}

export function download(query) {
  return downLoadZip(
    '/code/codeTable/downloadZip',
    query
  )
}

export function saveOrUpdateListAndGetList(query) {
  return request({
    url: '/code/codeTable/saveOrUpdateListAndGetList',
    method: 'post',
    data: query
  })
}

export function getStrategyConfigByDbId(query) {
  return request({
    url: '/code/codeTable/getStrategyConfigByDbId',
    method: 'post',
    data: query
  })
}

export function testConn(query) {
  return request({
    url: '/code/codeTable/testConn',
    method: 'post',
    data: query
  })
}

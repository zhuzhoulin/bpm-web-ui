import request from '@/utils/request'
import apiDownLoad from '@/utils/download'

export function getCompanyListPage(query) {
  return request({
    url: '/lowCode/company/getListPage',
    method: 'post',
    data: query
  })
}

export function getCompanyList(query) {
  return request({
    url: '/lowCode/company/getList',
    method: 'post',
    data: query
  })
}

export function saveCompany(form) {
  return request({
    url: '/lowCode/company/insert',
    method: 'post',
    data: form
  })
}

export function updateCompany(form) {
  return request({
    url: '/lowCode/company/update',
    method: 'post',
    data: form
  })
}

export function deleteById(id) {
  return request({
    url: '/lowCode/company/deleteById',
    method: 'post',
    data: { 'companyId': id }
  })
}

export function download(query) {
  return apiDownLoad(
    '/lowCode/company/download',
    query
  )
}

export function getById(id) {
  return request({
    url: '/lowCode/company/getById',
    method: 'post',
    data: { 'companyId': id }
  })
}

export function getCompanyTree(form) {
  return request({
    url: '/lowCode/company/getCompanyTree',
    method: 'post',
    data: form
  })
}

export function getCompanyDict(data) {
  return request({
    url: '/lowCode/company/getCompanyIdAndNameDictList',
    method: 'post',
    data
  })
}

export function getCompanyByCode(data) {
  return request({
    url: '/lowCode/company/getCompanyByCode/' + data,
    method: 'post',
    data
  })
}

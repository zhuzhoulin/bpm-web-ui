import request from '@/utils/request'

export function startApply(data) {
  return request({
    url: '/lowCode/apply/startProcess',
    method: 'post',
    data
  })
}

export function saveDraftApply(data) {
  return request({
    url: '/lowCode/apply/saveDraftApply',
    method: 'post',
    data
  })
}

export function getApplyDetail(data) {
  return request({
    url: '/lowCode/apply/getApplyDetail/' + data,
    method: 'post'
  })
}

export function getApproveDetail(data) {
  return request({
    url: '/lowCode/apply/getApproveDetail/' + data,
    method: 'post'
  })
}

export function getApplyLineChart(data) {
  return request({
    url: '/lowCode/apply/getApplyLineChart',
    method: 'post',
    data
  })
}


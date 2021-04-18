import request from '@/utils/request'

export function getDraftList(data) {
  return request({
    url: '/lowCode/userTask/getDraftListByCondition',
    method: 'post',
    data
  })
}

export function getApplyList(data) {
  return request({
    url: '/lowCode/userTask/getApplyListByCondition',
    method: 'post',
    data
  })
}

export function getHaveDoList(data) {
  return request({
    url: '/lowCode/userTask/getHaveDoListByCondition',
    method: 'post',
    data
  })
}

export function getToDoList(data) {
  return request({
    url: '/lowCode/userTask/getToDoListByCondition',
    method: 'post',
    data
  })
}

export function completeTask(data) {
  return request({
    url: '/lowCode/userTask/completeTask',
    method: 'post',
    data
  })
}

export function batchCompleteTask(data) {
  return request({
    url: '/lowCode/userTask/batchCompleteTask',
    method: 'post',
    data
  })
}

export function getRandomJumpNode(data) {
  return request({
    url: '/lowCode/userTask/getRandomJumpNode/' + data,
    method: 'post'
  })
}

export function getReturnNode(data) {
  return request({
    url: '/lowCode/userTask/getReturnNode/' + data,
    method: 'post'
  })
}

export function getCountListByUserType(data, userType) {
  return request({
    url: '/lowCode/userTask/getCountListByUserType/' + data + '/' + userType,
    method: 'post'
  })
}

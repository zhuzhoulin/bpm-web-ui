import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/lowCode/login/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/lowCode/login/logout',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/lowCode/login/getUserInfo/' + data,
    method: 'post'

  })
}

import request from '@/utils/request'

export function getRedisInfo() {
  return request({
    url: '/lowCode/monitor/cache/getRedisInfo',
    method: 'post'
  })
}

export function getServerInfo() {
  return request({
    url: '/lowCode/monitor/server/getServerInfo',
    method: 'post'
  })
}

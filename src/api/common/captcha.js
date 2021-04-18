import request from '@/utils/request'

export function getCodeImg(query) {
  return request({
    url: '/lowCode/common/captcha/captchaImage',
    method: 'get',
    data: query
  })
}

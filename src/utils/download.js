import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
const mimeMap = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip'
}
const baseUrl = process.env.VUE_APP_BASE_API

export function apiDownLoad(url, data) {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: baseUrl + url,
      data,
      responseType: 'blob',
      headers: { 'accessToken': getToken(),
        'userId': store.getters.userId,
        'tenantId': store.getters.tenantId }
    }).then(res => {
      console.log(res)
      resolveBlob(res, mimeMap.xlsx)
      return res
    }).catch(err => {
      console.log(err)
      resolve('error')
    })
  })
}

export function downLoadZip(url, data) {
  console.log(data)
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: baseUrl + url,
      data,
      responseType: 'blob',
      headers: { 'accessToken': getToken(),
        'userId': store.getters.userId,
        'tenantId': store.getters.tenantId }
    }).then(res => {
      resolveBlob(res, mimeMap.zip)
    }).catch(err => {
      console.log(err)
      resolve('error')
    })
  })
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob(res, mimeType) {
  const aLink = document.createElement('a')
  var blob = new Blob([res.data], { type: mimeType })
  // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  var contentDisposition = decodeURI(res.headers['content-disposition'])
  var result = patt.exec(contentDisposition)
  var fileName = result[1]
  fileName = fileName.replace(/\"/g, '')
  console.log('fileName:', fileName)
  aLink.href = URL.createObjectURL(blob)
  aLink.setAttribute('download', fileName) // 设置下载文件名称
  document.body.appendChild(aLink)
  aLink.click()
  document.body.appendChild(aLink)
}

export default apiDownLoad

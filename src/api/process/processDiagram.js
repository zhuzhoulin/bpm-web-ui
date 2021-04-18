import request from '@/utils/request'

export function getProcessDiagramByApplyId(data) {
  return request({
    url: '/lowCode/processDiagram/getProcessDiagramByApplyId/' + data,
    method: 'post'
  })
}


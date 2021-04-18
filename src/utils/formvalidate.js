import { validEmail, checkPhone, validURL, checkIP, checkTel, validIdCard } from './validate'

// 判断邮箱是否正确
export const validateEmail = (rule, value, callback) => {
  console.log(value)
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (validEmail(value)) {
      callback()
    } else {
      return callback(new Error('格式不正确'))
    }
  }
}

export const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (checkPhone(value)) {
      callback()
    } else {
      return callback(new Error('格式不正确'))
    }
  }
}

export const validateUrl = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (validURL(value)) {
      callback()
    } else {
      return callback(new Error('格式不正确'))
    }
  }
}

export const validateIp = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (checkIP(value)) {
      callback()
    } else {
      return callback(new Error('格式不正确'))
    }
  }
}

export const validateTel = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (checkTel(value)) {
      callback()
    } else {
      return callback(new Error('格式不正确'))
    }
  }
}

export const validateIdCard = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    if (validIdCard(value)) {
      callback()
    } else {
      return callback(new Error('格式不正确'))
    }
  }
}

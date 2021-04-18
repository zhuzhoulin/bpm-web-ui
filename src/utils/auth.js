// import Cookies from 'js-cookie'

const TokenKey = 'accessToken'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

const UserInfo = 'userInfo'

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfo))
}

export function setUserInfo(userInfo) {
  return localStorage.setItem(UserInfo, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserInfo)
}

const RoleInfo = 'roleInfo'

export function getRole() {
  return JSON.parse(localStorage.getItem(RoleInfo))
}

export function setRoleInfo(roleInfo) {
  return localStorage.setItem(RoleInfo, JSON.stringify(roleInfo))
}

export function removeRoleInfo() {
  return localStorage.removeItem(RoleInfo)
}

const Menu = 'menu'
export function getMenu() {
  return JSON.parse(localStorage.getItem(Menu))
}

export function setMenu(menu) {
  return localStorage.setItem(Menu, JSON.stringify(menu))
}

export function removeMenu() {
  return localStorage.removeItem(Menu)
}

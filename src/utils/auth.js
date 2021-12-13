import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_token'
// 操作token的
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 操作时间戳的
export function setTokenTime() {
  return Cookies.set('Token_timer', Date.now())
}

export function getTokenTime() {
  return Cookies.get('Token_timer')
}

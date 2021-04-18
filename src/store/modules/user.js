import { login, logout, getInfo } from '@/api/system/login'

import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo, removeMenu } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: getUserInfo() ? getUserInfo() : {},
    userId: getUserInfo() ? getUserInfo().userId : '',
    name: getUserInfo() ? getUserInfo().realName : '',
    avatar: getUserInfo() ? getUserInfo().avatar : '',
    tenantId: getUserInfo() ? getUserInfo().tenantId : ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_TENANT_ID: (state, tenantId) => {
    state.tenantId = tenantId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, uuid, code } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        system: store.getters.system,
        platform: store.getters.platform,
        uuid: uuid,
        code: code
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.accessToken)
        commit('SET_USER_ID', data.userId)
        commit('SET_NAME', data.realName)
        commit('SET_AVATAR', data.avatar)
        commit('SET_TENANT_ID', data.tenantId)
        setToken(data.accessToken)

        setUserInfo(data)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.userId).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, tenantId } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_TENANT_ID', tenantId)

        setToken(data.accessToken)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_TOKEN', '')
        commit('SET_USER_ID', null)
        commit('SET_NAME', null)
        commit('SET_AVATAR', null)
        commit('SET_MENUS', [])
        resolve()
        removeUserInfo()
        removeMenu()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      commit('SET_TOKEN', '')
      commit('SET_TOKEN', '')

      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


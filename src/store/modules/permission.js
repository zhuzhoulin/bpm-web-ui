import { constantRoutes } from '@/router'
import store from '@/store'
import { getMenuTree } from '@/api/system/menu'
import Layout from '@/layout'
import {
  validateURL
} from '@/utils/validate.js'
import { setMenu } from '@/utils/auth'

export function addDynamicMenuRoutes(menus) {
  const routers = []

  menus.forEach((item) => {
    const path = item.menuUrl
    const id = item.menuId
    const code = item.menuCode
    const name = item.menuName
    const componentPath = item.component
    const icon = item.menuIcon
    const children = item.children
    const hidden = item.hidden === 1
    const meta = item.meta
    const redirect = item.redirect || ''
    // const alwaysShow = item.alwaysShow === 1

    const route = {
      component: Layout,
      id: id,
      code: code,
      name: name,
      path: path,
      hidden: hidden,
      // alwaysShow: alwaysShow,
      meta: {
        id: id,
        code: code,
        title: name,
        icon: icon,
        noCache: true,
        meta: meta
      },
      children: []
    }

    if (redirect !== '') {
      route['redirect'] = redirect
    }

    // 如果是 外部 url，使用 iframe 标签展示，不用指定 component，重新指定 path、name 以及 iframeUrl。
    if (validateURL(path)) {
      route['path'] = `iframe/${path}`
      route['name'] = `iframe/${name}`
      route['meta']['iframe'] = true
      route['meta']['iframeUrl'] = path
    }
    if (componentPath !== 'Layout') {
      let subView = componentPath
      subView = subView.replace(/^\/*/g, '')
      console.log('subView:' + subView)
      route.component = resolve => require([`@/views/${subView}`], resolve)
    }
    if (children && children.length > 0) {
      route.children = addDynamicMenuRoutes(children)
    }
    routers.push(route)
  })
  return routers
}

const state = {
  menus: [],
  routes: []
}

const mutations = {
  SET_ROUTES: (state, menus) => {
    state.menus = menus
    state.routes = constantRoutes.concat(menus)
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  /**
   * [getRoutes 获取菜单，生成路由地址]
   * @param  {[type]} options.commit [description]
   * @param  {[type]} options.state  [description]
   * @return {[type]}                [description]
   */
  getRoutes({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenuTree(store.getters.tenantId).then(response => {
        const { data } = response

        if (!data || data.length <= 0) {
          reject('获取菜单失败失败，请重试.')
        }
        const routers = addDynamicMenuRoutes(data)
        commit('SET_ROUTES', routers)
        commit('SET_MENUS', routers)
        setMenu(routers)
        resolve(routers)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

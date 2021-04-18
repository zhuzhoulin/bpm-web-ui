import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Watermark from '@/components/Watermark/watermark'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasMenus = store.getters.menus && store.getters.menus.length > 0
      if (hasMenus) {
        next()
      } else {
      // 刷新页面的时候，如果动态加载菜单的时候，需要在登录页获取菜单，不然会出现空白
        try {
        // 获取路由
          const accessRoutes = await store.dispatch('permission/getRoutes')
          // accessRoutes.push({ path: '*', redirect: '/404', hidden: true })

          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
        // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  const hasToken = getToken()

  if (hasToken) {
    const title = store.getters.name + ' ' + store.getters.userId
    Watermark.set(title) // 设置水印title
  } else {
    Watermark.out() // 清除水印
  }
  // finish progress bar
  NProgress.done()
})


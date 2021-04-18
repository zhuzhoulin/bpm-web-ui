const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  language: state => state.app.language,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
  // menus: state => state.permission.menus,
  userId: state => state.user.userId,
  tenantId: state => state.user.tenantId,
  user: state => state.user,
  system: state => 'best-bpm',
  platform: state => 'pc',
  routes: state => state.permission.routes,
  menus: state => state.permission.menus

}
export default getters

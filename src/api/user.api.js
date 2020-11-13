export default {
  listUsers: 'get /api/users',
  inspectUser: 'get /api/user/:id',
  updateUser: 'put /api/user/:id',
  createUser: 'post /api/user/:id',
  // 获取当前用户信息
  getProfile: 'get /api/user/profile',
  // 升级续费检查是否有订单
  chargeOrderCheck: 'get /org/api/v1.3/entities/:uuid/charge/order/check',
  // 查询企业收费状态
  chargeStatus: 'get /org/api/v1.3/entities/:entityUuid/chargeStatus',
  // 获取当前用户权限
  getPermission: 'get /api/accountbook/permission/user',
  // 获取菜单权限
  getMenuPermission: 'get /api/users/permissions',
  login:'post /api/login/account',
  fetchCurrent: 'get /api/currentUser'
};

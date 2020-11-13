export default [
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '@/layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login'
          },
          {
            component: '404'
          }
        ]
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/empty/emptypage'
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/exception',
            routes: [
              {
                path: '/',
                redirect: '/exception/403'
              },
              {
                name: '403',
                icon: 'smile',
                path: '/exception/403',
                component: './exception/403'
              },
              {
                name: '404',
                icon: 'smile',
                path: '/exception/404',
                component: './exception/404'
              },
              {
                name: '500',
                icon: 'smile',
                path: '/exception/500',
                component: './exception/500'
              }
            ]
          },
          {
            name: '空白页面',
            icon: 'smile',
            path: '/empty/emptypage',
            component: './empty/Emptypage'
          },
          {
            name: '查询表格',
            icon: 'smile',
            path: '/listtablelist',
            component: './ListTableList'
          },
          {
            component: '404'
          }
        ]
      }
    ]
  }
];

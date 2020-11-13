// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV, APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  //[
    // {
    //   path: '/',
    //   component: '../layouts/BlankLayout',
    //   routes: [
    //     {
    //       path: '/user',
    //       component: '../layouts/UserLayout',
    //       routes: [
    //         {
    //           name: 'login',
    //           path: '/user/login',
    //           component: './user/login',
    //           },
    //         {
    //           component: '404',
    //         },
    //       ],
    //     },
    //     {
    //       path: '/',
    //       component: '../layouts/BasicLayout',
    //       Routes: ['src/pages/Authorized'],
    //       authority: ['admin', 'user'],
    //       routes: [
    //         {
    //           path: '/',
    //           redirect: '/emptypage',
    //         },
    //         {
    //           name: 'exception',
    //           icon: 'warning',
    //           path: '/exception',
    //           routes: [
    //             {
    //               path: '/',
    //               redirect: '/exception/403',
    //             },
    //             {
    //               name: '403',
    //               icon: 'smile',
    //               path: '/exception/403',
    //               component: './exception/403',
    //             },
    //             {
    //               name: '404',
    //               icon: 'smile',
    //               path: '/exception/404',
    //               component: './exception/404',
    //             },
    //             {
    //               name: '500',
    //               icon: 'smile',
    //               path: '/exception/500',
    //               component: './exception/500',
    //             },
    //           ],
    //         },
    //         {
    //           name: '空白页面',
    //           icon: 'smile',
    //           path: '/empty/emptypage',
    //           component: './empty/Emptypage',
    //         },
    //         {
    //           component: '404',
    //         },
    //       ],
    //     },
    //   ],
    // },
  // ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    APP_ENV: APP_ENV
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});

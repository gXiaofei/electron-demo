import { defineConfig } from '@umijs/max';
import settings from './config/defaultSettings'
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  history: { type: 'hash' },
  outputPath: '../../release/app/dist/renderer',
  publicPath: isProd ? './' : '/',
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
       // 拂晓蓝
       primaryColor: '#1890ff',
       contentWidth: 'Fluid',
       fixedHeader: true,
       fixSiderbar: true,
       colorWeak: false,
       pwa: false,
       // 设置标题的 title
       title: '投行承做助手',
       navTheme: 'light',
       headerHeight: 56,
       splitMenus: false,
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
        name: '登录',
        path: '/login',
        component: './Login',
        headerRender: false,
        footerRender: false,
        menuRender: false,
        menuHeaderRender: false,
         // 隐藏自己和子菜单
        hideInMenu: true,
        // 在面包屑中隐藏
        hideInBreadcrumb: true,
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined'
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
      icon: 'CloudOutlined',
      access: 'canReadPageA'
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
    },
    {
        path: '*',
        component: './404',
    },
  ],
  npmClient: 'pnpm',
});


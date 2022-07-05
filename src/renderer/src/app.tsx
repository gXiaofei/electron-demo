// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { LinkOutlined } from '@ant-design/icons';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { message } from 'antd';
import logo from './assets/icon.png';

export async function getInitialState(): Promise<{
    name: string;
    avatar: string;
}> {
    return { name: '张三', avatar: logo };
}

const isDev = process.env.NODE_ENV === 'development';

export const layout: RunTimeLayoutConfig = ({
    initialState,
    setInitialState,
}) => {
    console.log('initialState', initialState);
    return {
        logo: <img src={logo} alt="logo" />,
        menu: {
            locale: false,
        },
        links: isDev
            ? [
                  <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
                      <LinkOutlined />
                      <span>OpenAPI 文档</span>
                  </Link>,
              ]
            : [],
        layout: 'mix',
        siderWidth: 200,
        logout: () => {
            history.push('/login');
            message.success('退出登录成功');
        },
    };
};

export function onRouteChange({ location, routes, action, clientRoutes }) {
    console.log(location, routes, action, clientRoutes);

    if (location.pathname === '/login') {
        window.electron.ipcRenderer.sendMessage('login', [false]);
    }
    // bacon(location.pathname);
}

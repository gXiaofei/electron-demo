import type { Settings as LayoutSettings } from '@ant-design/pro-components';

const settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    // 拂晓蓝
    primaryColor: '#1890ff',
    layout: 'mix',
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
};

export default settings;

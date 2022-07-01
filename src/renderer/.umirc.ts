const isProd = process.env.NODE_ENV === 'production';
export default {
    history: { type: 'hash' },
    npmClient: 'npm',
    outputPath: '../../release/app/dist/renderer',
    publicPath: isProd ? './' : '/',
    routes: [
        { path: '/', component: '@/pages/Login' },
        { path: '/login', component: '@/pages/Login' },
        { path: '/docs', component: '@/pages/Docs' },
    ],
};

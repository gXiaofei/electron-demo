const isProd = process.env.NODE_ENV === 'production';
import { defineConfig } from 'umi';
export default defineConfig({
    history: { type: 'hash' },
    npmClient: 'npm',
    outputPath: '../../release/app/dist/renderer',
    publicPath: isProd ? './' : '/',
    routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/login', component: '@/pages/Login' },
        { path: '/docs', component: '@/pages/Docs' },
    ],
});

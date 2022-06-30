const isProd = process.env.NODE_ENV === 'production';
export default {
    history: { type: 'hash' },
    npmClient: 'npm',
    outputPath: '../../release/app/dist/renderer',
    publicPath: isProd ? './' : '/',
};

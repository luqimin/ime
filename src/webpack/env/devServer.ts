/**
 * webpack dev server 配置
 */
export default {
    common: {},
    production: {},
    development: {
        proxy: [
            {
                context: [],
                target: 'http://127.0.0.1:3000',
                bypass(req: any, res: any, proxyOptions: any) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/app.html';
                    }
                },
            },
        ],
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true,
        stats: 'minimal',
    },
};

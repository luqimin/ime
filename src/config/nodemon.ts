/**
 * nodemon配置信息
 */

export default {
    ignore: ['test/*', 'public/*', 'log/*'],
    verbose: true,
    env: {
        NODE_ENV: 'development',
        DEBUG: 'sinba,log*',
    },
    ext: 'js,json,ejs',
};

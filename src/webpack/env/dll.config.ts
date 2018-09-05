/**
 * webpack dllPlugin配置
 */
import * as webpack from 'webpack';

import vendors from './vendors';
import Optimization from './optimization';

import { Env, resolve, initEnv, smartEnv } from './env';

// 配置需要加入vendor中的包
export default (cwd: string): webpack.Configuration => {
    initEnv(cwd);

    return {
        context: cwd,
        mode: Env.isProductuction ? 'production' : 'development',
        devtool: false,
        entry: { vendor: vendors },
        output: {
            path: resolve('dist'),
            filename: Env.isProductuction ? '[name].js' : '[name].dev.js',
            library: '[name]',
        },
        optimization: smartEnv(Optimization),
        plugins: [
            new webpack.DllPlugin({
                path: resolve(Env.isProductuction ? 'env/manifest.json' : 'env/manifest.dev.json'),
                name: '[name]',
                context: resolve(''),
            }),
        ],
    };
};

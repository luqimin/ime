/**
 * webpack dllPlugin配置
 */
import * as webpack from 'webpack';
import vendors from './vendors';

import { Env, resolve, initEnv } from './env';

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
            filename: '[name].js',
            library: '[name]',
        },
        plugins: [
            new webpack.DllPlugin({
                path: resolve('env/manifest.json'),
                name: '[name]',
                context: resolve(''),
            }),
        ],
    };
};

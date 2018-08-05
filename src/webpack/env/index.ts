/**
 * 获取webpack配置
 */
import * as path from 'path';
import * as webpack from 'webpack';

import Resolve from './resolve';
import Module from './module';
import Plugins from './plugins';
import DevServer from './devServer';

import { isProductuction, resolve, smartEnv, initEnv } from './env';

export const getConfig = (cwd: string): webpack.Configuration => {
    // 初始化webpack环境
    initEnv(cwd);

    return {
        // 设置webpack上下文为ime安装目录
        context: path.resolve(__dirname, '../../'),

        mode: isProductuction ? 'production' : 'development',
        entry: {
            app: resolve('src/index.jsx'),
        },
        output: {
            path: resolve('dist'),
            filename: '[name].js',
            publicPath: '/dist/',
            chunkFilename: '[name].bundle.js',
            crossOriginLoading: 'anonymous',
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    css: {
                        test: /\.(css|less|sass|scss)$/,
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 4,
                    },
                },
            },
        },
        resolve: smartEnv(Resolve),
        module: smartEnv(Module),
        plugins: smartEnv(Plugins),
        devtool: isProductuction ? false : 'cheap-module-eval-source-map',
        devServer: smartEnv(DevServer),
    };
};

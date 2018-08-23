/**
 * 获取webpack配置
 */
import * as path from 'path';
import * as webpack from 'webpack';

import Output from './output';
import Resolve from './resolve';
import Module from './module';
import Plugins from './plugins';
import Optimization from './optimization';
import DevServer from './devServer';

import { Env, resolve, smartEnv, initEnv } from './env';
import { IMEConfig } from '../../base';

export const getConfig = (
    /**
     * 静态文件项目目录(client)
     */
    cwd: string,
    /**
     * ime配置
     */
    config?: IMEConfig
): webpack.Configuration => {
    // 初始化webpack环境
    initEnv(cwd);

    return {
        // 设置webpack上下文为ime安装目录
        context: path.resolve(__dirname, '../../'),

        mode: Env.isProductuction ? 'production' : 'development',
        entry: {
            app: resolve('src/index.jsx'),
        },
        output: smartEnv(Output, config),
        optimization: smartEnv(Optimization),
        resolve: smartEnv(Resolve),
        module: smartEnv(Module, config),
        plugins: smartEnv(Plugins, config),
        devtool: Env.isProductuction ? false : 'cheap-module-eval-source-map',
        devServer: smartEnv(DevServer),
    };
};

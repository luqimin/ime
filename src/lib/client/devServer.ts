/**
 * 前端本地服务
 */
import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import * as express from 'express';

import Base from './Base';
import { mockStatic } from './mock';
import log from '../../util/log';
import { readFile } from '../../util/readFile';

class DevServer extends Base {
    protected taskRunning() {
        const that = this;
        // webpack compiler
        const entry: webpack.Entry = this.webpackConfig.entry as webpack.Entry;

        // webpack-dev-server配置
        const devOptions: WebpackDevServer.Configuration = Object.assign(
            {
                stats: {
                    colors: true,
                },
                contentBase: this.runtime.clientPath,
                publicPath: '/dist/',

                /**
                 * 添加mock数据接口功能
                 */
                after(app: express.Application): void {
                    app.get(
                        '/:path*',
                        (
                            req: express.Request,
                            res: express.Response,
                            next: express.NextFunction
                        ) => {
                            mockStatic(that, req, res, next);
                        }
                    );
                },
            },
            this.webpackConfig.devServer
        );

        // 覆盖修改webpack的entry配置，增加文件修改页面热更新的功能
        const devServerHost = `http://${devOptions.host}:${devOptions.port}`;
        const formatedEntry: webpack.Entry = {};
        for (const ent in entry) {
            if (entry.hasOwnProperty(ent)) {
                const element = entry[ent];
                if (Array.isArray(element)) {
                    formatedEntry[ent] = [
                        `webpack-dev-server/client?${devServerHost}`,
                        ...element,
                    ];
                } else {
                    formatedEntry[ent] = [
                        `webpack-dev-server/client?${devServerHost}`,
                        element,
                    ];
                }
            }
        }

        const _config: webpack.Configuration = {
            ...this.webpackConfig,
            entry: formatedEntry,
        };

        const compiler: webpack.Compiler = webpack(_config);

        // 给devOptions的proxy(反向代理)添加默认onError配置，默认情况下，如果代理出错，dev将返回本地mock数据
        const proxyOptions: WebpackDevServer.Configuration['proxy'] =
            devOptions.proxy;

        // 目前仅兼容proxy是数组的配置
        if (Array.isArray(proxyOptions)) {
            for (const p of proxyOptions) {
                p.onError =
                    p.onError ||
                    ((err, req: express.Request, res: express.Response) =>
                        mockStatic(that, req, res));
            }
        }

        const server = new WebpackDevServer(compiler, devOptions);
        server.listen(
            devOptions.port as number,
            devOptions.host as string,
            () => {
                log.success(`静态文件本地服务开启: ${devServerHost}`);
            }
        );
    }
}

export default new DevServer();

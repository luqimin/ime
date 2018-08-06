/**
 * 前端本地服务
 */
import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as WebpackDevServer from 'webpack-dev-server';
import * as express from 'express';

import Base from './Base';
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
                before(app: express.Application): void {
                    app.get(
                        '/:path*',
                        (
                            req: express.Request,
                            res: express.Response,
                            next: express.NextFunction
                        ) => {
                            const _path: string = req.params['path'];
                            const _tail: string = req.params['0'];
                            // 不mock静态文件
                            if (_path === 'dist') {
                                next();
                                return;
                            }
                            // mock目录client/mock里面所有json文件，支持多级目录
                            const mockFilePath: string = _tail
                                ? path.join(
                                      that.runtime.clientPath || '',
                                      'mock',
                                      _path,
                                      _tail.endsWith('.json')
                                          ? _tail
                                          : `${_tail}.json`
                                  )
                                : path.join(
                                      that.runtime.clientPath || '',
                                      'mock',
                                      _path.endsWith('.json')
                                          ? _path
                                          : `${_path}.json`
                                  );
                            if (fs.existsSync(mockFilePath)) {
                                res.json(readFile(mockFilePath));
                            } else {
                                next();
                            }
                        }
                    );
                },
            },
            this.webpackConfig.devServer
        );
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

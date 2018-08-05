/**
 * 前端本地服务
 */
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

import Base from './Base';
import log from '@util/log';

class DevServer extends Base {
    protected taskRunning() {
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

/**
 * node服务端任务
 */
import * as path from 'path';
import * as nodemon from 'nodemon';
import { BaseClass } from '../../base';
import log from '../../util/log';
import config from '../../config/nodemon';

class NodemonServer extends BaseClass<any> {
    protected taskRunning() {
        const { serverPath = '' } = this.runtime;

        // 获取node工程入口路径
        const entryPath: string = path.join(serverPath, 'index.js');

        nodemon(Object.assign({ script: entryPath }, config));

        nodemon
            .on('start', () => {
                log.success('Node server 已启动');
            })
            .on('quit', () => {
                log.info('Node server 已退出');
                process.exit();
            })
            .on('restart', (files: any[]) => {
                log.warn(`${files}修改, Node server重启中`);
            });
    }
}

export default new NodemonServer();

/**
 * 将前端编译好的静态文件拷贝到node端public目录
 */
import * as path from 'path';
import * as fs from 'fs-extra';
import { BaseClass } from '../../base';
import log from '../../util/log';
import watch from '../../util/watch';

class WatchDist extends BaseClass<any> {
    protected taskRunning() {
        const { clientPath = '', serverPath = '' } = this.runtime;

        // 前端编译路径
        const distPath: string = path.join(clientPath, 'dist');
        // node public路径
        const publichPath: string = path.join(serverPath, 'public');

        log.success('开始监听client/dist目录, 所有文件将被拷贝到server/public');

        fs.ensureDirSync(distPath);
        fs.ensureDirSync(publichPath);

        // 监听dist目录
        watch({ directories: [distPath] }, (filePath: string) => {
            log.debug(`文件有变动: ${filePath}`);
            const relPath: string = path.relative(clientPath, filePath);
            const publicDistPath: string = path.resolve(publichPath, relPath);
            fs.copy(filePath, publicDistPath, (err) => {
                if (err) {
                    log.error(err.message);
                } else {
                    log.debug(`生成文件: ${publicDistPath}`);
                }
            });
        });
    }
}

export default new WatchDist();

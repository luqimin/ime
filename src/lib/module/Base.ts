/**
 * 新建模块
 */
import * as fs from 'fs-extra';
import * as path from 'path';
import { BaseClass } from '../../base';

import download from './download';

import log from '../../util/log';

export default class ModuleBase extends BaseClass<any> {
    /**
     * 模板目录
     */
    protected templatePath: string = path.resolve(
        __dirname,
        '../../default_template'
    );

    /**
     * 模板版本（时间戳）路径
     */
    protected templateVersionFile: string = path.resolve(
        this.templatePath,
        'version'
    );

    /**
     * controller example路径
     */
    protected controllerPath: string = path.resolve(
        this.templatePath,
        'server/app/controller/example.js'
    );

    /**
     * service example路径
     */
    protected servicePath: string = path.resolve(
        this.templatePath,
        'server/app/service/example.js'
    );

    protected async configInited() {
        // 查看本地默认模板版本及是否有效，如果失效，则更新最新模板文件
        if (!fs.existsSync(this.templatePath)) {
            await download(this.templatePath, this.templateVersionFile);
            return;
        }

        const version = fs.readFileSync(this.templateVersionFile, 'utf8');
        const now: number = new Date().getTime();
        const duration: number = now - Number(version);

        // 如果超过一周，则更新模板
        if (!version || duration > 7 * 24 * 60 * 60 * 1000) {
            log.warn('开始更新模板文件');
            await download(this.templatePath, this.templateVersionFile);
        }
    }
}

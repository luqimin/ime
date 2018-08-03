import * as fs from 'fs';
import * as path from 'path';
import * as download from 'download-git-repo';

import { demoUrl } from '../../config/git';
import log from '../../util/log';

const newProject = (project: string): void => {
    const successLog = () => {
        log.success(`项目 ${project} 创建成功`);
    };

    if (!project) {
        log.error('请输入需要创建的目录名');
        return;
    }
    const dest = path.resolve(process.cwd(), project);

    if (fs.existsSync(dest)) {
        log.error(`当前目录下已存在 ${project} 目录`);
        return;
    }

    download(demoUrl, dest, { clone: true }, (error: any) => {
        if (error) {
            log.error(
                `项目 ${project} 创建失败, 联系管理员吧: ${error.message.trim()}`
            );
        } else {
            successLog();
        }
    });
};

export default newProject;

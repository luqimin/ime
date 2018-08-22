import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as download from 'download-git-repo';
import chalk from 'chalk';

import install from '../../util/install';
import { demoUrl } from '../../config/git';
import log from '../../util/log';
import spin from '../../util/spin';
import { readFile } from '../../util/readFile';

// download promisify化
download[util.promisify.custom] = (
    _demoUrl: string,
    _dest: string,
    option: { [key: string]: any }
) => {
    return new Promise((resolve, reject) => {
        download(_demoUrl, _dest, option, (error: any) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};
const asyncDownload = util.promisify(download);

const newProject = async (
    project: string,
    templatePath?: string
): Promise<void> => {
    if (!project) {
        log.error('请输入需要创建的目录名');
        return;
    }

    // templatePath为获取远程模板，其值即为模板存放位置
    const dest = templatePath || path.resolve(process.cwd(), project);

    if (fs.existsSync(dest) && !templatePath) {
        log.error(`当前目录下已存在 ${project} 目录`);
        return;
    }

    const downloadSpin = spin(
        templatePath ? '正在获取最新模板...' : '正在新建项目...'
    );
    downloadSpin.start();

    try {
        await asyncDownload(demoUrl, dest, { clone: true });
        downloadSpin.stop();

        // 如果是获取模板文件，则不安装依赖
        if (templatePath) {
            return;
        }

        // 前端路径
        const clientPath: string = path.join(dest, 'client');
        // node路径
        const serverPath: string = path.join(dest, 'server');

        try {
            // 安装client依赖
            log.info('安装client依赖... \n');
            const clientPackage: { [key: string]: any } = readFile(
                path.join(clientPath, 'package.json')
            );
            const clientDependencies: string[] = Object.keys(
                Object.assign(
                    clientPackage.dependencies,
                    clientPackage.devDependencies
                )
            );
            await install(clientPath, clientDependencies);

            // 安装server依赖
            log.info('安装server依赖... \n');
            const serverPackage: { [key: string]: any } = readFile(
                path.join(serverPath, 'package.json')
            );
            const serverDependencies: string[] = Object.keys(
                Object.assign(
                    serverPackage.dependencies,
                    serverPackage.devDependencies
                )
            );
            await install(serverPath, serverDependencies);
        } catch (error) {
            log.error(`安装依赖失败: ${error.message}`);
        }

        log.success(`项目 ${project} 初始化成功, 你现在可以:`);
        console.log('\n    $ ' + chalk.cyan(`cd ${project}`));
        console.log(chalk.gray(`    # 进入${project}目录`));
        console.log('\n    $ ' + chalk.cyan('i build dll'));
        console.log(chalk.gray('    # 编译 js dll 文件'));
        console.log('\n    $ ' + chalk.cyan('i start'));
        console.log(chalk.gray('    # 开启本地开发模式'));
        console.log('\n    $ ' + chalk.cyan('i build'));
        console.log(chalk.gray('    # 编译本地静态文件'));
        console.log('\n');
    } catch (error) {
        log.error(`项目 ${project} 创建失败, 联系管理员吧: ${error.message.trim()}`);
        throw error;
    }
};

export default newProject;

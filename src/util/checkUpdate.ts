/**
 * 查询升级信息
 */
import { localVersion, getRemoteVersion } from './version';
import log from './log';
import chalk from 'chalk';

export default async () => {
    try {
        // 最新版本号
        const remoteVersion: string | null = await getRemoteVersion();

        // 是否有更新版本
        const _l: string = localVersion.trim(),
            _r: string = remoteVersion ? remoteVersion.trim() : '0.0.0';
        const hasNewVersion: boolean = _r > _l;

        if (hasNewVersion) {
            console.log('\n');
            console.log(chalk.red('    ****************************************'));
            console.log(chalk.greenBright('                    更新提醒'));
            console.log('');
            console.log(chalk.greenBright(`      最新版本: ${_r}`));
            console.log(chalk.yellow(`      当前版本: ${_l}`));
            console.log(chalk.red('                                         '));
            console.log(chalk.gray('      更新方法: npm i -g ime'));
            console.log(chalk.gray('      查看更新日志: http://dwz.cn/dsIlejoP'));
            console.log('');
            console.log(chalk.red('    ****************************************'));
            console.log('\n');
        }
    } catch (error) {
        log.debug(error.message);
    }
};

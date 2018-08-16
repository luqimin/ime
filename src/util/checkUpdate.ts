/**
 * 查询升级信息
 */
import * as updateNotifier from 'update-notifier';
import chalk from 'chalk';
import * as pkg from '../package.json';

export default () => {
    const notifier = updateNotifier({
        pkg,
        // 检查更新间隔时间(秒)
        updateCheckInterval: 60 * 60 * 1000,
    });

    // 如果有新版本
    if (notifier.update && notifier.update.latest !== pkg.version) {
        const updateInfo: updateNotifier.UpdateInfo = notifier.update;

        // 更新类型
        let type: string = updateInfo.type;
        switch (type) {
            case 'major':
                type = chalk.red(type);
                break;
            case 'minor':
                type = chalk.yellow(type);
                break;
            case 'patch':
                type = chalk.green(type);
                break;
        }
        // 更新日志
        const changelog = `${chalk.yellow('更新日志:')} ${chalk.cyan(
            'http://dwz.cn/dsIlejoP'
        )}`;
        // 老版本号
        const old = updateInfo.current;
        // 新版本号
        const latest = updateInfo.latest;

        notifier.notify({
            message:
                `${pkg.name} 有新 ${type} 版本! ` +
                `${chalk.gray(old)} → ${chalk.greenBright(latest)}\n` +
                `${changelog}\n` +
                `运行 ${chalk.green(`npm i -g ${pkg.name}`)} 进行更新!`,
            defer: true,
            isGlobal: true,
        });
    }
};

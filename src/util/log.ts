/**
 * repl日志封装
 */
import chalk from 'chalk';
import getTime from './time';

const prefix = (): string => {
    return chalk.magenta(`[${getTime()}]`) + chalk.blue(`[ime] `);
};

const doLog = {
    info(text: string): void {
        console.log(prefix() + chalk.cyan(text));
    },
    success(text: string): void {
        console.log(prefix() + chalk.greenBright(text));
    },
    warn(text: string): void {
        console.log(prefix() + chalk.yellow(text));
    },
    error(text: string): void {
        console.log(prefix() + chalk.red(text));
    },
};

export default doLog;
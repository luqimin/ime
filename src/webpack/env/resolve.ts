import * as path from 'path';
import * as fs from 'fs-extra';
import { resolve } from './env';

export default () => {
    // 只能计算alias
    const alias: { [key: string]: string } = {};

    try {
        // 获取src下面所有目录
        const clientSrc: string = resolve('src');
        const paths: string[] = fs.readdirSync(clientSrc);
        const dirs = paths.filter((dir) => {
            const wholePath = path.resolve(clientSrc, dir);
            if (dir.startsWith('.')) {
                return false;
            }
            return fs.statSync(wholePath).isDirectory();
        });

        for (const name of dirs) {
            alias[`@${name}`] = resolve('src', name);
        }
    } catch (error) {
        throw error;
    }

    return {
        common: {
            alias,
            extensions: ['.js', '.jsx', '.less', '.css'],
        },
        production: {},
        development: {},
    };
};

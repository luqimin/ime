/**
 * 获取ime版本号
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const timeout = (time: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

export { version as localVersion } from '../package.json';

export const getRemoteVersion = async (): Promise<string | null> => {
    try {
        const res = await Promise.race([
            execAsync('npm view ime version', {
                encoding: 'utf8',
            }),
            timeout(3000),
        ]);

        if (res && res.stderr) {
            return null;
        }

        return (res && res.stdout) || null;
    } catch (error) {
        return null;
    }
};

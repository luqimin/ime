/**
 * 获取项目根目录路径
 */

import * as path from 'path';
import * as fs from 'fs-extra';

import * as webpack from 'webpack';

import { readFile } from '@util/readFile';
import log from '@util/log';
import { configNames } from '@config/const';

/**
 * IME配置项
 */
export interface IMEConfig {
    /**
     * 是否开启调试模式
     */
    debug?: boolean;

    /**
     * webpack配置
     */
    webpack?: webpack.Configuration;

    /**
     * webpack dll配置
     */
    dll?: webpack.Configuration;

    /**
     * nodemon配置
     */
    nodemon?: {
        script?: string;
        watch?: string[];
        ignore?: string[];
        verbose?: boolean;
        env?: { [key: string]: string };
        ext?: string;
        stdout?: boolean;
    };
}

export interface Root {
    path?: string;
    clientPath?: string;
    serverPath?: string;
    config?: IMEConfig;
}

/**
 * 配置缓存
 */
let _rootCache: Root;

/**
 * 获取配置文件
 * @param curPath - 目录
 */
const getConfig = (curPath: string): IMEConfig | undefined => {
    let projectConfig: IMEConfig | undefined;
    const currentFiles: string[] = fs.readdirSync(curPath);

    for (const file of currentFiles) {
        if (configNames.includes(file)) {
            projectConfig = readFile(path.resolve(curPath, file));
            return projectConfig;
        }
    }
    return projectConfig;
};

/**
 * 递归查找根目录
 * @param curPath - 当前目录
 * @param cb - 回调函数
 */
const findConfigFile = (curPath: string, cb: (res?: Root) => void): void => {
    if (!curPath || curPath === '/' || curPath.length < 5) {
        cb();
    }
    const curConfig = getConfig(curPath);
    if (curConfig) {
        const _cache: Root = {
            path: curPath,
            config: curConfig,
            clientPath: path.resolve(curPath, 'client'),
            serverPath: path.resolve(curPath, 'server'),
        };
        // 存入缓存
        _rootCache = _cache;
        cb(_cache);
    } else {
        findConfigFile(path.resolve(curPath, '../'), cb);
    }
};

export const getRootConfig = (): Promise<Root> | Root => {
    if (_rootCache) {
        return _rootCache;
    }

    const promise: Promise<Root> = new Promise((resolve, reject) => {
        const currentDir: string = process.cwd();
        findConfigFile(currentDir, (res) => {
            if (res) {
                resolve(res);
            } else {
                resolve({});
                log.error('找不到ime配置文件');
                process.exit(3);
            }
        });
    });

    return promise;
};

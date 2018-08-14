/**
 * 静态文件mock功能
 */
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as express from 'express';
import * as pathToRegexp from 'path-to-regexp';
import { readFile } from '../../util/readFile';
import Base from './Base';

export const mockStatic = (
    /**
     * ime任务
     */
    task: Base,
    /**
     * express Request
     */
    req: express.Request,
    /**
     * express Response
     */
    res: express.Response,
    /**
     * express next方法
     */
    next?: express.NextFunction
) => {
    const { pathname } = url.parse(req.url);

    if (!pathname) {
        next && next();
        return;
    }

    const pathReg: RegExp = pathToRegexp('/:path+');
    const keys: string[] | null = pathReg.exec(pathname);

    if (!keys) {
        next && next();
        return;
    }

    const _path = keys[1];

    // 不mock静态文件
    if (_path === 'dist') {
        next && next();
        return;
    }
    // mock目录client/mock里面所有json文件，支持多级目录
    const mockFilePath: string = path.join(
        task.runtime.clientPath || '',
        'mock',
        _path.endsWith('.json') ? _path : `${_path}.json`
    );
    if (fs.existsSync(mockFilePath)) {
        res.json(readFile(mockFilePath));
    } else {
        next && next();
    }
};

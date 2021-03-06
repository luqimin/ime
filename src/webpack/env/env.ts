import * as path from 'path';
import * as assert from 'assert';
import * as extend from 'extend';

let cwd: string = '';
export const initEnv = (_cwd: string): void => {
    cwd = _cwd;
};

export const Env = {
    // 当前node环境
    get env(): string {
        return process.env.NODE_ENV || 'development';
    },
    // 是否生产环境
    get isProductuction(): boolean {
        return this.env === 'production';
    },
    // 是否开发环境
    get isDevelopment(): boolean {
        return this.env === 'development';
    },
};

export interface EnvObject {
    common: object | any[];
    production: object | any[];
    development: object | any[];
    [env: string]: object | any[];
}

/**
 * 是否函数
 */
const isFunction = (f: any): boolean => {
    return typeof f === 'function';
};

/**
 * 是否数组
 */
const isArray = (a: any): boolean => {
    return Array.isArray(a);
};

/**
 * 是否对象
 */
const isObject = (o: any): boolean => {
    return Object.prototype.toString.call(o) === '[object Object]';
};

/**
 * 是否数组或对象
 */
const isArrayOrObject = (o: any): boolean => {
    return isObject(o) || isArray(o);
};

/**
 * 获取resove后的路径
 * @param modulePath - 配置路径
 */
export const resolve = (...paths: string[]): string => {
    return path.join(cwd, ...paths);
};

/**
 * 获取webpack单项配置
 * @param smartObject - webpack配置项
 * @param config - ime配置项
 */
export const smartEnv = (smartObject: ((config?: any) => EnvObject) | EnvObject, config?: any): any => {
    assert(isObject(smartObject) || isFunction(smartObject), '配置内容必须是Object');

    let configObject: any;

    // 对smartObject是对象还是函数做一个兼容
    if (typeof smartObject === 'function') {
        configObject = smartObject(config);
    } else {
        configObject = smartObject;
    }

    const common = configObject.common;
    const production = configObject.production;
    const development = configObject.development;

    assert(
        isArrayOrObject(common) && isArrayOrObject(production) && isArrayOrObject(development),
        '配置项比如是数组或对象'
    );

    if (Array.isArray(common)) {
        return common.concat(configObject[Env.env]);
    } else {
        return extend({}, common, configObject[Env.env]);
    }
};

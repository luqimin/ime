/**
 * 获取webpack配置
 */

import * as webpack from 'webpack';

import { getConfig } from './env';
import { IMEConfig } from '../base';
import getWebpackDllConfig from './env/dll.config';

let _configCache: webpack.Configuration;

export const getWebpackConfig = (
    cwd: string = '',
    config?: IMEConfig
): webpack.Configuration => {
    if (_configCache) {
        return _configCache;
    }
    return (_configCache = getConfig(cwd, config));
};

export const getDllConfig = (cwd: string = ''): webpack.Configuration => {
    return getWebpackDllConfig(cwd);
};

export default getWebpackConfig;

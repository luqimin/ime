/**
 * 获取入口js/css文件版本号
 */
import { IMEConfig } from '../../base';

export const getVersion = (config: IMEConfig) => {
    return config.version ? config.version : '[hash:4]';
};

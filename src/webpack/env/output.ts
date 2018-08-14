import { resolve } from './env';
import { getVersion } from './version';

import { IMEConfig } from '../../base';

export default (config: IMEConfig) => {
    return {
        common: {
            path: resolve('dist'),
            publicPath: '/dist/',
            crossOriginLoading: 'anonymous',
        },
        production: {
            filename: `[name].${getVersion(config)}.js`,
            chunkFilename: '[name].[chunkhash:4].js',
        },
        development: {
            filename: '[name].js',
            chunkFilename: '[name].ime.js',
        },
    };
};

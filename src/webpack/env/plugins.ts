import * as fs from 'fs';
import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from './env';
import { getVersion } from './version';
import { IMEConfig } from '../../base';

export default (config: IMEConfig) => {
    const common = [
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /^\.\/zh-cn$/
        ),
        new webpack.BannerPlugin({
            banner: `updated by ime in ${new Date().toLocaleString()}`,
            entryOnly: true,
        }),
    ];

    if (fs.existsSync(resolve('env/manifest.json'))) {
        common.push(
            new webpack.DllReferencePlugin({
                context: resolve(''),
                manifest: require(resolve('env/manifest.json')),
            })
        );
    }

    return {
        common,
        production: [
            new MiniCssExtractPlugin({
                filename: `[name].${getVersion(config)}.css`,
                chunkFilename: '[name].[chunkhash:4].css',
            }),
        ],
        development: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].ime.css',
            }),
        ],
    };
};

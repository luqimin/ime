import * as fs from 'fs';
import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from './env';

const common = [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/zh-cn$/),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[chunkhash:3].css',
    }),
    new webpack.BannerPlugin({
        banner: `updated: ${new Date().toLocaleString()}`,
        entryOnly: true,
    }),
];

export default () => {
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
        production: [],
        development: [],
    };
};

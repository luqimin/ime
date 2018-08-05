import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolve } from './env';
import lessTheme from './lessTheme';
import postcssPlugins from './postcss';
import babelConfig from './babel';

export default () => {
    const common = {
        rules: [
            {
                test: /\.(less|css)$/,
                include: [resolve('src')],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName:
                                '[path][name]__[local]___[hash:base64:3]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: postcssPlugins,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true },
                    },
                ],
            },
            {
                test: /\.(less|css)$/,
                exclude: [resolve('src')],
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: postcssPlugins,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: lessTheme,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]',
                ],
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: { loader: 'babel-loader', options: babelConfig },
            },
        ],
    };

    return {
        common,
        production: {},
        development: {},
    };
};

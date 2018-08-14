import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
    common: {
        splitChunks: {
            cacheGroups: {
                css: {
                    test: /\.(css|less|sass|scss)$/,
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 4,
                },
            },
        },
    },
    production: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: /^!.+ime.+/,
                    },
                },
            }),
        ],
    },
    development: {},
};

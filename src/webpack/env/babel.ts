/**
 * 获取babel配置
 */

import * as path from 'path';
import * as presetsEnv from 'babel-preset-env';
import * as presetsReact from 'babel-preset-react';
import * as runtimePlugin from 'babel-plugin-transform-runtime';
import * as importPlugin from 'babel-plugin-import';
import * as syntaxDyamicImportPlugin from 'babel-plugin-syntax-dynamic-import';
import * as restSpreadPlugin from 'babel-plugin-transform-object-rest-spread';

import * as decoratorsPlugin from 'babel-plugin-transform-decorators-legacy';
import * as classPropertiesPlugin from 'babel-plugin-transform-class-properties';
import * as regeneratorPlugin from 'babel-plugin-transform-regenerator';

import { browsers } from '../../config/const';

const babelRuntimePath = path.resolve(
    __dirname,
    '../../node_modules/babel-runtime'
);

export default {
    presets: [
        [
            presetsEnv,
            {
                useBuiltIns: 'usage',
                modules: false,
                targets: {
                    browsers,
                },
            },
        ],
        presetsReact,
    ],
    plugins: [
        [
            runtimePlugin,
            {
                moduleName: babelRuntimePath,
            },
        ],
        [
            importPlugin.default,
            {
                libraryName: 'antd',
                style: true,
            },
        ],
        decoratorsPlugin.default,
        classPropertiesPlugin,
        [regeneratorPlugin, { asyncGenerators: false }],
        syntaxDyamicImportPlugin,
        restSpreadPlugin,
    ],
};

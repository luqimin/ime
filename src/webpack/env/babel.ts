/**
 * 获取babel配置
 */

import * as path from 'path';
import * as presetsEnv from '@babel/preset-env';
import * as presetsReact from '@babel/preset-react';
import * as runtimePlugin from '@babel/plugin-transform-runtime';
import * as importPlugin from 'babel-plugin-import';
import * as syntaxDyamicImportPlugin from '@babel/plugin-syntax-dynamic-import';
import * as restSpreadPlugin from '@babel/plugin-proposal-object-rest-spread';

import * as decoratorsPlugin from '@babel/plugin-proposal-decorators';
import * as classPropertiesPlugin from '@babel/plugin-proposal-class-properties';
import * as regeneratorPlugin from '@babel/plugin-transform-regenerator';

import { browsers } from '../../config/const';

const babelRuntimePath = path.resolve(__dirname, '../../node_modules/@babel/runtime');

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
                absoluteRuntime: babelRuntimePath,
            },
        ],
        [
            importPlugin,
            {
                libraryName: 'antd',
                style: true,
            },
            'antd',
        ],
        [
            importPlugin,
            {
                libraryName: 'ant-design-pro',
                libraryDirectory: 'lib',
                style: true,
                camel2DashComponentName: false,
            },
            'ant-design-pro',
        ],
        [
            importPlugin,
            {
                libraryName: 'lodash',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lodash',
        ],
        [decoratorsPlugin, { legacy: true }],
        [classPropertiesPlugin, { loose: true }],
        [regeneratorPlugin, { asyncGenerators: false }],
        syntaxDyamicImportPlugin,
        restSpreadPlugin,
    ],
};

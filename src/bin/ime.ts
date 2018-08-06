#!/usr/bin/env node

import * as program from 'commander';
import chalk from 'chalk';

import { localVersion } from '../util/version';
import newProject from '../lib/new';
import {
    devServer,
    buildClient,
    buildWebpackDll,
    watchClient,
} from '../lib/client';
import { nodeServer } from '../lib/server';
import { distBridge } from '../lib/bridge';

program
    .version(localVersion)
    .option(
        '-e, --env [env]',
        '设置 NODE_ENV 环境变量 production/development, 可简写首字母'
    );

program
    .command('new <project>')
    .description('创建一个ime项目')
    .action(
        (project: string): void => {
            // 设置项目名
            newProject(project);
        }
    );

program
    .command('start [type]')
    .description('开启本地服务')
    .action(
        (type: string): void => {
            // 设置环境变量
            switch (program.env) {
                case 'd':
                case 'development':
                    process.env.NODE_ENV = 'development';
                    break;
                case 'p':
                case 'production':
                    process.env.NODE_ENV = 'production';
                    break;
                default:
                    process.env.NODE_ENV = 'development';
                    break;
            }

            if (['client', 'c', 'fe', 'front'].includes(type)) {
                // 开启 webpack dev server
                devServer.run();
            } else if (['server', 's', 'be', 'back', 'node'].includes(type)) {
                // 开启 nodemon server
                nodeServer.run();
                // 开启静态文件watch和dist拷贝服务
                watchClient.run();
                distBridge.run();
            } else {
                // 同时启动前后端server
                devServer.run();
                nodeServer.run();
            }
        }
    );

program
    .command('build [dll]')
    .description('打包前端文件')
    .action(
        (dll: string): void => {
            // 设置环境变量
            switch (program.env) {
                case 'd':
                case 'development':
                    process.env.NODE_ENV = 'development';
                    break;
                case 'p':
                case 'production':
                    process.env.NODE_ENV = 'production';
                    break;
                default:
                    process.env.NODE_ENV = 'development';
                    break;
            }

            if (dll === 'dll') {
                buildWebpackDll.run();
            } else {
                buildClient.run();
            }
        }
    );

program.on('--help', () => {
    console.log('\n  IME 命令说明:');

    console.log('\n    $ i new <project>');
    console.log(
        chalk.gray('    # 在当前目录创建 <project> 文件夹并初始化项目')
    );

    console.log('\n    $ i start [type]');
    console.log(
        chalk.gray(
            '    # 开启本地开发模式，type为client开启前端文件服务，为server开启node服务，不设置均开启'
        )
    );

    console.log('\n    $ i build [dll]');
    console.log(
        chalk.gray('    # i build 打包前端静态文件, i build dll 打包dll文件')
    );

    console.log('\n');
});

// 命令敲错则直接显示帮助信息
(function activeHelp() {
    program.parse(process.argv);
    if (program.args.length < 1) {
        return program.help();
    }
})();

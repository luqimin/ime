#!/usr/bin/env node

import * as program from 'commander';
import chalk from 'chalk';

import newProject from '../lib/new';
import { localVersion } from '../util/version';

program.version(localVersion);

program
    .command('new <project>')
    .description('创建一个ime项目')
    .action(
        (project: string): void => {
            // 设置项目名
            newProject(project);
        }
    );

program.on('--help', () => {
    console.log('\n\n  > IME 命令说明:');
    console.log('\n    $ i new <project>');
    console.log(
        chalk.gray('    # 在当前目录创建 <project> 文件夹并初始化项目')
    );

    console.log('\n    $ i new <project>');
    console.log(
        chalk.gray('    # 在当前目录创建 <project> 文件夹并初始化项目')
    );

    console.log('\n    $ i new <project>');
    console.log(
        chalk.gray('    # 在当前目录创建 <project> 文件夹并初始化项目')
    );

    console.log('\n    $ i new <project>');
    console.log(
        chalk.gray('    # 在当前目录创建 <project> 文件夹并初始化项目')
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

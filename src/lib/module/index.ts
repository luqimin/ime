import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';
import chalk from 'chalk';

import ModuleBase from './Base';
import log from '../../util/log';

interface ModuleIF {
    module?: string;
    controller?: string;
    service?: string;
}

class ModuleFather extends ModuleBase {
    protected taskRunning() {
        const { module, controller, service } = this.params as ModuleIF;

        if (module) {
            this.controller(module);
            this.service(module);
            return;
        }

        if (controller) {
            this.controller(controller);
            return;
        }

        if (service) {
            this.service(service);
        }
    }

    // 创建新的controller
    private async controller(name: string) {
        // name最小化
        name = name.toLocaleLowerCase();

        const serverPath: string | undefined = this.runtime.serverPath;

        if (!serverPath) {
            log.error('ime找不到项目server目录');
            return;
        }

        const controllerDir: string = path.resolve(
            serverPath,
            'app/controller'
        );
        // 目标controller路径
        const controllerFilepath: string = path.resolve(
            controllerDir,
            `${name}.js`
        );

        if (fs.existsSync(controllerFilepath)) {
            log.error(
                `${controllerDir} 内已存在文件${name}.js, 请更换controller名`
            );
            return;
        }

        // 获取controller文件内容
        let controller: string = await fs.readFile(this.controllerPath, 'utf8');
        controller = _.replace(
            controller,
            /example/g,
            name.toLocaleLowerCase()
        );
        controller = _.replace(controller, /Example/g, _.capitalize(name));

        // 写入文件
        fs.writeFileSync(controllerFilepath, controller, 'utf8');
        log.success(
            `controller 创建成功: ${name} \n` +
                `                ${chalk.yellow('controller 调用举例:')}` +
                ` ${chalk.grey(
                    `router.post('/any/path', controller.${name}.demo);`
                )}`
        );
    }

    // 创建新的service
    private async service(name: string) {
        // name最小化
        name = name.toLocaleLowerCase();

        const serverPath: string | undefined = this.runtime.serverPath;

        if (!serverPath) {
            log.error('ime找不到项目server目录');
            return;
        }

        const serviceDir: string = path.resolve(serverPath, 'app/service');
        // 目标service路径
        const serviceFilepath: string = path.resolve(serviceDir, `${name}.js`);

        if (fs.existsSync(serviceFilepath)) {
            log.error(`${serviceDir} 内已存在文件${name}.js, 请更换service名`);
            return;
        }

        //  获取service文件内容
        let service: string = await fs.readFile(this.servicePath, 'utf8');
        service = _.replace(service, /example/g, name.toLocaleLowerCase());
        service = _.replace(service, /Example/g, _.capitalize(name));

        // 写入文件
        fs.writeFileSync(serviceFilepath, service, 'utf8');
        log.success(
            `service 创建成功: ${name} \n` +
                `                ${chalk.yellow('service 调用举例:')}` +
                ` ${chalk.grey(
                    `const data = await ctx.service.${name}.demo();`
                )}`
        );
    }
}

export default (params: any) => {
    return new ModuleFather(params);
};

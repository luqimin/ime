/**
 * 前端任务
 */
import * as webpack from 'webpack';
import * as extend from 'extend';
import { BaseClass } from '../../base';
import { getWebpackConfig, getDllConfig } from '../../webpack';

export default class ClientBase extends BaseClass<any> {
    public webpackConfig: webpack.Configuration = {};
    public dllConfig: webpack.Configuration = {};

    protected configInited() {
        // 合并默认配置和项目配置
        this.webpackConfig = extend(
            true,
            getWebpackConfig(this.runtime.clientPath),
            this.runtime.config && this.runtime.config.webpack
        );
        this.dllConfig = extend(
            true,
            getDllConfig(this.runtime.clientPath),
            this.runtime.config && this.runtime.config.dll
        );
    }
}

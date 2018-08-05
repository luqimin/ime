/**
 * 前端任务
 */
import * as webpack from 'webpack';
import { BaseClass } from '../../base';
import { getWebpackConfig, getDllConfig } from '../../webpack';

export default class ClientBase extends BaseClass<any> {
    public webpackConfig: webpack.Configuration = {};
    public dllConfig: webpack.Configuration = {};

    protected configInited() {
        this.webpackConfig = getWebpackConfig(this.runtime.clientPath);
        this.dllConfig = getDllConfig(this.runtime.clientPath);
    }
}

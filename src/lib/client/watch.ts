/**
 * 监听并编译文件
 */
import * as webpack from 'webpack';

import Base from './Base';
import log from '../../util/log';

class Watch extends Base {
    protected taskRunning() {
        // webpack compiler
        const compiler: webpack.Compiler = webpack(this.webpackConfig);

        log.success('开始监听client文件...');
        compiler.watch({}, (_err, stats) => {
            console.log(
                'webpack打包结果\n' +
                    stats.toString({
                        hash: false,
                        chunks: false,
                        colors: true,
                        children: false,
                        modules: false,
                    })
            );
        });
    }
}

export default new Watch();

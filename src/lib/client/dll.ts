/**
 * 编译 webpack dll 文件
 */
import * as webpack from 'webpack';

import Base from './Base';

class BuildDll extends Base {
    protected taskRunning() {
        // webpack compiler
        const compiler: webpack.Compiler = webpack(this.dllConfig);

        compiler.run((_err, stats) => {
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

export default new BuildDll();

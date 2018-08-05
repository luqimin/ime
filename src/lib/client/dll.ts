/**
 * 编译 webpack dll 文件
 */
import * as webpack from 'webpack';

import Base from './Base';
import spin from '@util/spin';

class BuildDll extends Base {
    protected taskRunning() {
        // webpack compiler
        const compiler: webpack.Compiler = webpack(this.dllConfig);

        const buildSpin = spin('编译 client dll 文件中...');
        buildSpin.start();

        compiler.run((_err, stats) => {
            buildSpin.stop();

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

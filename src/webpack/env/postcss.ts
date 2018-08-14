/**
 * postcss插件
 */
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';

import { Env } from './env';
import { browsers } from '../../config/const';

const postcssPlugins: any[] = [
    autoprefixer({
        browsers,
    }),
];

const getPlugins = () => {
    if (Env.isProductuction) {
        // 生产环境添加css压缩功能
        postcssPlugins.push(
            cssnano({
                preset: ['default', { cssDeclarationSorter: false }],
            })
        );
    }
    return postcssPlugins;
};

export default getPlugins;

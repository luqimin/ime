/**
 * postcss插件
 */
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';

import { isProductuction } from './env';
import { browsers } from '../../config/const';

const postcssPlugins: any[] = [
    autoprefixer({
        browsers,
    }),
];

if (isProductuction) {
    postcssPlugins.push(
        cssnano({
            preset: ['default', { cssDeclarationSorter: false }],
        })
    );
}

export default postcssPlugins;

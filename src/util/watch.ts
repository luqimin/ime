/**
 * 文件及目录变动监听封装
 */

import * as Watchpack from 'watchpack';

const Watch = (
    /**
     * 监听的文件数组或者目录数组
     */
    watchFiles: { files?: string[], directories?: string[] },
    /**
     * Watchpack配置参数
     */
    options?: Watchpack.WatchOptions | ((filePath: string, mtime: number) => any),
    /**
     * 文件change回调函数
     */
    cb?: (filePath: string, mtime: number) => any,
): void => {
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }
    const wp = new Watchpack(Object.assign({ poll: true }, options || {}));
    wp.watch(watchFiles.files || [], watchFiles.directories || [], Date.now() - 10000);
    wp.on("change", (filePath: string, mtime: number) => {
        cb && cb(filePath, mtime);
    });
};

export default Watch;

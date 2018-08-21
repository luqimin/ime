/**
 * 获取最新模板文件，并更新模板版本号（当前时间戳）
 */

import * as fs from 'fs-extra';
import newProject from '../new';

export default async (
    templatePath: string,
    templateVersionFile: string
): Promise<void> => {
    try {
        // 情况模板目录
        await fs.emptyDir(templatePath);

        // 下载模板
        await newProject('default_template', templatePath);

        // 记录模板版本
        const version = new Date().getTime();
        fs.writeFileSync(templateVersionFile, version, 'utf8');
    } catch (error) {
        throw error;
    }
};

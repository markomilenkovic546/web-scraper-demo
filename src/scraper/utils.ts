import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const saveToJsonFile = async <T>(data: T[], filePath: string): Promise<void> => {
    const json = JSON.stringify(data, null, 2);
    const dir = path.dirname(filePath);

    await mkdir(dir, { recursive: true });

    await writeFile(filePath, json, 'utf-8');
};

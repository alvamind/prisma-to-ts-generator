// file-utils.ts
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, promises as fsPromises, existsSync } from 'fs';
import path from 'path';

export const readFile = (filePath: string): string => readFileSync(filePath, 'utf-8');
export const writeFile = (filePath: string, content: string): void => writeFileSync(filePath, content.trim() + '\n');
export const ensureDirExists = (dirPath: string): void => { if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true }); };
export const isDirectory = (filePath: string): boolean => statSync(filePath).isDirectory();
export const getDirFiles = (dirPath: string): string[] => readdirSync(dirPath);
export const getStat = (filePath: string) => statSync(filePath);

export const findFilesByExtension = (dirPath: string, ext: string): string[] => {
    const files = getDirFiles(dirPath);
    return files.reduce<string[]>((acc, file) => {
        const filePath = path.join(dirPath, file);
        if (isDirectory(filePath)) return acc.concat(findFilesByExtension(filePath, ext));
        if (file.endsWith(ext)) return [...acc, filePath];
        return acc;
    }, []);
};

export const findDirectoryByName = async (baseDir: string, dirName: string): Promise<string | null> => {
    try {
        const entries = await fsPromises.readdir(baseDir);
        for (const entry of entries) {
            const fullEntryPath = path.join(baseDir, entry);
            if ((await fsPromises.stat(fullEntryPath)).isDirectory() && entry === dirName) return fullEntryPath;
        }
        return null;
    } catch (error) {
        console.error(`Dir search error '${dirName}' in '${baseDir}': ${error}`);
        return null;
    }
};

export const resolveOutputPath = (outputPath: string): string => path.join(process.cwd(), outputPath);
export const resolveDirPath = (outputPath: string, dirName: string): string => path.join(resolveOutputPath(outputPath), dirName);

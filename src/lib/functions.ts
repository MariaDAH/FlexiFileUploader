import path from "path-browserify";
import {default as fsWithCallbacks} from 'fs'
import {File} from '@/context/interfaces/file'

export const getUniqueValues = (array: any) => (
    array.reduce((accumulator:any, currentValue: any) => (
        accumulator.includes(currentValue) ? accumulator : [...accumulator, currentValue]
    ), [])
)

export const getCountsForEachElement = (array: any) => {
    const counts: any = {};
    array.forEach((x: any) => {
        counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
}

export const getArrayOfRandomColors = (n: number) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colors.push(randomColor);
    }
    return colors;
}

export const getMaxSizesByElement = (array: any) => {

    const groupedByCategory = array.reduce((acc: any, item: any) => {
        const { extension, size } = item;

        if (!acc[extension]) {
            // If category does not exist in accumulator, initialize it
            acc[extension] = size;
        } else {
            // Sum size value to existing one
            acc[extension] += (acc[extension], size);
        }

        return acc;
    }, {});

    console.log(groupedByCategory);

    return groupedByCategory;
}

export const getStatsForDirectoryFile = (filePaths: string[], directoryPath: string) => {
    const fs = fsWithCallbacks.promises;
    const docs: File[] = [];
    filePaths.map(async x => {
        const filePath = path.join(directoryPath, x);
        const stats = await fs.stat(filePath);
        docs.push(
            {
                name: x,
                size: stats.size,
                type: '',
                extension: filePath.split('.').pop() ?? '',
                lastModified: stats.atime,
            }
        );
    });
    return docs;
}
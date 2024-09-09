import * as path from "path";
import * as fs from "fs/promises";
import { File } from "@/context/types";

export const getUniqueValues = (array: any) =>
  array.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator.includes(currentValue)
        ? accumulator
        : [...accumulator, currentValue],
    [],
  );

export const getCountsForEachElement = (array: any) => {
  const counts: any = {};
  array.forEach((x: any) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  return counts;
};

export const getArrayOfRandomColors = (n: number) => {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(randomColor);
  }
  return colors;
};

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
};

export async function getStatsForDirectoryFile(
  filePaths: string[],
  directoryPath: string,
): Promise<File[]> {
  return Promise.all(
    filePaths.map(async (x): Promise<File> => {
      const filePath = path.join(directoryPath, x);
      const stats = await fs.stat(filePath);
      return {
        name: x,
        size: stats.size,
        type: "",
        extension: path.extname(filePath),
        lastModified: stats.atime,
      };
    }),
  );
}

export async function getLocalFileMetadata(filePath: string): Promise<File> {
  const stats = await fs.stat(filePath);
  return {
    name: path.basename(filePath),
    size: stats.size,
    type: "",
    extension: path.extname(filePath),
    lastModified: stats.atime,
  };
}

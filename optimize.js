#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import { mkdir, readdir, lstat } from "fs/promises";
import { optimizeFile } from "./process-images.js";


program
  .name("optimize")
  .description("Reduces the size of a PNG screenshot, and generates WebP alternatives")
;

program
  .description("optimize a single screenshot")
  .argument("<source>", "path of the file or directory")
  .argument("<dest>", "path of the destination directory")
  .option("-w, --widths <pixels...>", "generate additional WebP files with these widths")
  .action(async (source, dest, options) => {
    const sourcePath = path.normalize(source);
    const destinationPath = path.normalize(dest);
    const widths = options.widths? options.widths.map(w => parseInt(w)) : [];

    try {
      await mkdir(destinationPath, { recursive: true });
    } catch (err) {
      console.error('Couldn\'t create destination directory');
    }

    const stat = await lstat(sourcePath);
    if (stat.isFile()) {
      await processFile(sourcePath, widths, destinationPath);
      console.log('Optimizing done!');
      return;
    }

    const files = await readdir(sourcePath);
    for (let file of files) {
      await processFile(`${sourcePath}/${file}`, widths, destinationPath);
    }
    console.log('Optimizing done!');
  })

async function processFile(filePath, widths, destinationPath) {
  const { name, ext } = path.parse(filePath);

  if ('.png' != ext && '.PNG' != ext) {
    console.log(`Skipping ${name}, not a png`);
    return;
  }

  try {
    await optimizeFile(filePath, name, widths, destinationPath);
  } catch(err) {
    console.error(`Error while optimizing ${filePath}`, err);
  }
}

program.parse(process.argv);
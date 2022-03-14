#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import { mkdir, readdir } from "fs/promises";
import { optimizeFile } from "./process-images.js";


program
  .name("optimize")
  .description("Reduces the size of a PNG screenshot, and generates WebP alternatives")
;

program
  .command("file")
  .description("optimize a single screenshot")
  .argument("<file>", "path of the file")
  .argument("<dest>", "path of the destination directory")
  .option("-w, --widths <pixels...>", "generate additional WebP files with these widths")
  .action(async (file, dest, options) => {
    const filePath = path.normalize(file);
    const destinationPath = path.normalize(dest);
    const widths = options.widths? options.widths.map(w => parseInt(w)) : [];

    const { name, ext } = path.parse(filePath);

    if ('.png' != ext && '.PNG' != ext) {
      console.log(`Skipping ${file}, not a png`);
      return;
    }

    try {
      await mkdir(destinationPath, { recursive: true });
      optimizeFile(filePath, name, widths, destinationPath);
    } catch(err) {
      console.error('Generating failed', err);
    }
  })
;

program
  .command("dir")
  .description("optimize all screenshots in a directory")
  .argument("<dir>", "path of the directory")
  .argument("<dest>", "path of the destination directory")
  .option("-w, --widths <pixels...>", "generate additional WebP files with these widths")
  .action(async (dir, dest, options) => {
    const dirPath = path.normalize(dir);
    const destinationPath = path.normalize(dest);
    const widths = options.widths? options.widths.map(w => parseInt(w)) : [];

    await mkdir(destinationPath, { recursive: true });

    try {
      const files = await readdir(dirPath);

      for (let file of files) {
        const ext = path.extname(file);
        if ('.png' != ext && '.PNG' != ext) {
          console.log(`Skipping ${file}, not a png`);
        }
        else {
          await optimizeFile(`${dirPath}/${file}`, file, widths, destinationPath);
        }
      }
    } catch (err) {
      console.error('Generating failed', err);
    }
  })
;

program.parse(process.argv);
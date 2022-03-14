import sharp from "sharp";
import { open } from "fs/promises";

export async function optimizeFile(file, filename, widths, destination) {
  await generatePng(file, filename, destination);
  await generateWebP(file, filename, widths, destination);
}

async function generatePng(file, filename, destination) {
  const inFile = await open(file, 'r');
  const outFile = await open(`${destination}/${filename}.png`, 'w');

  inFile.createReadStream()
      .pipe(sharp()
        .png({ colors: 256 })
      )
      .pipe(outFile.createWriteStream());
}

async function generateWebP(file, filename, widths, destination) {
  for (let width of widths) {
    const inFile = await open(file, 'r');
    const outFile = await open(`${destination}/${filename}-${width}.webp`, 'w');

    inFile.createReadStream()
      .pipe(sharp()
        .webp({ quality: 80 })
        .resize({ width, withoutEnlargement: true })
      )
      .pipe(outFile.createWriteStream());
  };

  const inFile = await open(file, 'r');
  const outFile = await open(`${destination}/${filename}.webp`, 'w');

  inFile.createReadStream()
      .pipe(sharp()
        .webp({ quality: 80 })
      )
      .pipe(outFile.createWriteStream());
}
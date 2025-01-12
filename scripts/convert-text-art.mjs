import {readFile, writeFile} from 'node:fs/promises';

const inputPath = './public/ascii_art.txt';
const outputPath = './src/components/terminal/ascii-art.ts';

const encodingOpts = {encoding: 'utf-8'};

const text = await readFile(inputPath, encodingOpts);

const trimmed = text
  // Remove empty lines from beginning
  .replace(/^(\r?\n)+/, '')
  // Remove whitespace from end
  .trimEnd()
  // Remove whitespace from ends of lines
  .split('\n').map(line => line.trimEnd()).join('\n');

const json = JSON.stringify(trimmed);

const moduleSource = `export default ${json};\n`;

await writeFile(outputPath, moduleSource, encodingOpts);

console.log(`Text art module written to: ${outputPath}`);
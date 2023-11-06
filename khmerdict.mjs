import { transform } from './slugify.js'
import fs from 'node:fs/promises';

const text = await fs.readFile("khmerdict.txt", 'utf8');
const lines = text.split('\n')
	.map(i => i.trim())
	.filter(i => i);

let output = "";

for (const item of lines) {
	output += item + "\t" + [...transform(item)].join("") + "\n";
}

await fs.writeFile("lexicon.tsv", output, 'utf-8');
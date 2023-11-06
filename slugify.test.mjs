import { readFileSync } from 'node:fs';
import { slugify, transform } from './slugify.js';
import { test } from 'node:test';
import { strictEqual } from 'node:assert';

test('simple', () => {
	strictEqual(slugify('មិនដឹងទេ that\'s nice'), "mindoeng-te that's nice");
})

test('fixture', () => {
	const items = readFileSync("lexicon.tsv", 'utf8')
		.split('\n').map(item => item.trim().split('\t'))
		.filter(Boolean)

	for (const item of items) {
		if (!item[0] || !item[1]) continue
		strictEqual([...transform(item[0])].join(""), item[1]);
	}
})

const fs = require('node:fs');
const { slugify, transform } = require('.');
const { test } = require('node:test');
const assert = require('node:assert');

test('simple', () => {
	assert.strictEqual(slugify('មិនដឹងទេ that\'s nice'), "mindoeng-te that's nice");
})

test('fixture', () => {
	const items = fs.readFileSync("lexicon.tsv", 'utf8')
		.split('\n').map(item => item.trim().split('\t'))
		.filter(Boolean)

	for (const item of items) {
		if (!item[0] || !item[1]) continue
		assert.strictEqual([...transform(item[0])].join(""), item[1]);
	}
})

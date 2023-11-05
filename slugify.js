const { split } = require('split-khmer');

const firstSeries = new Set('កខចឆដឋណតថបផឝសហឡអ');
const vowelsDefault = ['a', 'o'];
const consonants = new Map([
	["ក", "k"],
	["ខ", "kh"],
	["គ", "k"],
	["ឃ", "kh"],
	["ង", "ng"],
	["ច", "ch"],
	["ឆ", "chh"],
	["ជ", "ch"],
	["ឈ", "chh"],
	["ញ", "nh"],
	["ដ", "d"],
	["ឋ", "th"],
	["ឌ", "d"],
	["ឍ", "th"],
	["ណ", "n"],
	["ត", "t"],
	["ថ", "th"],
	["ទ", "t"],
	["ធ", "th"],
	["ន", "n"],
	["ប", "b"],
	["ផ", "ph"],
	["ព", "p"],
	["ភ", "ph"],
	["ម", "m"],
	["យ", "y"],
	["រ", "r"],
	["ល", "l"],
	["វ", "v"],
	["ឝ", "sh"],
	["ឞ", "ss"],
	["ស", "s"],
	["ហ", "h"],
	["ឡ", "l"],
	["អ", "a"],
	//
	['ឥ', 'e'],
	['ឦ', 'ei'],
	['ឧ', 'u'],
	['ឩ', 'u'],
	['ឩ', 'au'],
	['ឫ', 'rue'],
	['ឭ', 'lue'],
	['ឭ', 'lue'],
	['ឮ', 'lueu'],
	['ឯ', 'ae'],
	['ឰ', 'ai'],
	['ឲ', 'ao'],
	['ឱ', 'ao'],
	['ឳ', 'au'],
]);

const vowelEntries = [
	['◌់', ['a', 'o']],
	['ា', ['a', 'ea']],
	['ា់', ['a', 'ea']],
	[' ័◌', ['a', 'oa']],
	['ៈ', ['ak', 'eak']],
	['័យ', ['ai', 'ey']],
	['ិ', ['e', 'i']],
	['ី', ['ei', 'i']],
	['ឹ', ['oe', 'ue']],
	['ឺ', ['eu', 'ueu']],
	['ុ', ['o', 'u']],
	['ូ', ['ou', 'u']],
	['ួ', ['uo', 'uo']],
	['ើ', ['aeu', 'eu']],
	['ឿ', ['oea', 'oea']],
	['ៀ', ['ie', 'ie']],
	['េ', ['e', 'e']],
	['ែ', ['ae', 'eae']],
	['ៃ', ['ai', 'ey']],
	['ោ', ['ao', 'ou']],
	['ៅ', ['au', 'ov']],
	['ុំ', ['om', 'um']],
	['ំ', ['am', 'um']],
	['ាំ', ['am', 'oam']],
	['ាំង', ['ang', 'eang']],
	['ះ', ['ah', 'eah']],
	['ិះ', ['eh', 'is']],
	['ឹះ', ['oeh', 'ueh']],
	['ុះ', ['oh', 'uh']],
	['េះ', ['eh', 'eh']],
	['ើះ', ['aeuh', 'euh']],
	['ែះ', ['aeh', 'eaeh']],
	['ោះ', ['aoh', 'uoh']],
].sort((a, b) => {
	return b[0].length - a[0].length
}).map(([k, v]) => [new RegExp(`^${k}`), v])

/**
 * Convert Khmer word into a romanization form
 * @param {string} input 
 * @returns {Generator<string>}
 */
function* transform(input) {
	let pc = null;

	const sindex = () => +!(pc != null && firstSeries.has(pc));

	for (let i = 0; i < input.length; i++) {
		let c = input[i];

		if (/[\s\u200b\u200a]|[^\u1780-\u17dd]/.test(c)) {
			vowelsMatch = null;
			pc = null;
			yield c;
			continue;
		}



		if (consonants.has(c)) {

			if (pc != null) {
				if (i - 2 >= 0) {
					if (consonants.has(input[i - 2])) {
						yield vowelsDefault[sindex()];
					}
				}
			}

			pc = c;
			yield consonants.get(c);
			continue
		}

		for (const [pattern, values] of vowelEntries) {
			const m = pattern.exec(input.slice(i));
			if (!m) continue;
			i += m[0].length - 1;
			const r = values[sindex()];
			yield r
			break
		}

		pc = null;
		// yield c;

	}
}

exports.transform = transform;

/**
 * Convert Khmer text into a romaization representation
 * @param {string} text 
 * @returns {string}
 */
exports.slugify = function (text, delimiter = '-') {
	return split(text)
		.map(word => Array.from(transform(word)).join(""))
		.join(delimiter)
}

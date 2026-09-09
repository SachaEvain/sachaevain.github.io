import assert from 'node:assert/strict';
import { PALETTES } from '../src/lib/palettes.ts';

const luminance = (hex) => {
	const rgb = hex.slice(1).match(/../g).map((channel) => parseInt(channel, 16) / 255)
		.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
	return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05)
	/ (Math.min(luminance(a), luminance(b)) + 0.05);

assert.equal(Object.keys(PALETTES).length, 9);
for (const [name, palette] of Object.entries(PALETTES)) {
	assert.equal(palette.pixels.length, 6, `${name}: six pixel shades`);
	for (const color of [palette.light, palette.hover, palette.dark, palette.glow, ...palette.pixels]) {
		assert.match(color, /^#[0-9A-F]{6}$/, `${name}: valid color`);
	}
	for (const color of [palette.light, palette.hover]) {
		assert.ok(contrast(color, '#F8F8F6') >= 4.5, `${name}: light text contrast`);
	}
	for (const color of [palette.dark, palette.glow]) {
		assert.ok(contrast(color, '#18181A') >= 4.5, `${name}: dark text contrast`);
	}
}
console.log('Nine palettes: valid colors and accessible accent contrast.');

import assert from 'node:assert/strict';
import { rotateRopePair } from '../src/components/posts/purellm/rope.ts';

const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-12);

// Check the frequencies against PureLLM's base=10,000, head_dim=64 formula.
close(rotateRopePair(3, 0)[0], Math.cos(3));
close(rotateRopePair(3, 8)[0], Math.cos(0.3));
for (const pair of [0, 8]) {
	for (const offset of [0, 1, 100, 239]) {
		for (const distance of [0, 3, 16]) {
			const query = rotateRopePair(offset + distance, pair);
			const key = rotateRopePair(offset, pair);
			close(dot(query, query), 1);
			close(dot(query, key), rotateRopePair(distance, pair)[0]);
		}
	}
}
assert.notEqual(rotateRopePair(3, 0)[0], rotateRopePair(4, 0)[0]);
console.log('RoPE frequencies, unit lengths, and common-shift invariance verified.');

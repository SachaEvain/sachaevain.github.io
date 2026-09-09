import assert from 'node:assert/strict';
import { samplingProbabilities } from '../src/components/posts/purellm/sampling.ts';

for (const temperature of [0.2, 1, 2]) {
	for (const k of [1, 2, 3, 4]) {
		const p = samplingProbabilities(temperature, k);
		assert.ok(Math.abs(p.reduce((a, b) => a + b, 0) - 1) < 1e-12);
		assert.equal(p.filter(value => value > 0).length, k);
		assert.equal(p.indexOf(Math.max(...p)), 1);
	}
}
assert.deepEqual(samplingProbabilities(1, 1), [0, 1, 0, 0]);
const topTwo = samplingProbabilities(1, 2);
assert.ok(Math.abs(topTwo[1] - 1 / (1 + Math.exp(-1))) < 1e-12);
assert.equal(topTwo[0], 0);
assert.equal(topTwo[2], 0);
assert.ok(samplingProbabilities(0.2, 4)[1] > samplingProbabilities(2, 4)[1]);
assert.throws(() => samplingProbabilities(0, 4), RangeError);
assert.throws(() => samplingProbabilities(1, 5), RangeError);
console.log('Sampling normalization, temperature, top-k, and token-ID mapping verified.');

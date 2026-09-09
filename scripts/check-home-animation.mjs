import assert from 'node:assert/strict';
import { createAnimationSignals } from '../src/lib/home-animation.ts';

const links = [
	{ from: 0, to: 1, duration: 2, offset: 3, rest: 10 },
	{ from: 1, to: 2, duration: 4, offset: 7, rest: 12 },
	{ from: 2, to: 3, duration: 3, offset: 9, rest: 14 },
];
const independent = createAnimationSignals(links, false);
assert.deepEqual(independent.map(({ start, period, offset }) => [start, period, offset]), [[0, 12, 3], [0, 16, 7], [0, 17, 9]]);
const connected = createAnimationSignals(links, true);
assert.equal(connected.length, 3);
assert.deepEqual(connected.map(({ start, period, offset }) => [start, period, offset]), [[0, 19, 3], [2, 19, 3], [6, 19, 3]]);
for (let i = 1; i < connected.length; i++) {
	assert.equal(connected[i].from, connected[i - 1].to);
	assert.equal(connected[i].start, connected[i - 1].start + connected[i - 1].duration);
}
assert.deepEqual(createAnimationSignals([], true), []);
assert.equal(createAnimationSignals([links[0], { ...links[1], to: 0 }], true).length, 2);
console.log('Independent timing, connected arrivals, empty networks, and cycle termination verified.');

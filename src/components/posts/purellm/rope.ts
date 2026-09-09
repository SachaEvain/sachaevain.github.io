// PureLLM's TinyStories recipe uses 64 coordinates per head and base 10,000.
export function rotateRopePair(position: number, pairIndex: number): [number, number] {
	const angle = position * 10_000 ** (-2 * pairIndex / 64);
	return [Math.cos(angle), Math.sin(angle)];
}

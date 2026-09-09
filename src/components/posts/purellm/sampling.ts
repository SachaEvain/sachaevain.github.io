// Deliberately unsorted toy logits make the mapping back to token IDs visible.
export const samplingLogits = [1, 3, 0, 2];

export function samplingProbabilities(temperature: number, topK: number): number[] {
	if (!Number.isFinite(temperature) || temperature <= 0) throw new RangeError('Temperature must be positive and finite.');
	if (!Number.isInteger(topK) || topK < 1 || topK > samplingLogits.length) throw new RangeError('Top-k must be between 1 and 4.');
	const retained = samplingLogits.map((logit, index) => ({ logit, index }))
		.sort((a, b) => b.logit - a.logit).slice(0, topK);
	const weights = retained.map(({ logit }) => Math.exp((logit - retained[0].logit) / temperature));
	const total = weights.reduce((sum, weight) => sum + weight, 0);
	const probabilities = samplingLogits.map(() => 0);
	retained.forEach(({ index }, rank) => { probabilities[index] = weights[rank] / total; });
	return probabilities;
}

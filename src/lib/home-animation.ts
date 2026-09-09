export type HomeAnimation = 'paths' | 'pixels' | 'both';

export interface AnimationLink {
	from: number;
	to: number;
	offset: number;
	duration: number;
	rest: number;
}

export interface AnimationSignal extends AnimationLink {
	start: number;
	period: number;
}

export function createAnimationSignals(links: AnimationLink[], connected: boolean): AnimationSignal[] {
	if (!connected) {
		return links.map((link) => ({ ...link, start: 0, period: link.duration + link.rest }));
	}

	return links.filter((_, index) => index % 16 === 0).flatMap((first) => {
		const path: AnimationLink[] = [];
		let next: AnimationLink | undefined = first;
		while (next && path.length < 5 && !path.includes(next)) {
			path.push(next);
			const destination: number = next.to;
			next = links.find((link) => link.from === destination);
		}
		const period = path.reduce((total, link) => total + link.duration, first.rest);
		let start = 0;
		return path.map((link) => {
			const signal = { ...link, offset: first.offset, start, period };
			start += link.duration;
			return signal;
		});
	});
}

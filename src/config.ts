import type { HomeAnimation } from './lib/home-animation';

export const SITE = {
	ready: false,
	homeAnimation: 'pixels' satisfies HomeAnimation,
} as const;

import type { Palette } from './lib/palettes';
import type { HomeAnimation } from './lib/home-animation';

export const SITE = {
	ready: false,
	palette: 'mistral' satisfies Palette,
	homeAnimation: 'pixels' satisfies HomeAnimation,
} as const;

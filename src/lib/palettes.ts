export const PALETTES = {
	mistral: { fr: 'Mistral', en: 'Mistral', light: '#C2410C', hover: '#9A3412', dark: '#FA500E', glow: '#FFE4A2', pixels: ['#9F281B', '#D93612', '#FA500E', '#FF7610', '#FF9614', '#FFBD2E'] },
	lime: { fr: 'Lime', en: 'Lime', light: '#4D7C0F', hover: '#3F6212', dark: '#A3E635', glow: '#D9F99D', pixels: ['#365314', '#3F6212', '#65A30D', '#84CC16', '#A3E635', '#D9F99D'] },
	emerald: { fr: 'Émeraude', en: 'Emerald', light: '#047857', hover: '#065F46', dark: '#34D399', glow: '#A7F3D0', pixels: ['#064E3B', '#065F46', '#059669', '#10B981', '#34D399', '#A7F3D0'] },
	petrol: { fr: 'Pétrole', en: 'Petrol', light: '#0E7490', hover: '#155E75', dark: '#22D3EE', glow: '#A5F3FC', pixels: ['#164E63', '#155E75', '#0891B2', '#06B6D4', '#22D3EE', '#A5F3FC'] },
	cobalt: { fr: 'Cobalt', en: 'Cobalt', light: '#1D4ED8', hover: '#1E40AF', dark: '#60A5FA', glow: '#BFDBFE', pixels: ['#1E3A8A', '#1E40AF', '#2563EB', '#3B82F6', '#60A5FA', '#BFDBFE'] },
	plum: { fr: 'Prune', en: 'Plum', light: '#86198F', hover: '#701A75', dark: '#E879F9', glow: '#F5D0FE', pixels: ['#4A044E', '#701A75', '#A21CAF', '#C026D3', '#E879F9', '#F5D0FE'] },
	electric: { fr: 'Bleu électrique', en: 'Electric blue', light: '#2450FF', hover: '#1234C9', dark: '#008CFF', glow: '#35CFFF', pixels: ['#071A78', '#1234C9', '#2450FF', '#006BFF', '#008CFF', '#35CFFF'] },
	azure: { fr: 'Azur laser', en: 'Laser azure', light: '#006BD6', hover: '#0057CD', dark: '#0085FF', glow: '#69E6FF', pixels: ['#002C70', '#0057CD', '#0085FF', '#009DFF', '#00B4FF', '#69E6FF'] },
	ultramarine: { fr: 'Outremer néon', en: 'Neon ultramarine', light: '#433BFF', hover: '#2520BD', dark: '#8070FF', glow: '#AC9AFF', pixels: ['#10105E', '#2520BD', '#433BFF', '#594DFF', '#7161FF', '#AC9AFF'] },
} as const;

export type Palette = keyof typeof PALETTES;

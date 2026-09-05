import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type Project = CollectionEntry<'projects'>;

export async function getLocalizedProjects(locale: Locale): Promise<Project[]> {
	return (await getCollection('projects'))
		.filter((project) => project.data.locale === locale)
		.sort((a, b) => a.data.order - b.data.order);
}

import { getCollection, type CollectionEntry } from 'astro:content';
import { localizedPath, type Locale } from '../i18n';

export type Project = CollectionEntry<'projects'>;

export function projectSlug(project: Project): string {
	return project.id.replace(/\.(md|mdx)$/, '').split('/').slice(1).join('/');
}

export function projectPath(project: Project): string {
	return localizedPath(project.data.locale, `/portfolio/${projectSlug(project)}/`);
}

export async function getLocalizedProjects(locale: Locale): Promise<Project[]> {
	return (await getCollection('projects'))
		.filter((project) => project.data.locale === locale)
		.sort((a, b) => a.data.order - b.data.order);
}

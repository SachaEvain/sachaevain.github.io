import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';
import { localizedPath } from '../i18n';

export type Post = CollectionEntry<'posts'>;

export function postSlug(post: Post): string {
	return post.id.replace(/\.(md|mdx)$/, '').split('/').slice(1).join('/');
}

export function postPath(post: Post): string {
	return localizedPath(post.data.locale, `/blog/${postSlug(post)}/`);
}

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts');
	validatePosts(posts);
	return posts.filter((post) => !post.data.draft);
}

export async function getLocalizedPosts(locale: Locale): Promise<Post[]> {
	return (await getPosts())
		.filter((post) => post.data.locale === locale)
		.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getTranslation(posts: Post[], post: Post): Post {
	const translation = posts.find(
		(candidate) =>
			candidate.data.translationKey === post.data.translationKey &&
			candidate.data.locale !== post.data.locale,
	);

	if (!translation) {
		throw new Error(`Missing translation for post "${post.data.translationKey}".`);
	}

	return translation;
}

function validatePosts(posts: Post[]): void {
	const variants = new Map<string, Set<Locale>>();

	for (const post of posts) {
		const languages = variants.get(post.data.translationKey) ?? new Set<Locale>();
		if (languages.has(post.data.locale)) {
			throw new Error(
				`Duplicate ${post.data.locale} translation for post "${post.data.translationKey}".`,
			);
		}
		languages.add(post.data.locale);
		variants.set(post.data.translationKey, languages);
	}

	for (const [translationKey, languages] of variants) {
		if (languages.size !== 2) {
			throw new Error(`Post "${translationKey}" must have both French and English versions.`);
		}
	}

	for (const locale of ['fr', 'en'] satisfies Locale[]) {
		const featuredCount = posts.filter(
			(post) =>
				post.data.locale === locale &&
				post.data.type === 'case-study' &&
				post.data.featured &&
				!post.data.draft,
		).length;
		if (featuredCount > 1) {
			throw new Error(`Only one featured case study is allowed for locale "${locale}".`);
		}
	}
}

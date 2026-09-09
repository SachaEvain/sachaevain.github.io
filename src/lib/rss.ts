import rss from '@astrojs/rss';
import { copy, localizedPath, type Locale } from '../i18n';
import { getLocalizedPosts, postPath } from './posts';

export async function buildRss(locale: Locale, site: URL | undefined): Promise<Response> {
	const text = copy[locale];
	const posts = await getLocalizedPosts(locale);
	const feedSite = new URL(localizedPath(locale), site ?? 'https://sachaevain.github.io');

	return rss({
		title: text.siteName,
		description: text.siteDescription,
		site: feedSite,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedAt,
			link: postPath(post),
			categories: post.data.tags,
		})),
		customData: `<language>${locale}</language>`,
	});
}

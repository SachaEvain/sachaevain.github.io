import type { APIContext } from 'astro';
import { SITE } from '../config';
import { withBase } from '../i18n';

export function GET(context: APIContext): Response {
	const sitemap = new URL(withBase('/sitemap-index.xml'), context.site);
	const rules = SITE.ready
		? `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`
		: 'User-agent: *\nDisallow: /\n';

	return new Response(rules, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}

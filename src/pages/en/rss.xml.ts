import type { APIContext } from 'astro';
import { buildRss } from '../../lib/rss';

export function GET(context: APIContext): Promise<Response> {
	return buildRss('en', context.site);
}

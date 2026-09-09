import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const canonical = (html) => new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]);
const base = canonical(read('index.html'));

for (const locale of ['fr', 'en']) {
	const prefix = locale === 'fr' ? '' : 'en/';
	const portfolio = read(`${prefix}portfolio/index.html`);
	const portfolioUrl = new URL(`${prefix}portfolio/`, base);
	assert.doesNotMatch(portfolio, /class="eyebrow">(?:Case Study|Étude de cas)</);
	assert.match(read(`${prefix}blog/index.html`), /data-post-type="case-study"/);

	for (const slug of ['purellm', 'pureml', 'hireme']) {
		const page = read(`${prefix}portfolio/${slug}/index.html`);
		const url = new URL(`${slug}/`, portfolioUrl);
		assert.ok(portfolio.includes(`href="${url.pathname}"`), `Missing project link: ${url}`);
		assert.equal(canonical(page).href, url.href);
		assert.ok(page.includes(`href="${portfolioUrl.pathname}" aria-current="page"`));
		assert.match(page, /href="https:\/\/github.com\/LimeSku\//);
		assert.match(page, /<h2\b/);
		const headings = [...page.matchAll(/<h[23]\b[^>]*\bid="([^"]+)"/g)];
		for (const [, id] of headings) {
			assert.ok(page.includes(`href="#${id}"`), `Missing contents link: ${url}#${id}`);
		}
		for (const [, contents] of page.matchAll(/<(?:details|aside) class="toc toc--(?:mobile|desktop)"[^>]*>([\s\S]*?)<\/(?:details|aside)>/g)) {
			const links = [...contents.matchAll(/href="#([^"]+)"/g)];
			assert.equal(links.length, headings.length);
			for (const [, id] of links) assert.ok(page.includes(`id="${id}"`));
		}
		assert.match(page, /class="toc toc--mobile"/);
		assert.match(page, /class="toc toc--desktop"/);

		const alternate = new URL(`${locale === 'fr' ? 'en/' : ''}portfolio/${slug}/`, base);
		assert.ok(page.includes(`hreflang="${locale === 'fr' ? 'en' : 'fr'}" href="${alternate.href}"`));
		if (slug === 'purellm') {
			assert.ok(page.includes('href="../../blog/purellm/"'));
			assert.equal(new URL('../../blog/purellm/', url).pathname, new URL(`${prefix}blog/purellm/`, base).pathname);
			assert.match(read(`${prefix}blog/purellm/index.html`), /<h1\b/);
		}
	}
}

console.log('Project pages verified in French and English; case studies remain in the blog.');

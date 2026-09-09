import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../dist/404.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
	.map((match) => match[1]).find((source) => source.includes('english-404-chrome'));
assert.ok(script, 'Missing locale selection script');
assert.match(html, /name="robots" content="noindex, nofollow"/);
for (const [pathname, search, expected] of [
	['/missing', '', 'fr'], ['/en/missing', '', 'en'],
	['/english/missing', '', 'fr'], ['/404.html', '?lang=en', 'en'],
	['/en/missing', '?lang=fr', 'fr'],
]) {
	const replacements = [];
	const document = {
		documentElement: { lang: 'fr' },
		querySelector: (selector) => ({ replaceWith: (node) => replacements.push([selector, node]) }),
		getElementById: () => ({ content: { querySelector: (selector) => selector } }),
		addEventListener: (event, callback) => { assert.equal(event, 'DOMContentLoaded'); callback(); },
	};
	runInNewContext(script, { document, location: { pathname, search }, URLSearchParams });
	assert.equal(document.documentElement.lang, expected, pathname + search);
	assert.equal(replacements.length, expected === 'en' ? 2 : 0);
	if (expected === 'en') assert.match(document.title, /Page not found/);
}
console.log('404: locale selection, chrome replacement and noindex verified.');

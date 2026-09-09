"""Run after npm run build to check the published language routes."""
from pathlib import Path
from html.parser import HTMLParser
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, path: Path) -> None:
        super().__init__()
        self.elements = []
        self.feed(path.read_text())

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.elements.append((tag, dict(attrs)))


root = Path(__file__).resolve().parents[1] / 'dist'
for french in (root / 'fr').rglob('index.html'):
    relative = french.relative_to(root / 'fr')
    english = root / relative
    english_url = 'https://sachaevain.github.io/' + str(relative).removesuffix('index.html')
    french_url = english_url.replace('.io/', '.io/fr/', 1)
    for path, locale in [(english, 'en'), (french, 'fr')]:
        page = Page(path)
        assert next(attrs['lang'] for tag, attrs in page.elements if tag == 'html') == locale, path
        alternates = {a['hreflang']: a['href'] for tag, a in page.elements if tag == 'link' and 'hreflang' in a}
        assert alternates == {'en': english_url, 'fr': french_url, 'x-default': english_url}, path
    legacy = Page(root / 'en' / relative)
    assert any(tag == 'meta' and a.get('http-equiv') == 'refresh'
               and a['content'] == '0;url=' + '/' + str(relative).removesuffix('index.html')
               for tag, a in legacy.elements), relative
for locale, path in [('en', root / 'rss.xml'), ('fr', root / 'fr/rss.xml')]:
    assert ET.parse(path).findtext('channel/language') == locale
assert next(a['lang'] for tag, a in Page(root / '404.html').elements if tag == 'html') == 'en'
print('English root, French routes, alternate links, legacy redirects and RSS verified.')

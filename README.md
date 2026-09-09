# ML portfolio and blog

Bilingual static site built with Astro. French is served at the root and English under `/en/`. Some draft content is still represented by placeholders.

## Environment

The project uses Node 24 and npm:

```sh
nvm use 24
npm install
```

If `nvm` is not installed, activate Node 24 with your usual version manager before installing the dependencies.

## Commands

```sh
npm run dev      # local server
npm run check    # Astro and TypeScript validation
npm run build    # build to dist/
node scripts/check-project-pages.mjs # smoke-check project routes after building
npm run preview  # preview the build
```

## Replacing placeholders

- Shared labels and short text are in `src/i18n.ts`.
- Articles and case studies are in `src/content/posts/fr/` and `src/content/posts/en/`.
- Each translated article shares the same `translationKey` value.
- The portfolio displays projects from `src/content/projects/fr/` and `src/content/projects/en/`.
- Each project has a detail page at `/portfolio/<slug>/` (or `/en/portfolio/<slug>/`); its Markdown body provides the overview and capabilities. Translations share a `translationKey`.
- Articles and case studies remain in the blog. Project descriptions can link to related case studies.

Validation intentionally fails when a post translation is missing or duplicated.

## Homepage animation

Set `SITE.homeAnimation` in `src/config.ts`: `pixels` (02, independent pulses with pixel relief), `paths` (01, connected pulses with flat nodes), or `both` (03, connected pulses with pixel relief). The setting applies to both languages; rebuild to publish a change.

## Article components

Keep article-specific components in `src/components/posts/<slug>/`, with their TypeScript helpers alongside them and their images in a local `assets/` folder. Both language versions import from the same folder; PureLLM is the current example. Shared site components, including `CodexVisualization.astro`, remain in `src/components/`; covers shared by blog and portfolio remain in `src/assets/`.

## Adding a Codex visualization

1. Copy the exported HTML file to `public/visualizations/`.
2. Import `CodexVisualization.astro` into the MDX article.
3. Provide the public path and an accessible title:

```mdx
<CodexVisualization
  src="/visualizations/example.html"
  title="[VISUALIZATION_TITLE]"
/>
```

The visualization remains isolated from the site in a sandboxed iframe. Exports that load D3 or icons from a CDN require a network connection.

## Preparing for publication

1. Use `SachaEvain/sachaevain.github.io` as the repository name to serve the site at `https://sachaevain.github.io/`. `astro.config.mjs` is configured for this root URL, with no repository path prefix.
2. Replace all French and English placeholders.
3. Replace the CVs at `public/cv/sacha-evain-cv-fr.pdf` and `public/cv/sacha-evain-cv-en.pdf` when needed; their download links are already enabled.
4. Set `ready` to `true` in `src/config.ts` to allow indexing.
5. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
6. Manually trigger the **Deploy to GitHub Pages** workflow.

The workflow does not run on push unless that trigger is explicitly added.

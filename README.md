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
npm run preview  # preview the build
```

## Replacing placeholders

- Shared labels and short text are in `src/i18n.ts`.
- Articles and case studies are in `src/content/posts/fr/` and `src/content/posts/en/`.
- Each translated article shares the same `translationKey` value.
- The portfolio automatically displays articles with `type: case-study`.
- Only one published case study per language can use `featured: true`.

Validation intentionally fails when a translation is missing or a language has multiple featured case studies.

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

1. Update `site` and `base` in `astro.config.mjs` if the GitHub account or repository name changes.
2. Replace all French and English placeholders.
3. Replace the CVs at `public/cv/sacha-evain-cv-fr.pdf` and `public/cv/sacha-evain-cv-en.pdf` when needed; their download links are already enabled.
4. Set `ready` to `true` in `src/config.ts` to allow indexing.
5. Create the GitHub Pages repository and select **GitHub Actions** as the source.
6. Manually trigger the **Deploy to GitHub Pages** workflow.

The workflow does not run on push unless that trigger is explicitly added.

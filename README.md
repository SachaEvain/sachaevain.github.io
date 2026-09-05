# Portfolio et blog ML

Site statique bilingue construit avec Astro. Le français est servi à la racine et l'anglais sous `/en/`. Le contenu actuel est volontairement composé uniquement de placeholders.

## Environnement

Le projet utilise Node 24 et npm :

```sh
nvm use
npm install
```

Si `nvm` n'est pas installé, activez Node 24 avec votre gestionnaire de versions habituel avant d'installer les dépendances.

## Commandes

```sh
npm run dev      # serveur local
npm run check    # validation Astro et TypeScript
npm run build    # génération dans dist/
npm run preview  # prévisualisation du build
```

## Remplacer les placeholders

- Les libellés communs et les textes courts sont dans `src/i18n.ts`.
- Les articles et études de cas sont dans `src/content/posts/fr/` et `src/content/posts/en/`.
- Chaque article traduit partage la même valeur `translationKey`.
- Le portfolio affiche automatiquement les articles ayant `type: case-study`.
- Une seule étude de cas publiée peut utiliser `featured: true` par langue.

La validation échoue volontairement lorsqu'une traduction manque ou lorsqu'une langue possède plusieurs études principales.

## Ajouter une visualisation Codex

1. Copier le fichier HTML exporté dans `public/visualizations/`.
2. Importer `CodexVisualization.astro` dans l'article MDX.
3. Fournir le chemin public et un titre accessible :

```mdx
<CodexVisualization
  src="/visualizations/example.html"
  title="[VISUALIZATION_TITLE_FR]"
/>
```

La visualisation reste isolée du site par un iframe sandboxé. Les exports qui chargent D3 ou des icônes depuis un CDN nécessitent une connexion réseau.

## Préparer la publication

1. Remplacer `https://example.github.io` dans `astro.config.mjs`.
2. Remplacer tous les placeholders FR et EN.
3. Ajouter les CV dans `public/cv/cv-fr.pdf` et `public/cv/cv-en.pdf`, puis activer leurs liens.
4. Passer `ready` à `true` dans `src/config.ts` pour autoriser l'indexation.
5. Créer le dépôt GitHub Pages et sélectionner **GitHub Actions** comme source.
6. Déclencher manuellement le workflow **Deploy to GitHub Pages**.

Le workflow ne se lance pas lors d'un push tant que cette règle n'est pas ajoutée explicitement.

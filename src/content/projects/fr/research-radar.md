---
title: "Research Radar"
description: "Veille scientifique avec OpenAlex, sélection par LLM, synthèses structurées et recherche hybride reposant sur PostgreSQL et pgvector."
locale: fr
translationKey: research-radar
repositoryUrl: "https://github.com/LimeSku/research-radar"
status: "Open source"
tags:
  - "Python"
  - "FastAPI"
  - "Pydantic"
  - "pgvector"
  - "RAG"
order: 3
coverUrl: "https://opengraph.githubassets.com/1/LimeSku/research-radar"
---

## Des nouvelles publications à une base de recherche interrogeable

Research Radar collecte des publications scientifiques récentes depuis OpenAlex et les organise par sujets de recherche configurables. Des agents LLM évaluent leur pertinence, produisent des synthèses structurées à partir des abstracts et répondent aux questions avec les sources retrouvées. Une interface FastAPI rassemble publications, synthèses et historique des exécutions.

## Fonctionnement

- **Collecter et reprendre :** une ingestion déterministe déduplique les publications par identifiant source et enregistre les étapes de traitement pour reprendre une exécution interrompue.
- **Sélectionner et synthétiser :** des sorties Pydantic typées décrivent la pertinence, les résultats et les limites. Des budgets par sujet encadrent la collecte et la génération de synthèses.
- **Rechercher et interroger :** la recherche plein texte PostgreSQL et la recherche vectorielle pgvector fournissent les sources de réponses expérimentales dont les identifiants de citation sont vérifiés.
- **Exécuter en local ou à distance :** l’inférence prend en charge Ollama et OpenAI ; Docker et des tâches planifiées permettent de répéter les traitements.

## Éléments vérifiables et périmètre

Le dépôt documente une exécution ayant collecté 30 publications et produit cinq synthèses avec un modèle local via Ollama. Les vérifications d’intégration couvrent l’ingestion, la déduplication, la reprise après un échec de synthèse, la recherche et la validation des citations.

La collecte constitue un échantillon plafonné, pas une recherche bibliographique exhaustive. Les synthèses exploitent les métadonnées et les abstracts, sans lecture des articles complets. La validation des citations contrôle les références aux sources, mais ne garantit pas leur soutien factuel : les synthèses et réponses générées restent à relire.

[Explorer l’exécution documentée et l’architecture →](https://github.com/LimeSku/research-radar#readme)

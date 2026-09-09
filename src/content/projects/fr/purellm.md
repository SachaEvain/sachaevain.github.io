---
title: "PureLLM"
description: "Un Transformer decoder-only en NumPy et PyTorch, de la tokenisation et de l’entraînement à la génération et à une API d’inférence FastAPI."
locale: fr
translationKey: purellm
repositoryUrl: "https://github.com/LimeSku/PureLLM"
status: "Prototype de recherche"
tags:
  - "NumPy"
  - "PyTorch"
  - "Transformers"
  - "FastAPI"
order: 0
cover: "../../../assets/purellm-cover.svg"
---

## Des mécanismes du modèle au service d’inférence

PureLLM explore le cycle complet d’un petit modèle de langage : transformer du texte en tokens, entraîner un Transformer decoder-only, sauvegarder une expérience reprenable et exposer la génération via une API HTTP. L’objectif est de comprendre le modèle et le système qui l’entoure sans passer par un framework LLM de haut niveau.

Le projet réunit deux implémentations aux objectifs distincts. NumPy rend explicites la passe avant, les gradients et les mises à jour de l’optimiseur. PyTorch conserve un modèle lisible tout en apportant des opérations tensoriales optimisées et les outils nécessaires aux expériences.

## Architecture et implémentation

Le chemin commun est **texte → tokeniseur → embeddings → blocs Transformer causaux → logits du vocabulaire → tokens générés**. Les tokeniseurs caractère et BPE au niveau octet couvrent l’apprentissage du vocabulaire, l’encodage, le décodage et la sérialisation.

| Élément | Implémentation NumPy | Implémentation PyTorch |
| --- | --- | --- |
| Gradients | Rétropropagation manuelle | Autograd |
| Attention | Projections, masque et softmax explicites | Attention native scaled-dot-product |
| Blocs | Positions apprises et GELU | Positions apprises ou RoPE, avec SwiGLU |
| Entraînement | SGD et Adam implémentés localement | AdamW, warmup, décroissance cosinus, clipping |
| Génération | Température et top-k | Température, top-k et cache KV |

Le backend PyTorch propose aussi le partage des embeddings, la précision mixte sur les appareils compatibles et la sélection automatique de CPU, Apple MPS ou CUDA. Le [schéma d’architecture et le comparatif](https://github.com/LimeSku/PureLLM#architecture) explicitent la frontière entre code du modèle et primitives PyTorch.

## Des expériences reproductibles

Des recettes TOML versionnées définissent le modèle, le tokeniseur, la séparation des données et les paramètres d’entraînement. Chaque run sauvegarde sa configuration et ses checkpoints, avec le tokeniseur et l’état nécessaires à la reprise. La loss de validation détermine le meilleur checkpoint ; la génération et l’API chargent ensuite ce même artefact.

Le dépôt documente un **run de vérification Shakespeare de 119 617 paramètres sur Apple MPS**, référencé au commit `fb7fc6b` :

| Mesure | Étape 1 | Étape 10 | Étape 20 |
| --- | ---: | ---: | ---: |
| Loss de validation | 4,1391 | 3,6944 | 3,5583 |
| Perplexité de validation | 62,75 | 40,22 | 35,10 |

Ces [mesures de référence publiées](https://github.com/LimeSku/PureLLM#reproducible-result) montrent un apprentissage sur une petite expérience à configuration fixe. Évaluer la qualité de langage générale ou les performances de production nécessite un protocole plus large. De légers écarts numériques sont attendus entre backends matériels.

## Servir le modèle entraîné

Le service FastAPI charge un checkpoint au démarrage. `GET /health` indique la disponibilité, le matériel utilisé et l’étape du checkpoint. `POST /generate` reçoit un prompt et les paramètres d’échantillonnage, puis retourne le texte, le nombre de tokens générés, la latence et le débit.

La validation borne la longueur des prompts et des générations et rejette les entrées non prises en charge. Un verrou sérialise les générations, car le modèle possède un cache KV mutable. Ce choix évite le mélange des états pour cette instance unique, au prix d’un débit concurrent limité. Le [test d’intégration de l’API](https://github.com/LimeSku/PureLLM/blob/50154f2489fd7c097372172afac6648b644c9691/tests/test_api.py) couvre le chargement, la génération, les paramètres invalides et le contrat OpenAPI.

## Périmètre et limites

PureLLM reste un prototype de recherche pédagogique. Les poids préentraînés ne sont pas fournis, la génération traite un prompt à la fois et le cache KV est reconstruit lorsque la fenêtre de contexte est pleine. NumPy privilégie la transparence à la vitesse ; l’entraînement distribué et la quantification ne sont pas implémentés.

Le livrable est un parcours inspectable de la tokenisation au service d’inférence, accompagné d’un résultat d’entraînement documenté et de limites opérationnelles explicites. L’étude de cas développe les décisions de conception et les questions expérimentales.

[Lire l’étude de cas complète →](../../blog/purellm/)

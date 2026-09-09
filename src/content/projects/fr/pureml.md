---
title: "PureML"
description: "Du machine learning implémenté from scratch en Python et NumPy : arbres, ensembles, réseaux neuronaux, TinyGPT et tableau de bord d’entraînement en terminal."
locale: fr
translationKey: pureml
repositoryUrl: "https://github.com/LimeSku/PureML"
status: "Open source"
tags:
  - "Python"
  - "NumPy"
  - "Textual"
  - "ML from scratch"
order: 1
coverUrl: "https://opengraph.githubassets.com/1/LimeSku/PureML"
---

## Comprendre les modèles en les construisant

PureML est une bibliothèque pédagogique de machine learning accompagnée d’un outil d’entraînement interactif. Le projet rend visibles les mécanismes des estimateurs courants : le choix d’une coupure dans un arbre, la correction des erreurs par boosting et la mise à jour des poids d’un réseau neuronal.

Le travail couvre les modèles, des expériences ciblées, des chargeurs de données partagés et une interface en terminal. Il associe la compréhension des algorithmes à leur mise en pratique dans un outil dont on peut observer l’exécution.

## Ce qui est implémenté

- **Arbres et ensembles :** arbres de décision en régression et classification, classifieur random forest, gradient boosting pour les deux tâches et régresseur inspiré de XGBoost.
- **Réseaux neuronaux :** couches denses, ReLU, entropie croisée avec softmax et classifieur MLP avec rétropropagation explicite et entraînement par mini-batchs.
- **Modèles de langage :** tokeniseurs caractère et BPE, attention causale, blocs Transformer, TinyGPT en NumPy et entraînement PyTorch avec checkpoints.
- **Outils associés :** métriques de régression, séparation train/test, chargement d’Iris et de MNIST et expériences exécutables par modèle.

Les [notes sur les modèles](https://github.com/LimeSku/PureML/tree/main/docs/models) relient les choix d’implémentation aux mathématiques. Le régresseur inspiré de XGBoost utilise notamment gradients et Hessiennes pour évaluer des coupures régularisées et calculer la contribution des feuilles. Il reprend ces principes, sans reproduire l’ensemble de la bibliothèque XGBoost.

## Rendre l’entraînement observable

Le tableau de bord Textual permet de choisir un modèle et un jeu de données, de régler les hyperparamètres puis de lancer l’entraînement sans modifier de script. Les contrôles s’adaptent au modèle : profondeur et nombre d’arbres, ou taux d’apprentissage, taille des batchs et nombre d’époques.

Les entraîneurs remontent leur progression : un ensemble émet une mise à jour à chaque arbre construit, tandis qu’un réseau neuronal expose l’évolution de sa loss. La vue finale présente l’accuracy sur les ensembles d’entraînement et de test et une matrice de confusion. Une limite du nombre de lignes garde les arbres pédagogiques utilisables sur MNIST.

La séparation entre entraînement et interface permet aussi de vérifier les modèles sans démarrer le terminal interactif.

## Éléments vérifiables et validation

Les [tests des entraîneurs](https://github.com/LimeSku/PureML/blob/fff619c8393ba959a8e7cf546d31be956dcb27ef/tests/test_trainers.py) couvrent Iris, les événements de progression, la diminution de la loss du MLP et les effectifs de la matrice de confusion. Ils exigent au moins 80 % d’accuracy de test pour les entraîneurs concernés. Ce seuil est un garde-fou de non-régression sur un petit jeu de données, pas un benchmark comparatif avec les bibliothèques établies.

Le dépôt contient également des expériences indépendantes par modèle. Après installation, l’interface se lance avec :

```bash
uv run pureml-tui
```

## Périmètre et suites

PureML privilégie la lisibilité au débit et à l’exhaustivité d’une API d’estimateurs. La validation croisée, certaines variantes de modèles et une validation numérique plus large restent à compléter. Le projet met surtout en évidence le lien entre règles mathématiques, modèles exécutables et observation de l’entraînement.

[Explorer les implémentations et les démonstrations →](https://github.com/LimeSku/PureML#demos)

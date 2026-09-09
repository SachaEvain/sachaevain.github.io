---
title: "PureML"
description: "Machine learning from scratch in Python and NumPy: trees, ensembles, neural networks, TinyGPT, and a live terminal training dashboard."
locale: en
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

## Understanding models by building them

PureML is an educational machine learning library and an interactive training tool. Its purpose is to make the mechanics behind familiar estimators visible: how a tree chooses a split, how boosting corrects errors, and how a neural network updates its weights.

The work spans model implementations, small experiments, shared dataset loaders, and a terminal interface. It demonstrates both algorithmic understanding and the ability to turn those algorithms into something that can be inspected while it runs.

## What is implemented

- **Trees and ensembles:** decision trees for regression and classification, a random forest classifier, gradient boosting for both tasks, and an XGBoost-like regressor.
- **Neural networks:** dense layers, ReLU, softmax cross-entropy, and an MLP classifier with explicit backpropagation and mini-batch training.
- **Language modeling:** character and BPE tokenizers, causal attention, Transformer blocks, a NumPy TinyGPT, and a PyTorch training path with checkpointing.
- **Supporting tools:** regression metrics, a train/test split utility, Iris and MNIST loaders, and runnable model experiments.

The [model notes](https://github.com/LimeSku/PureML/tree/main/docs/models) connect implementation choices to the underlying mathematics. For example, the XGBoost-like regressor uses gradients and Hessians to score regularized splits and calculate leaf updates; it is an implementation of those core ideas, not a reimplementation of the entire XGBoost library.

## Making training observable

The Textual dashboard lets a visitor choose a model and dataset, adjust its hyperparameters, and start training without editing a script. The interface exposes model-specific controls, such as tree depth and ensemble size or learning rate, batch size, and epochs.

Training progress is reported by the trainers: an ensemble emits an update as each tree is built, while a neural network exposes its loss history. The final view reports train/test accuracy and a confusion matrix. A training-row cap keeps the educational tree implementations usable on MNIST.

Keeping trainer progress separate from the terminal interface also makes it possible to exercise training without starting the UI.

## Evidence and validation

The [headless trainer checks](https://github.com/LimeSku/PureML/blob/fff619c8393ba959a8e7cf546d31be956dcb27ef/tests/test_trainers.py) cover training on Iris, progress events, decreasing MLP loss, and confusion-matrix counts. They require at least 80% test accuracy for the covered trainers. That threshold is a regression guard on a small dataset, not a comparative benchmark against established libraries.

The repository also provides standalone experiments for individual models. To explore the interactive part after installing the project:

```bash
uv run pureml-tui
```

## Scope and next steps

PureML prioritizes readable implementations over throughput or a comprehensive estimator API. Cross-validation helpers, some model variants, and broader numerical validation remain unfinished. The project connects mathematical rules, executable models, and training feedback in one inspectable environment.

[Explore the implementations and demos →](https://github.com/LimeSku/PureML#demos)

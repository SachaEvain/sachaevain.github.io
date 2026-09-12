---
title: "PureLLM"
description: "A decoder-only Transformer built in NumPy and PyTorch, from tokenization and training to generation and a FastAPI inference API."
locale: en
translationKey: purellm
repositoryUrl: "https://github.com/LimeSku/PureLLM"
status: "Research prototype"
tags:
  - "NumPy"
  - "PyTorch"
  - "Transformers"
  - "FastAPI"
order: 0
cover: "../../../assets/purellm-cover.svg"
---

## From model internals to an inference service

PureLLM explores the full lifecycle of a small language model: turning text into tokens, training a decoder-only Transformer, saving a resumable experiment and exposing generation through an HTTP API. The goal is to understand the model and the surrounding system without relying on a high-level LLM framework.

The project brings together two implementations with different purposes. NumPy makes the forward pass, gradients and optimizer updates explicit. PyTorch retains a readable model while supplying optimized tensor operations and the tools needed for practical experiments.

## Architecture and implementation

The common token path is **text → tokenizer → embeddings → causal Transformer blocks → vocabulary logits → generated tokens**. Character-level and byte-level BPE tokenizers cover training, encoding, decoding and serialization.

| Area | NumPy implementation | PyTorch implementation |
| --- | --- | --- |
| Gradients | Manual backward passes | Autograd |
| Attention | Explicit projections, masking and softmax | Native scaled-dot-product attention |
| Blocks | Learned positions and GELU | Learned positions or RoPE, with SwiGLU |
| Training | Local SGD and Adam | AdamW, warmup, cosine decay, gradient clipping |
| Generation | Temperature and top-k sampling | Temperature, top-k and a KV cache |

The PyTorch backend also supports tied embeddings, mixed precision on compatible devices and automatic CPU, Apple MPS, or CUDA selection. The [architecture diagram and implementation comparison](https://github.com/LimeSku/PureLLM#architecture) show where custom model code ends and PyTorch primitives take over.

## Reproducible experiments

Versioned TOML recipes specify the model, tokenizer, data split and training settings. Runs save their configuration and checkpoints, including the tokenizer and training state needed to resume. Validation loss determines the best checkpoint; generation and the API can load that same artifact.

The repository documents a **119,617-parameter Shakespeare smoke run on Apple MPS**, referenced to commit `fb7fc6b`:

| Metric | Step 1 | Step 10 | Step 20 |
| --- | ---: | ---: | ---: |
| Validation loss | 4.1391 | 3.6944 | 3.5583 |
| Validation perplexity | 62.75 | 40.22 | 35.10 |

These [published reference measurements](https://github.com/LimeSku/PureLLM#reproducible-result) demonstrate learning in a small, fixed experiment. Evaluating general language quality or production performance requires a broader protocol. Small numerical differences are expected across hardware backends.

## Serving the trained model

The FastAPI service loads one checkpoint at startup. `GET /health` reports readiness, device and checkpoint step. `POST /generate` accepts a prompt and sampling settings and returns the continuation, generated-token count, latency and throughput.

Request validation bounds prompt length and generation size and rejects unsupported inputs. A lock serializes generation because the model owns a mutable KV cache. This preserves cache isolation for the single model instance while limiting concurrent throughput. The [API integration check](https://github.com/LimeSku/PureLLM/blob/50154f2489fd7c097372172afac6648b644c9691/tests/test_api.py) covers checkpoint loading, generation, invalid parameters and the OpenAPI contract.

## Scope and limitations

PureLLM is an educational research prototype. Pretrained weights are not included, generation handles one prompt at a time and the KV cache is rebuilt when the context window fills. NumPy prioritizes transparency over speed; distributed training and quantization remain outside the implemented scope.

The deliverable is an inspectable path from tokenization to serving, with a documented training result and explicit operational limits. The case study below develops the design decisions and experimental questions in more depth.

[Read the full case study →](../../blog/purellm/)

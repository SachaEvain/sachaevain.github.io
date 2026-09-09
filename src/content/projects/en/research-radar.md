---
title: "Research Radar"
description: "Scientific literature monitoring with OpenAlex, LLM curation, structured research briefs, and hybrid search backed by PostgreSQL and pgvector."
locale: en
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

## From new publications to searchable research

Research Radar collects recent scientific publications from OpenAlex and organizes them around configurable research topics. LLM agents score relevance, generate structured briefs from abstracts, and answer questions using retrieved sources. A FastAPI interface brings together publications, digests, and run history.

## How it works

- **Collect and resume:** deterministic ingestion deduplicates publications by source ID and records processing stages so interrupted runs can resume.
- **Curate and summarize:** typed Pydantic outputs capture relevance scores, findings, and limitations. Topic-specific budgets limit collection and summarization work.
- **Search and synthesize:** PostgreSQL full-text search and pgvector retrieval supply evidence for experimental answers with checked citation IDs.
- **Run locally or remotely:** inference supports Ollama and OpenAI; Docker packaging and scheduled jobs support repeatable operation.

## Evidence and scope

The repository documents a run that collected 30 publications and produced five summaries with a local Ollama model. Integration checks cover ingestion, deduplication, recovery after a summary failure, retrieval, and citation validation.

Collection is a capped sample rather than an exhaustive literature search. Briefs use metadata and abstracts, not full papers. Citation validation checks source references, but does not establish factual support; generated summaries and answers still require review.

[Explore the documented run and architecture →](https://github.com/LimeSku/research-radar#readme)

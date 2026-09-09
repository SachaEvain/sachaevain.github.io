---
title: "HireME"
description: "A CLI that finds job postings, extracts typed job data with an LLM, and produces grounded, tailored PDF resumes with RenderCV."
locale: en
translationKey: hireme
repositoryUrl: "https://github.com/LimeSku/HireME"
status: "Open source"
tags:
  - "Python"
  - "LLM"
  - "PydanticAI"
  - "Playwright"
  - "RenderCV"
  - "SQLite"
order: 2
coverUrl: "https://opengraph.githubassets.com/1/LimeSku/HireME"
---

## Turning job postings into reviewable applications

Preparing an application combines several repetitive tasks: finding an offer, extracting its requirements, selecting relevant experience, and formatting a resume. HireME connects those steps in a Python CLI while keeping the candidate profile as the source of facts.

The deliverable is a workflow from browser collection to structured job records and tailored YAML/PDF resumes. The engineering focus is on making LLM outputs usable by downstream code and checking them before document generation.

## How the pipeline works

1. **Collect:** a Playwright browser workflow finds postings for a role and location. Raw and processed offer files are kept alongside the local database.
2. **Extract:** a PydanticAI agent returns typed job details or an explicit extraction failure. The schema includes company, work mode, contract type, experience level, salary, required skills, and responsibilities.
3. **Persist:** extracted offers are saved in SQLite and can be inspected from the CLI. Resume generation can select a processed job by its database ID.
4. **Tailor:** a separate agent combines the job record with the candidate’s structured profile and supporting context.
5. **Render:** the checked resume is converted to RenderCV YAML and then PDF. The generation result records artifact paths, model, token usage, and elapsed time.

Separating extraction from tailoring makes the intermediate job record inspectable and avoids passing an unstructured web page directly into document rendering. See the [job extraction schema](https://github.com/LimeSku/HireME/blob/a10a2988f339d6d327975bb44955597eeb1eca10/src/hireme/agents/job_agent.py).

## Grounding the generated resume

The [resume validator](https://github.com/LimeSku/HireME/blob/a10a2988f339d6d327975bb44955597eeb1eca10/src/hireme/agents/resume_agent.py) checks supplied identity fields against the profile. It also checks whether company names, positions, institutions, project names, and dates appear in the candidate’s source material. Generated numbers absent from that source trigger a model retry, limiting unsupported quantitative claims.

These are concrete checks around the model, with a bounded retry budget. Their string and number matching remains heuristic: a value can appear in the source and still be used in the wrong context. A candidate therefore needs to review the final wording before using the document.

## Model choice and runtime design

The provider and model must be configured explicitly. Supported options include local Ollama, Mistral, and OpenAI. This makes the model destination a deliberate choice rather than an implicit dependency of the CLI.

Runtime state is stored under a configurable application directory. Packaged prompts and RenderCV templates are independent of the working directory. Optional Logfire tracing is disabled by default, and prompt/candidate content requires a separate opt-in.

## Evidence and current scope

The repository includes a sample-posting mode for exercising extraction without live job boards. Its [validation checks](https://github.com/LimeSku/HireME/blob/a10a2988f339d6d327975bb44955597eeb1eca10/tests/test_remediation.py) include rejecting invented numbers and blank required identity, requiring explicit model configuration, and rejecting profile path traversal.

The documented workflow supports offer discovery and resume generation; submitting an application remains a user action. Live collection depends on job-board availability, and extraction quality depends on the selected model. A representative evaluation of factual accuracy, cost per resume, and time saved would be needed to quantify its practical benefit.

[Explore the CLI workflow and setup →](https://github.com/LimeSku/HireME#use)

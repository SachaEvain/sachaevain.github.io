---
title: "HireME"
description: "Un CLI qui recherche des offres d’emploi, en extrait des données structurées avec un LLM et génère des CV PDF contextualisés avec RenderCV."
locale: fr
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

## Transformer une annonce en candidature vérifiable

Préparer une candidature cumule plusieurs tâches répétitives : trouver une offre, en extraire les attentes, sélectionner les expériences pertinentes et mettre en forme un CV. HireME relie ces étapes dans un CLI Python en conservant le profil du candidat comme source des faits.

Le livrable couvre la collecte dans le navigateur, les offres structurées et la génération de CV adaptés en YAML et PDF. L’enjeu technique est de rendre les sorties du LLM exploitables par le reste du programme et de les vérifier avant de produire le document.

## Le fonctionnement du pipeline

1. **Collecter :** un navigateur Playwright recherche des offres pour un poste et une localisation. Les fichiers bruts et traités sont conservés à côté de la base locale.
2. **Extraire :** un agent PydanticAI retourne les détails typés d’une offre ou un échec explicite. Le schéma couvre l’entreprise, le mode de travail, le contrat, l’expérience, le salaire, les compétences et les responsabilités.
3. **Conserver :** les offres extraites sont enregistrées dans SQLite et consultables depuis le CLI. La génération peut sélectionner une offre traitée par son identifiant en base.
4. **Adapter :** un second agent combine l’offre structurée avec le profil du candidat et ses documents de contexte.
5. **Produire :** le CV vérifié est converti en YAML RenderCV, puis en PDF. Le résultat conserve les chemins des fichiers, le modèle, la consommation de tokens et la durée.

Séparer extraction et adaptation rend l’offre intermédiaire inspectable et évite de transmettre directement une page web non structurée au moteur de rendu. Le [schéma d’extraction](https://github.com/LimeSku/HireME/blob/a10a2988f339d6d327975bb44955597eeb1eca10/src/hireme/agents/job_agent.py) précise ce contrat.

## Ancrer le CV dans les informations du candidat

Le [validateur de CV](https://github.com/LimeSku/HireME/blob/a10a2988f339d6d327975bb44955597eeb1eca10/src/hireme/agents/resume_agent.py) compare les champs d’identité renseignés au profil. Il vérifie aussi la présence des entreprises, postes, établissements, projets et dates dans les sources du candidat. Les nombres générés absents de ces sources déclenchent une nouvelle tentative du modèle, afin de limiter les résultats chiffrés inventés.

Ces contrôles encadrent le modèle avec un nombre limité de tentatives. La comparaison de chaînes et de nombres reste heuristique : une valeur peut exister dans les sources et être réutilisée dans un mauvais contexte. Le candidat doit donc relire les formulations avant d’utiliser le document.

## Choix du modèle et organisation de l’exécution

Le fournisseur et le modèle doivent être configurés explicitement. Les options incluent Ollama en local, Mistral et OpenAI. La destination des requêtes devient ainsi un choix explicite de l’utilisateur.

Les données d’exécution sont stockées dans un répertoire configurable. Les prompts et modèles RenderCV fournis avec le paquet ne dépendent pas du dossier courant. Le traçage Logfire est optionnel et désactivé par défaut ; l’inclusion du contenu des prompts et du candidat nécessite une activation distincte.

## Éléments vérifiables et périmètre actuel

Un mode avec annonce d’exemple permet d’exercer l’extraction sans dépendre des sites d’emploi. Les [tests de validation](https://github.com/LimeSku/HireME/blob/a10a2988f339d6d327975bb44955597eeb1eca10/tests/test_remediation.py) couvrent notamment le rejet de nombres inventés, d’une identité obligatoire vide et de chemins de profil sortant du répertoire prévu, ainsi que la configuration explicite du modèle.

Le parcours documenté couvre la recherche d’offres et la génération de CV ; l’envoi d’une candidature reste une action utilisateur. La collecte dépend de la disponibilité des sites et la qualité de l’extraction du modèle choisi. Une évaluation représentative de la fidélité factuelle, du coût par CV et du temps gagné permettrait de quantifier le bénéfice pratique.

[Explorer le parcours CLI et l’installation →](https://github.com/LimeSku/HireME#use)

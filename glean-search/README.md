# Glean Search

**Enterprise search across documents, Slack, email, and other sources.**

Search across all your company's knowledge with natural language queries.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```
/add-plugin glean-core   # if not already installed
/add-plugin glean-search
```

## What's Included

### Skills

- **enterprise-search** — Auto-triggers when you ask about company documents, policies, or internal knowledge
- **search** — Structured search workflow with result vetting and quality assessment

### Agent

- **enterprise-searcher** — Cross-source search specialist that finds relevant information across documents, wikis, Slack, email, and more. Applies aggressive vetting to return only high-quality, current results.

## Example Usage

Just ask naturally — the skills and agent activate based on context:

```
"Find all documents about the authentication migration"
"What's our policy on data retention?"
"Is there a design doc for the new billing system?"
"Find the RFC for the API gateway rewrite"
"Search for the onboarding guide updated last month"
```

## Search Tips

Use filters to narrow results:

- `owner:"John Smith"` — Documents created by a person
- `updated:past_week` — Recently updated documents
- `app:confluence` — Documents from a specific app
- `after:2024-01-01` — Documents after a date

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [GitHub Issues](https://github.com/gleanwork/cursor-plugins/issues)

---
name: enterprise-search
description: Use when the user asks about company documents, internal wikis, policies, specifications, design docs, RFCs, or enterprise knowledge. Triggers on phrases like "find the doc about", "what's our policy on", "where is the spec for", "company guidelines", "internal documentation", or when searching for information that would be in enterprise systems rather than the local codebase.
---

# Enterprise Search via Glean

When users ask about internal company information that lives in enterprise systems (not the local codebase), use Glean tools to find it.

## When This Applies

Use Glean search when users ask about:
- Company policies, guidelines, or procedures
- Design documents, RFCs, or specifications
- Internal wikis or knowledge base articles
- Project documentation or roadmaps
- Slack discussions or announcements
- Any "where is the doc about X" questions

## Tool Selection

| User Intent | Glean Tool |
|-------------|------------|
| Find documents, policies, specs | `search` |
| Complex analysis across sources | `chat` |
| Read full document content | `read_document` |

## BE SKEPTICAL

Not every search result is relevant or current. Before presenting results, evaluate:

- **Relevance**: Does this actually answer the question, or just contain keywords?
- **Freshness**: ✅ <6mo | ⚠️ 6-12mo | ❌ >12mo
- **Authority**: Official > Semi-official > Informal

Always include document title, URL, last updated date, and confidence level.

## Workflow

1. **Search first**: Use `search` to find relevant documents
2. **Vet results**: Apply vetting criteria before presenting
3. **Read for details**: Use `read_document` with URLs from vetted results
4. **Synthesize if complex**: Use `chat` for multi-source analysis


---
name: memory-management
description: >
  Use memory as a compact, maintained context layer for session continuity, preferences, and decisions. Use when the agent needs to read, write, query, or reason about memory entries across sources and categories.
---

# Memory Management

This skill assumes access to the Glean MCP server, which provides the `memory_schema` and `read_memory` tools used throughout.

Use memory as a compact, maintained context layer — not as raw history and not as implementation truth. Good memory systems store durable, queryable summaries or typed nuggets that help future sessions resume cleanly.

## Execution Model

**Reads are non-blocking.** Memory reads (`memory_schema`, `read_memory`) go through MCP, so they do not block the main task. Issue them inline whenever context would help.

**Writes must not block the main task.** When you need to write, update, or delete memory entries, delegate the write to a background subagent. The subagent should receive the category, content, and any relevant field values, then perform the write independently while the main task continues. Never pause user-facing work to wait for a memory write to complete.

## Core Rules

### 1. Treat memory_schema as the runtime contract

Call `memory_schema` before first use, when switching sources, when filterability/searchability is unclear, or after any memory-tool validation error.

The schema response is the source of truth for:
- available sources and categories
- which categories are writable for the current client
- client-facing fields (type, description, required, filterable)
- whether semantic search is enabled
- storage policy (max_entries, eviction, group_by_field)

Do not hardcode category assumptions. Category names in this skill are examples and heuristics, not invariants.

### 2. Be capability-driven, not category-name-driven

Pick categories by what the schema says they can do: description, exposed fields, filterability, search support, storage model.

If an expected category is missing, scan the returned categories for the closest semantic match by description and fields. Prefer patterns like "category with a filterable project field" over "always use NativeMemories".

### 3. Use only client-facing schema fields

Use field names surfaced by `memory_schema` for filtering. Any additional fields you need go in the content string.

### 4. Memory is supplemental context, not ground truth

Use memory for continuity, preferences, goals, constraints, decisions, and prior context that should shape the response. Use docs, code, tickets, and canonical system tools for implementation truth, current state, and authoritative facts.

If memory conflicts with fresher source-of-truth evidence, trust the source of truth and note the mismatch.

### 5. Assume read-first portability

The most portable assumption is that you have `read_memory` plus `memory_schema`. Do not assume writes are available unless the runtime tool surface exposes them.

## Tool Capabilities

### memory_schema

Use for discovery before retrieval.

- **Input**: optional category string (omit for all categories across all sources)
- **Returns per source/category pair**: name, description, writable flag, search_enabled, client-visible fields, optional storage config
- **Best uses**: discover categories, check writability, find valid filter fields, inspect search and storage semantics

### read_memory

Use to retrieve actual memory entries.

- **Inputs**: action "read", optional memory_source, category, semantic query, limit (default 10), read_filters (equality-only, keys from schema)
- **Returns**: id, source, category, content, optional updated_at, optional semantic score
- **Writes**: only available if the runtime tool schema exposes add/update/delete and the category is marked writable

## Source and Category Selection

### Source scope

- Current host's memory context → prefer that host's source
- General user context → omit memory_source, search across sources
- Noisy results → narrow to the most plausible source and retry

### Category selection by capability

| Need | Look for |
|------|----------|
| Project continuity | categories mentioning projects/sessions, filterable project field, group_by_field |
| Preferences / style | categories mentioning preferences, working style, constraints, decision frameworks |
| Recent state / decisions | categories indicating goals, commitments, responsibilities, contextual state |
| Org / people context | categories mentioning relationships, teams, collaborators |

## Retrieval Playbooks

### A. Starting or resuming project work

1. Call `memory_schema`
2. Find project-scoped category (by description, field schema, or group_by_field)
3. Read that category first, using any exposed project filter
4. Optionally read goals/commitments/contextual-state categories
5. Summarize only the memories that should change how you proceed

### B. Adapting to the user's style

1. Call `memory_schema`
2. Find categories for preferences, writing style, constraints, decision heuristics
3. Use `query` when the preference is topic-specific
4. Use `read_filters` only if the schema exposes relevant filterable fields

### C. Continue where I left off

1. Prefer project-scoped continuity memory
2. Then read goals, active work, contextual state, decisions
3. Return a compact continuity brief: what, what changed, open items, constraints

### D. Broad context reads

1. Start with `memory_schema`
2. Omit category and optionally memory_source
3. Use a strong topical query with modest limit
4. Narrow afterward if results are too diffuse

## Search and Filtering

- Use semantic `query` for topic/project/decision/concept searches
- Use `read_filters` for exact field/value constraints on filterable fields
- Combine `query` with narrow category selection for high relevance
- If `search_enabled` is false, rely on category choice plus exact filters
- If a filter fails, re-run `memory_schema` — do not guess field names

## Memory-Worthy Patterns

Favor durable nuggets over transcripts. Good nugget types: project, task state, decision, architecture fact, correction pattern, open question.

Prefer milestone-based capture — only surface things that help a fresh session resume. Keep provenance and refresh semantics in mind: memory should be maintained, not merely appended forever.

## Response Pattern

When memory materially affects the answer:

1. **Relevant memory** — smallest set that actually changes the answer
2. **How it changes the response** — what you are doing differently
3. **Ground-truth check** — note memory is supplemental, continue with source-of-truth tools
4. **Candidate memories** — when a durable new fact surfaced, list type, content, and why it matters

## Anti-Patterns

- Do not hardcode category names as permanent
- Do not skip `memory_schema` when capability details matter
- Do not use hidden/internal field names
- Do not dump every memory found
- Do not confuse memory with authoritative product or code truth
- Do not assume writes exist everywhere
- Do not treat all sources as having the same categories or semantics

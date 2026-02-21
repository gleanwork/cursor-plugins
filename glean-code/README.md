# Glean Code

**Cross-repository code exploration — search code across your org, find examples, and discover similar implementations.**

Leverage Glean's code search to explore beyond your local repository.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```
/add-plugin glean-core  # if not already installed
/add-plugin glean-code
```

## What's Included

### Skills

- **code-exploration** — Triggers on implementation questions, cross-repo searches, and architecture questions about internal systems
- **plan-prep** — Researches enterprise context (design docs, patterns, stakeholders, related systems) before entering plan mode
- **codebase-context** — Gathers architectural context about a specific system or service
- **find-examples** — Finds usage examples of an API, library, or pattern across the org
- **code-owners** — Identifies who owns, maintains, or has expertise in a code area
- **similar-code** — Finds similar implementations and prior art before building something new

### Agents

- **codebase-navigator** — Navigates internal repositories to find implementations, trace dependencies, and surface relevant patterns across the org
- **plan-prep-researcher** — Gathers design docs, similar implementations, stakeholders, and related systems to inform planning decisions

## Example Usage

Just ask naturally — skills and agents activate based on context:

```
"How is rate limiting implemented across our services?"
"What repos depend on the auth service?"
"Find examples of how other teams use the retry library"
"Who's been working on the payments codebase?"
"Is there already a caching implementation I can use?"
"Research the authentication system before I start planning"
"Who owns the billing module?"
```

## Key Differentiator

**Local search tools only see your current repo.** Glean Code searches across ALL repositories in your organization:

- Find examples: "How do other teams handle authentication?"
- Understand systems: "What repos touch the billing service?"
- Find owners: "Who's actively working on payments?"
- Avoid duplication: "Has someone already built a rate limiter?"

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [GitHub Issues](https://github.com/gleanwork/cursor-plugins/issues)

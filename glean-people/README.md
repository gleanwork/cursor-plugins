# Glean People

**Find experts, understand org structure, and identify stakeholders.**

Discover the right people based on real activity and contributions — not just org chart position.

## Prerequisites

Requires [glean-core](../glean-core) to be installed first.

## Installation

```
/add-plugin glean-core   # if not already installed
/add-plugin glean-people
```

## What's Included

### Skills

- **find-expert** — Multi-signal expertise discovery: combines code contributions, document authorship, and activity signals to find people who actually know a topic
- **stakeholders** — Identifies who needs to approve, consult, or be informed about a change or project

### Agent

- **people-finder** — Finds people by role, expertise, activity, or organizational relationship. Vets candidates across multiple signals before recommending.

## Example Usage

Just ask naturally — skills and the agent activate based on context:

```
"Who knows about the Kubernetes setup?"
"Who should I talk to about the billing module?"
"Who owns the payments service?"
"Find the experts on our authentication system"
"Who needs to be involved in deprecating the legacy API?"
"Who are the stakeholders for migrating auth to OAuth?"
"Who works on the platform team?"
```

## How It Works

This plugin combines multiple signals to find the right people:

- **Employee search** — Official roles and org structure
- **Code contributions** — Who's actively coding in an area
- **Document authorship** — Who wrote the design docs and RFCs
- **Meeting participation** — Who's in relevant discussions

A single mention doesn't make someone an expert. The agent looks for multiple corroborating signals and clearly distinguishes current owners from historical contributors.

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [GitHub Issues](https://github.com/gleanwork/cursor-plugins/issues)

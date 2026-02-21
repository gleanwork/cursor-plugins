# Glean Core

**Required foundation for all Glean plugins.**

Provides shared skills for tool selection and result quality, always-on rules for proper Glean MCP usage, and setup guidance for configuring your Glean connection.

## Prerequisites

- [Cursor](https://cursor.com)
- A Glean account with MCP access

## Installation

```
/add-plugin glean-core
```

Then configure your Glean MCP server in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "glean": {
      "url": "https://YOUR-INSTANCE-be.glean.com/mcp/YOUR-SERVER-NAME"
    }
  }
}
```

Restart Cursor after editing. OAuth authentication is handled automatically on first use.

## What's Included

### Skills

- **glean-tools-guide** — Comprehensive guidance for selecting and using Glean MCP tools correctly
- **enterprise-search** — Triggers for document, wiki, and policy search queries
- **confidence-signals** — Quality and reliability assessment for search results
- **people-lookup** — Triggers for people and org structure queries
- **meeting-context** — Triggers for meeting and decision queries
- **synthesis-patterns** — Guidance for combining information from multiple sources
- **mcp-setup** — Step-by-step guidance for configuring a Glean MCP server in Cursor
- **mcp-status** — Check which Glean MCP servers are configured and active

### Rules (always active)

- **glean-tool-selection** — Ensures the correct Glean tool is used for each query type (people vs. docs vs. code vs. meetings)
- **glean-result-vetting** — Enforces quality filtering before presenting Glean results

## Next Steps

After installing glean-core, install the feature plugins you need:

| Plugin | Purpose |
|--------|---------|
| [glean-search](../glean-search) | Enterprise document search |
| [glean-code](../glean-code) | Cross-repo code exploration |
| [glean-people](../glean-people) | People discovery and expertise |

## Support

- [Glean MCP Documentation](https://docs.glean.com/mcp)
- [GitHub Issues](https://github.com/gleanwork/cursor-plugins/issues)

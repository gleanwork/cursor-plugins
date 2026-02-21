# Glean Core

**Required foundation for all Glean plugins.**

This plugin provides shared skills, MCP tool guidance, always-on rules, and configuration commands that all other Glean plugins depend on.

## Installation

```bash
cursor plugin install glean-core
```

## What's Included

### Skills
- **glean-tools-guide** - Comprehensive guidance for selecting and using Glean MCP tools
- **enterprise-search** - Triggers for document search queries
- **confidence-signals** - Quality and reliability assessment for search results
- **people-lookup** - Triggers for people/org queries
- **meeting-context** - Triggers for meeting queries
- **synthesis-patterns** - Guidance for combining information from multiple sources

### Rules
- **glean-tool-selection** - Always-active guidance for choosing the right Glean tool
- **glean-result-vetting** - Always-active quality vetting framework for search results

### Commands
- `/glean-core:mcp-setup` - Configure your Glean MCP server connection
- `/glean-core:status` - Check MCP connection status

## Requirements

- Cursor IDE
- Glean MCP server configured in `~/.cursor/mcp.json` (run `/glean-core:mcp-setup` to configure)

## Next Steps

After installing glean-core, install the feature plugins you need:

| Plugin | Purpose |
|--------|---------|
| [glean-search](../glean-search) | Enterprise document search |
| [glean-code](../glean-code) | Cross-repo code exploration |
| [glean-people](../glean-people) | People discovery and expertise |

## Support

- Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/cursor-plugins/issues

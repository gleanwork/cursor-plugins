# Glean Plugins for Cursor

Official Glean plugins for Cursor IDE — enterprise knowledge, code search, and people discovery.

## What These Plugins Do

These plugins connect Cursor to your company's knowledge via [Glean MCP](https://docs.glean.com/administration/platform/mcp/about). They provide skills, agents, commands, and rules that help your AI assistant search enterprise documents, explore code across repositories, and find the right people.

## Prerequisites

You must have a Glean MCP server configured in your Cursor settings before using these plugins.

Add your Glean MCP server to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "glean": {
      "url": "https://YOUR-INSTANCE-be.glean.com/mcp/YOUR-SERVER-NAME"
    }
  }
}
```

Replace `YOUR-INSTANCE` with your Glean instance name and `YOUR-SERVER-NAME` with the server name provided by your Glean administrator.

## Plugins

### [glean-core](./glean-core)

**Required foundation for all other Glean plugins.**

Provides shared skills for tool selection and query optimization, always-on rules for result vetting, and MCP configuration commands.

- **6 Skills**: Tool selection guide, enterprise search, confidence signals, meeting context, people lookup, synthesis patterns
- **2 Rules**: Tool selection guidance, result quality vetting (always active)
- **2 Commands**: `/glean-core:mcp-setup`, `/glean-core:status`

### [glean-search](./glean-search)

**Enterprise search across documents, Slack, email, and other sources.**

- **1 Skill**: Enterprise search triggers
- **1 Agent**: `enterprise-searcher` — cross-source search with result vetting
- **1 Command**: `/glean-search:search <query>`

### [glean-code](./glean-code)

**Cross-repository code exploration.**

Search code across your org, find usage examples, identify code owners, and discover similar implementations.

- **2 Skills**: Code exploration, plan preparation
- **2 Agents**: `codebase-navigator`, `plan-prep-researcher`
- **5 Commands**: `/glean-code:codebase-context`, `/glean-code:find-examples`, `/glean-code:code-owners`, `/glean-code:similar-code`, `/glean-code:plan-prep`

### [glean-people](./glean-people)

**Find experts, understand org structure, and identify stakeholders.**

- **1 Agent**: `people-finder` — multi-signal people discovery
- **2 Commands**: `/glean-people:find-expert <topic>`, `/glean-people:stakeholders <change>`

## Installation

Install plugins from the Cursor marketplace or from a local path:

```bash
# Install the foundation plugin first
cursor plugin install glean-core

# Then install the feature plugins you need
cursor plugin install glean-search
cursor plugin install glean-code
cursor plugin install glean-people
```

## How It Works

These plugins use three component types:

- **Skills**: Auto-triggered guidance that helps the AI select the right Glean tools and apply quality filters
- **Agents**: Autonomous specialists spawned for complex multi-step tasks (e.g., cross-source search, code exploration)
- **Commands**: User-invoked structured workflows (e.g., `/glean-search:search authentication docs`)
- **Rules**: Always-active coding guidance that ensures proper tool usage and result vetting

All plugins require a configured Glean MCP server. They don't bundle MCP configuration — you bring your own server connection.

## Development

```bash
# Install dependencies
npm install

# Validate plugin structure
npm run validate

# Create a release
npm run release
```

## Support

- Glean MCP Documentation: https://docs.glean.com/mcp
- Issues: https://github.com/gleanwork/cursor-plugins/issues

## License

MIT

# Design: Consolidate Four Plugins into Single `glean` Plugin

**Date**: 2026-02-25
**Status**: Approved

## Background

Cursor's plugin marketplace surfaces each plugin as an independent entry with no grouping or dependency mechanism. The original four-plugin structure (glean-core, glean-search, glean-code, glean-people) was designed to let users install only what they need, but this intent doesn't come through in the UI. Cursor's team has recommended consolidating into a single plugin.

## Decision

Merge all four plugins into a single `glean/` directory containing all skills, agents, commands, and rules.

## New Structure

```
glean/
  .cursor-plugin/plugin.json
  assets/avatar.svg + avatar.png
  rules/
    glean-result-vetting.mdc        (from glean-core)
    glean-tool-selection.mdc        (from glean-core)
  skills/
    confidence-signals/             (glean-core)
    enterprise-search/              (glean-core version — canonical)
    glean-tools-guide/              (glean-core)
    mcp-setup/                      (glean-core)
    mcp-status/                     (glean-core)
    meeting-context/                (glean-core)
    people-lookup/                  (glean-core)
    synthesis-patterns/             (glean-core)
    search/                         (glean-search — unique)
    code-exploration/               (glean-code)
    code-owners/                    (glean-code)
    codebase-context/               (glean-code)
    find-examples/                  (glean-code)
    plan-prep/                      (glean-code)
    similar-code/                   (glean-code)
    find-expert/                    (glean-people)
    stakeholders/                   (glean-people)
  agents/
    enterprise-searcher.md          (glean-search)
    people-finder.md                (glean-people)
    codebase-navigator.md           (glean-code)
    plan-prep-researcher.md         (glean-code)
  commands/
    mcp-setup.md                    (glean-core)
    mcp-status.md                   (glean-core)
    search.md                       (glean-search)
    code-owners.md                  (glean-code)
    codebase-context.md             (glean-code)
    find-examples.md                (glean-code)
    plan-prep.md                    (glean-code)
    similar-code.md                 (glean-code)
    find-expert.md                  (glean-people)
    stakeholders.md                 (glean-people)
  README.md
  CHANGELOG.md
  LICENSE
```

## Content Decisions

- **enterprise-search skill**: glean-search had a duplicate that was a strict subset of the glean-core version. The glean-core version is kept; the glean-search duplicate is dropped.
- **All other content**: No name collisions across the remaining plugins. All skills, agents, commands, and rules are carried forward unchanged.

## Root-Level Changes

- `.cursor-plugin/marketplace.json`: Single plugin entry `{ name: "glean", source: "glean" }`
- `package.json` `files`: Updated to `["glean/**/*", ...]` replacing four separate paths
- `.release-it.json` bumper `out`: Single path `glean/.cursor-plugin/plugin.json` replacing four paths

## Deleted

- `glean-core/`
- `glean-search/`
- `glean-code/`
- `glean-people/`

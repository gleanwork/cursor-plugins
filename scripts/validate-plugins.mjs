#!/usr/bin/env node

/**
 * Validates the Cursor plugin repository structure.
 *
 * Checks:
 * - marketplace.json exists and has required fields
 * - Each plugin listed in marketplace.json exists
 * - Each plugin has a valid plugin.json
 * - Referenced component directories exist
 * - Skills have SKILL.md files
 * - Agents have .md files with required frontmatter
 * - Rules have .mdc files
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠️  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch (e) {
    error(`Failed to parse ${path}: ${e.message}`);
    return null;
  }
}

function validateMarketplace() {
  console.log('\n📦 Validating marketplace.json...');
  const marketplacePath = join(ROOT, '.cursor-plugin', 'marketplace.json');

  if (!existsSync(marketplacePath)) {
    error('marketplace.json not found at .cursor-plugin/marketplace.json');
    return null;
  }

  const marketplace = readJSON(marketplacePath);
  if (!marketplace) return null;

  if (!marketplace.name) error('marketplace.json missing "name"');
  else ok(`Name: ${marketplace.name}`);

  if (!marketplace.plugins || !Array.isArray(marketplace.plugins)) {
    error('marketplace.json missing "plugins" array');
    return null;
  }

  ok(`${marketplace.plugins.length} plugins listed`);
  return marketplace;
}

function validatePlugin(pluginEntry) {
  const pluginDir = resolve(ROOT, pluginEntry.source);
  console.log(`\n🔌 Validating plugin: ${pluginEntry.name}`);

  if (!existsSync(pluginDir)) {
    error(`Plugin directory not found: ${pluginEntry.source}`);
    return;
  }

  // Check plugin.json
  const pluginJsonPath = join(pluginDir, '.cursor-plugin', 'plugin.json');
  if (!existsSync(pluginJsonPath)) {
    error(`plugin.json not found at ${pluginEntry.source}/.cursor-plugin/plugin.json`);
    return;
  }

  const pluginJson = readJSON(pluginJsonPath);
  if (!pluginJson) return;

  if (!pluginJson.name) {
    error('plugin.json missing required "name" field');
  } else if (pluginJson.name !== pluginEntry.name) {
    error(`plugin.json name "${pluginJson.name}" doesn't match marketplace entry "${pluginEntry.name}"`);
  } else {
    ok(`plugin.json name: ${pluginJson.name}`);
  }

  if (pluginJson.version) ok(`Version: ${pluginJson.version}`);
  else warn('plugin.json missing "version"');

  if (pluginJson.description) ok(`Description: ${pluginJson.description.substring(0, 60)}...`);
  else warn('plugin.json missing "description"');

  // Reject commands — not a recognized Cursor plugin component type
  if (pluginJson.commands) {
    error(`plugin.json references "commands" directory — commands is not a Cursor plugin component type. Convert to skills or agents.`);
  }

  // Validate component directories
  if (pluginJson.skills) validateComponentDir(pluginDir, pluginJson.skills, 'skills');
  if (pluginJson.agents) validateComponentDir(pluginDir, pluginJson.agents, 'agents');
  if (pluginJson.rules) validateComponentDir(pluginDir, pluginJson.rules, 'rules');

  // Check logo asset exists
  if (pluginJson.logo) {
    const logoPath = join(pluginDir, pluginJson.logo);
    if (existsSync(logoPath)) ok(`Logo: ${pluginJson.logo}`);
    else warn(`Logo file not found: ${pluginJson.logo}`);
  } else {
    warn('plugin.json missing "logo"');
  }

  // Check README
  const readmePath = join(pluginDir, 'README.md');
  if (existsSync(readmePath)) ok('README.md exists');
  else warn('README.md not found');

  // Check CHANGELOG
  const changelogPath = join(pluginDir, 'CHANGELOG.md');
  if (existsSync(changelogPath)) ok('CHANGELOG.md exists');
  else warn('CHANGELOG.md not found');

  // Check LICENSE
  const licensePath = join(pluginDir, 'LICENSE');
  if (existsSync(licensePath)) ok('LICENSE exists');
  else warn('LICENSE not found');
}

function validateComponentDir(pluginDir, relPath, type) {
  const dirPath = join(pluginDir, relPath);

  if (!existsSync(dirPath)) {
    error(`${type} directory not found: ${relPath}`);
    return;
  }

  const entries = readdirSync(dirPath);
  if (entries.length === 0) {
    warn(`${type} directory is empty: ${relPath}`);
    return;
  }

  let count = 0;

  if (type === 'skills') {
    // Skills are in subdirectories with SKILL.md
    for (const entry of entries) {
      const entryPath = join(dirPath, entry);
      if (statSync(entryPath).isDirectory()) {
        const skillFile = join(entryPath, 'SKILL.md');
        if (existsSync(skillFile)) {
          count++;
          validateFrontmatter(skillFile, ['name', 'description']);
        } else {
          warn(`Skill directory "${entry}" missing SKILL.md`);
        }
      }
    }
  } else if (type === 'agents') {
    // Agents are .md files directly in the agents/ directory
    for (const entry of entries) {
      if (entry.endsWith('.md')) {
        count++;
        const filePath = join(dirPath, entry);
        validateFrontmatter(filePath, ['name', 'description']);
      }
    }
  } else if (type === 'rules') {
    // Rules are .mdc files
    for (const entry of entries) {
      if (entry.endsWith('.mdc')) {
        count++;
        const filePath = join(dirPath, entry);
        validateRuleFrontmatter(filePath);
      }
    }
  }

  ok(`${type}: ${count} found`);
}

function validateFrontmatter(filePath, requiredFields) {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    error(`${filePath}: Missing YAML frontmatter`);
    return;
  }

  const frontmatter = match[1];
  for (const field of requiredFields) {
    const regex = new RegExp(`^${field}:`, 'm');
    if (!regex.test(frontmatter)) {
      error(`${filePath}: Missing required frontmatter field "${field}"`);
    }
  }
}

function validateRuleFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    error(`${filePath}: Missing YAML frontmatter`);
    return;
  }

  const frontmatter = match[1];
  if (!/^description:/m.test(frontmatter)) {
    error(`${filePath}: Missing required frontmatter field "description"`);
  }
  if (!/^alwaysApply:/m.test(frontmatter) && !/^globs:/m.test(frontmatter)) {
    warn(`${filePath}: Rule has neither "alwaysApply" nor "globs" — it may never activate`);
  }
}

// Main
console.log('🔍 Cursor Plugin Validation');
console.log('='.repeat(50));

const marketplace = validateMarketplace();

if (marketplace) {
  for (const plugin of marketplace.plugins) {
    validatePlugin(plugin);
  }
}

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results: ${errors} errors, ${warnings} warnings`);

if (errors > 0) {
  console.log('\n💥 Validation FAILED');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n✅ Validation PASSED (with warnings)');
} else {
  console.log('\n✅ Validation PASSED');
}

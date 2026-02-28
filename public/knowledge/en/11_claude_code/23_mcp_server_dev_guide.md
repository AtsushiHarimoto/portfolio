# MCP Server Development Guide

> **Type**: Development Guide
> **Date**: 2026-02-26
> **Status**: Skeleton
> **Related**: `12_diagrams/08.Moyin_MCP_Architecture.md`, `11_vibecoding_agent_mcp.md`

---

## Summary

Model Context Protocol (MCP) is an open protocol proposed by Anthropic that enables LLMs to connect to external tools and data sources in a standardized way. This guide covers MCP Server fundamentals, the development workflow, testing, and deployment.

---

## 1. MCP Core Concepts

### 1.1 Protocol Roles

```
Host (Claude Code / IDE)
  +-- Client (MCP Client, built into the Host)
        +-- Server (the MCP Server you develop)
              +-- Resources / Tools / Prompts
```

### 1.2 Three Primitives

| Primitive | Purpose | Analogy |
|------|------|------|
| **Tools** | Functions the Agent can call | REST API endpoint |
| **Resources** | Readable data sources | GET endpoint / file |
| **Prompts** | Predefined prompt templates | Slash command |

### 1.3 Transport Methods

| Transport | Use Case | Characteristics |
|------|----------|------|
| **stdio** | Local Server | Simplest; inter-process communication |
| **SSE (HTTP)** | Remote Server | Cross-network support; requires auth handling |
| **Streamable HTTP** | Recommended for new builds | Supports bidirectional streaming |

---

## 2. Development Workflow

### 2.1 Technology Selection

| Language | SDK | Use Case |
|------|-----|----------|
| TypeScript | `@modelcontextprotocol/sdk` | Frontend ecosystem, rapid prototyping |
| Python | `mcp` (PyPI) | Data processing, ML integration |

### 2.2 Minimal Viable Server (TypeScript)

```typescript
// Skeleton illustration, not production code
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Register a Tool
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2.3 Development Steps

```
1. Define requirements -> What problem does this Server solve?
2. Design Tool Schema -> Input/output JSON Schema
3. Implement Handler -> Business logic
4. Local testing -> MCP Inspector / manual testing
5. Configure in Claude Code -> settings.json
6. Integration testing -> Verify in actual conversations
7. Deploy -> Local stdio or remote HTTP
```

---

## 3. Tool Design Best Practices

### 3.1 Naming Conventions

- Start with a verb: `get_`, `create_`, `search_`, `validate_`
- Clear descriptions: The Tool description is how the Agent decides which tool to use
- Avoid ambiguity: `process_data` -- bad -> `parse_csv_to_json` -- good

### 3.2 Schema Design

| Principle | Description |
|------|------|
| Minimal parameters | Expose only necessary parameters to reduce Agent errors |
| Explicit types | Use enums to constrain options; use descriptions to clarify formats |
| Sensible defaults | Provide default values to reduce required fields |
| Structured errors | Return structured error messages, not raw strings |

### 3.3 Security Considerations

- Never trust Agent input -> validate all parameters
- Restrict file access scope -> whitelist directories
- Sensitive operations require confirmation -> return confirmation prompts for Agent to double-check
- Prevent command injection -> never concatenate shell commands directly

---

## 4. Testing

### 4.1 Testing Tools

| Tool | Purpose |
|------|------|
| MCP Inspector | Official GUI testing tool with visual Tool call inspection |
| `npx @anthropic/mcp-inspector` | Quick-launch Inspector |
| Unit tests | Directly test handler functions |

### 4.2 Testing Checklist

- [ ] Normal input -> expected output
- [ ] Edge cases -> empty strings, excessively long input, special characters
- [ ] Error handling -> invalid parameters, external service unavailable
- [ ] Timeout handling -> interruption behavior for long-running operations

---

## 5. Configuration & Deployment

### 5.1 Claude Code Configuration (settings.json)

```jsonc
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server/index.js"],
      "env": {
        "API_KEY": "..."
      }
    }
  }
}
```

### 5.2 Configuration Levels

| Level | Location | Scope |
|------|------|------|
| Project-level | `.mcp.json` (project root) | Shared across the team |
| User-level | `~/.claude/settings.json` | Personal / global |

---

## 6. Existing Moyin MCP Servers

> TODO: Inventory of MCP Servers developed/used in the Moyin project

| Server | Purpose | Location |
|--------|------|------|
| (To be inventoried) | | |

---

## To Be Explored

- [ ] Development guide for Resource and Prompt primitives
- [ ] Implementation details for SSE / Streamable HTTP transport
- [ ] MCP Server authentication and authorization strategies
- [ ] Mapping to the Tool Layer in `21_agent_system_design.md`
- [ ] Server performance optimization and connection pooling

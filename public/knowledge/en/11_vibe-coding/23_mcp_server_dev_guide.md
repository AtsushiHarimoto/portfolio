# MCP Server Development Guide: Connecting LLMs to External Tools & Data Sources (MCP Dev Guide)

## @Overview

The Model Context Protocol (MCP) is an open protocol introduced by Anthropic that allows Large Language Models (LLMs) to connect to external tools and data sources in a standardized way. This guide covers the principles, development workflow, testing, and deployment of an MCP Server.

---

## 1. Core MCP Concepts

### 1.1 Protocol Architecture

```text
Host (Claude Code / IDE)
  └── Client (The MCP Client built into the Host)
        └── Server (The MCP Server you develop)
              └── Resources / Tools / Prompts
```

### 1.2 The Three Primitives

- **Tools**: Executable functions for the Agent. Think of them as REST API endpoints.
- **Resources**: Readable data sources. Think of them as GET endpoints or local files.
- **Prompts**: Predefined prompt templates, similar to slash commands.

---

## 2. Development Workflow (TypeScript Example)

### 2.1 Minimal Viable Server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Register a Tool
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// Start the Server (using stdio transport)
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2.2 Development Steps

1.  **Define Requirements**: What problem is this server meant to solve?
2.  **Design Tool Schema**: Define the input/output JSON Schema (ensure AI-friendly descriptions).
3.  **Implement Handler**: Write the actual business logic.
4.  **Local Testing**: Use the `MCP Inspector` for visual debugging.
5.  **Configure in Claude Code**: Add the server to your `settings.json`.

---

## 3. Best Practices for Tool Design

### 3.1 Naming and Context

- **Naming**: Start with verbs (e.g., `get_data`, `search_files`, `validate_id`).
- **Description**: The description is the _only_ piece of information the AI has to decide whether to use your tool. Make it precise.
- **Minimal Arguments**: Keep arguments simple to reduce the probability of the AI making a mistake.

### 3.2 Security and Safety

- **Input Validation**: Never trust the Agent's input. Always validate parameters on the server side.
- **Access Scoping**: Restrict file or API access to specific whitelisted targets.
- **Sensitive Operations**: Return a confirmation prompt for destructive actions, forcing the Agent to ask the user for permission.

---

## 4. Debugging and Testing

- **MCP Inspector**: An official GUI testing tool. Run `npx @anthropic/mcp-inspector` to launch it and visually test your tools.
- **Unit Testing**: It is highly recommended to write direct unit tests for your handler functions.

---

## 5. Configuration & Deployment

Add your server to the `mcpServers` section of your configuration file (e.g., `~/.claude/settings.json`).

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/server/index.js"],
      "env": { "API_KEY": "..." }
    }
  }
}
```

By standardizing your tool integrations with MCP, you allow your AI Agent to become a powerful, multi-capable extension of your development environment.

---

👉 **[Next Step: Mastering Claude Agent SDK](./24_claude_agent_sdk.md)**

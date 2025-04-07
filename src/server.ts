/// <reference lib="deno.ns" />

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { handleTool, TOOLS } from "./tools/index.ts";

const server = new Server(
  {
    name: "my-utility",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: Object.fromEntries(TOOLS.map((tool) => [tool.name, tool])),
    },
  },
);

server.setRequestHandler(ListResourcesRequestSchema, () => ({ resources: [] }));
server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, (request: CallToolRequest) => {
  const name = request.params.name;
  const args = request.params.arguments ?? {};

  return handleTool(name, args);
});

await server.connect(new StdioServerTransport());
console.error("MCP server running on stdio");

export { server };

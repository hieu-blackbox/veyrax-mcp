import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { GetToolsTool } from "./tools/get-tools";
import { ToolCallTool } from "./tools/tool-call";

const server = new McpServer({
  name: "veyrax-mcp",
  version: "0.0.1",
});

new GetToolsTool().register(server);
new ToolCallTool().register(server);

const transport = new StdioServerTransport();

server.connect(transport);
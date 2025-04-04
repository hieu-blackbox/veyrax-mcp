import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { GetToolsTool } from "./tools/get-tools";
import { ToolCallTool } from "./tools/tool-call";
import { GetFlowTool } from "./tools/get-flow";

const server = new McpServer({
  name: "veyrax-mcp",
  version: "0.0.1",
});

new GetToolsTool().register(server);
new ToolCallTool().register(server);
new GetFlowTool().register(server);

import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
const app = express();

let transport: SSEServerTransport;

app.get("/sse", (req, res) => {
    console.log("Received connection");
    transport = new SSEServerTransport("/messages", res);
    server.connect(transport);
});

app.post("/messages", (req, res) => {
    console.log("Received message handle message");
    if (transport) {
        transport.handlePostMessage(req, res);
    }
});

const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

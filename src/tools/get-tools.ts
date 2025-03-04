import { z } from "zod";
import { BaseTool } from "../lib/base-tool";
import { veyraxClient } from "../lib/client";

const toolName = "get_tools";
const toolDescription = `
"Use this tool to retrieve a list of available tools from the Veyrax API.
This will return dynamic tools that user has access to.
You can use this tool to get the list of tools, method names and parameters, and then use tool_call tool to call the tool with the provided parameters."
`;

export class GetToolsTool extends BaseTool {
  name = toolName;
  description = toolDescription;

  schema = z.object({});

  async execute() {
    try {
      const { data } = await veyraxClient.get("/get-tools");

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      throw error;
    }
  }
}
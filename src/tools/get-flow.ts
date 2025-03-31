import { z } from "zod";
import { BaseTool } from "../lib/base-tool";
import { veyraxClient } from "../lib/client";

const toolName = "get_flow";
const toolDescription = `
"Use this tool to retrieve a specific workflow by its ID.

Workflow is sequence of steps that are executed in order to get some result. Flow comes with description, steps and input schema of all methods to call.

You can call this tool once you have a flowId which usually you can get from: user directly OR using get-tools method."
`;

export class GetFlowTool extends BaseTool {
  name = toolName;
  description = toolDescription;

  schema = z.object({
    flowId: z.string().describe("The ID of the workflow to retrieve."),
  });

  async execute({ flowId }: z.infer<typeof this.schema>) {
    try {
      const { data } = await veyraxClient.get(`/flow/get-flow/${flowId}`);

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
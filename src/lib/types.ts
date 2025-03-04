export interface Tool {
  methods: {
    [methodName: string]: {
      parameters: {
        [paramName: string]: string;
      };
    };
  };
}

export interface GetToolsResponse {
  tools: {
    [toolName: string]: Tool;
  };
}

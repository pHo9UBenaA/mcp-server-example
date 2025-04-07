/** Result of tool handler */
export type ToolResult = {
  content: {
    type: string;
    text: string;
  }[];
  isError: boolean;
};

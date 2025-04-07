// @ts-types="@modelcontextprotocol/sdk/types.js"

import { Tool } from "@modelcontextprotocol/sdk/types.js";

import type { ToolResult } from "./types.ts";

const getStringLengthTool = {
  name: "getStringLength",
  description: "文字列の長さを取得する",
  inputSchema: {
    type: "object",
    properties: {
      input: { type: "string", description: "入力文字列" },
    },
    required: ["input"],
  },
} as const satisfies Tool;

const handleGetStringLength = (args: Record<string, unknown>): ToolResult => {
  const input = args.input;

  if (typeof input !== "string") {
    return {
      content: [
        {
          type: "text",
          text:
            `入力は文字列である必要があります。${typeof input}が与えられました`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `${Array.from(input).length}`,
      },
    ],
    isError: false,
  };
};

const getStringLength = {
  tool: getStringLengthTool,
  handler: handleGetStringLength,
};

export default getStringLength;

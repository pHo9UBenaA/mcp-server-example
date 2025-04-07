/// <reference lib="deno.ns" />

import { Tool } from "@modelcontextprotocol/sdk/types.ts";

import type { ToolResult } from "./types.ts";
import getStringLength from "./getStringLength.ts";

export const TOOLS = [
  getStringLength.tool,
] as const satisfies Tool[];

export const handleTool = (
  name: string,
  args: { [key: string]: unknown },
): ToolResult => {
  switch (name) {
    case "getStringLength":
      return getStringLength.handler(args);
    default:
      return {
        content: [
          {
            type: "text",
            text: `不明なツール: ${name}`,
          },
        ],
        isError: true,
      };
  }
};

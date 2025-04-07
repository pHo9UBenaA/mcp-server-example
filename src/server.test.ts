/// <reference lib="deno.ns" />

import { server } from "./server.ts";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { assertEquals } from "@std/assert";

const prepareMCP = async () => {
  const client = new Client(
    {
      name: "test-client",
      version: "1.0",
    },
    {
      capabilities: {},
    },
  );

  const [clientTransport, serverTransport] = InMemoryTransport
    .createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  return { client, server };
};

Deno.test("getStringLength", async () => {
  const { client } = await prepareMCP();

  const result = await client.callTool({
    name: "getStringLength",
    arguments: {
      input: "こんにちは、世界！",
    },
  });

  assertEquals(result, {
    content: [{ type: "text", text: "9" }],
    isError: false,
  });

  const resultEn = await client.callTool({
    name: "getStringLength",
    arguments: {
      input: "Hello, world!",
    },
  });

  assertEquals(resultEn, {
    content: [{ type: "text", text: "13" }],
    isError: false,
  });
});

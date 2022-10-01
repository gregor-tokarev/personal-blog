import { Client } from "@notionhq/client";

console.log(process.env.NOTION_TOKEN);
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

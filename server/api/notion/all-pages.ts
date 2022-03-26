import { IncomingMessage, ServerResponse } from "http";
import { notionClient } from "~/server/api/notion-client";

export default async function (req: IncomingMessage, res: ServerResponse) {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return response.results
    .filter((page) => !page.archived)
    .map((page) => ({
      id: page.id,
      lastEdit: page.last_edited_time,
      coverUrl: page.cover?.external.url,
      title: page.properties.Name.title[0].plain_text,
    }))
    .filter((page) => page.coverUrl);
}

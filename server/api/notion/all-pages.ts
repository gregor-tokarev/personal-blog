import { notionClient } from "~/server/api/notion-client";
import { Point } from "~/types/point";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
    archived: false,
    sorts: [
      {
        property: "createdDate",
        direction: "descending",
      },
    ],
    filter: {
      and: [
        {
          property: "stage",
          select: {
            equals: "published",
          },
        },
      ],
    },
  });

  return response.results
    .map<Point>((page) => ({
      id: page.id,
      last_edit: page.last_edited_time,
      cover_url: page.cover?.external.url,
      title: page.properties.Name.title[0].plain_text,
      intro: page.properties.intro.rich_text[0].plain_text,
    }))
    .filter((page) => page.cover_url && page.intro);
});

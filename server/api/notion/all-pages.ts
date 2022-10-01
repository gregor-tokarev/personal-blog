import { notionClient } from "~/server/api/notion-client";
import { Point } from "~/types/point";

export default async function () {
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
      lastEdit: page.last_edited_time,
      coverUrl: page.cover?.external.url,
      title: page.properties.Name.title[0].plain_text,
      intro: page.properties.intro.rich_text[0].plain_text,
    }))
    .filter((page) => page.coverUrl && page.intro);
}

import { notionClient } from "~/server/api/notion-client";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const pageId = query.pageId as string;

  const blocksReq = notionClient.blocks.children.list({
    block_id: pageId,
  });
  const pageReq = notionClient.pages.retrieve({
    page_id: pageId,
  });

  const [page, blocks] = await Promise.all([pageReq, blocksReq]);

  return {
    page,
    blocks,
  };
});

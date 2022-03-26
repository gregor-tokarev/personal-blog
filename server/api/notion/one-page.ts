import { IncomingMessage, ServerResponse } from "http";
import { notionClient } from "~/server/api/notion-client";
import { useQuery } from "h3";

export default async function (req: IncomingMessage, res: ServerResponse) {
  const query = useQuery(req);
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
}

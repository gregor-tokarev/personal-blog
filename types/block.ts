export type notionBlockType =
  | "paragraph"
  | "image"
  | "bulleted_list_item"
  | "heading_1";

export interface NotionBlockContent {
  captain?: string[];
  type?: "file";
  file?: {
    url: string;
    expiry_time: string;
  };
  rich_text?: {
    type: "text";
    text: {
      content: string;
      link?: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: string;
  }[];
  color?: string;
}

interface NotinBlockMeta {
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  type: notionBlockType;
}

export type notionBlock = NotinBlockMeta &
  Record<notionBlockType, NotionBlockContent>;

import { notionBlock, notionBlockType } from "~/types/block";

export class NotionParser {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly content: notionBlock[]) {}

  public getHtml(): string {
    let result = "";
    let list = "<ul>";
    this.content.forEach((block, index, array) => {
      if (block.type === "bulleted_list_item") {
        list += NotionParser.parseBlock(block);

        if (array[index + 1].type !== "bulleted_list_item") {
          list += "</ul>";
          result += list;
          list = "<ul>";
        }
      } else {
        result += NotionParser.parseBlock(block);
      }
    });

    return result;
  }

  private static line(block: string): string {
    return block ? `${block}\n` : "";
  }

  private static getText(block: notionBlock[notionBlockType]): string {
    if (block.rich_text) {
      return block.rich_text[0]?.plain_text ?? "";
    }
    return "";
  }

  private static getUrl(block: notionBlock["image"]): string {
    if (block.file) {
      return block.file.url;
    }
    return "";
  }

  private static parseBlock(block: notionBlock): string {
    if (block.type === "paragraph") {
      return NotionParser.line(
        `<p class="content-text">${NotionParser.getText(block.paragraph)}</p>`
      );
    } else if (block.type === "heading_1") {
      return NotionParser.line(
        `<h1 class="basic-title" id="${block.id}">${NotionParser.getText(
          block.heading_1
        )}</h1>`
      );
    } else if (block.type === "bulleted_list_item") {
      return NotionParser.line(
        `<li>${NotionParser.getText(block.bulleted_list_item)}</li>`
      );
    } else if (block.type === "image") {
      return NotionParser.line(
        `<img alt="" src="${NotionParser.getUrl(block.image)}"/>`
      );
    } else {
      return NotionParser.line("Unsupported block type");
    }
  }
}

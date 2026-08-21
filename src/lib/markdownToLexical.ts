/**
 * Converts a subset of Markdown to Payload's Lexical editor JSON format.
 * Handles: headings (##, ###), paragraphs, bold (**), bullet lists (-)
 */

type LexicalTextNode = {
  type: "text";
  text: string;
  format: number;
  mode: "normal";
  style: "";
  detail: 0;
  version: 1;
};

type LexicalParagraphNode = {
  type: "paragraph";
  children: LexicalTextNode[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};

type LexicalHeadingNode = {
  type: "heading";
  tag: "h2" | "h3";
  children: LexicalTextNode[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};

type LexicalListItemNode = {
  type: "listitem";
  value: number;
  checked: undefined;
  children: LexicalTextNode[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};

type LexicalListNode = {
  type: "list";
  listType: "bullet";
  start: 1;
  tag: "ul";
  children: LexicalListItemNode[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};

type LexicalNode = LexicalParagraphNode | LexicalHeadingNode | LexicalListNode;

// TEXT_FORMAT flags
const BOLD = 1;
// const ITALIC = 2; // reserved for future use

function parseInline(text: string): LexicalTextNode[] {
  const nodes: LexicalTextNode[] = [];
  const boldRegex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: "text", text: text.slice(lastIndex, match.index), format: 0, mode: "normal", style: "", detail: 0, version: 1 });
    }
    nodes.push({ type: "text", text: match[1], format: BOLD, mode: "normal", style: "", detail: 0, version: 1 });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push({ type: "text", text: text.slice(lastIndex), format: 0, mode: "normal", style: "", detail: 0, version: 1 });
  }

  return nodes.length > 0 ? nodes : [{ type: "text", text, format: 0, mode: "normal", style: "", detail: 0, version: 1 }];
}

function makeParagraph(text: string): LexicalParagraphNode {
  return { type: "paragraph", children: parseInline(text), direction: "ltr", format: "", indent: 0, version: 1 };
}

function makeHeading(tag: "h2" | "h3", text: string): LexicalHeadingNode {
  return { type: "heading", tag, children: parseInline(text), direction: "ltr", format: "", indent: 0, version: 1 };
}

function makeList(items: string[]): LexicalListNode {
  return {
    type: "list",
    listType: "bullet",
    start: 1,
    tag: "ul",
    children: items.map((item, i) => ({
      type: "listitem",
      value: i + 1,
      checked: undefined,
      children: parseInline(item),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    })),
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

export function markdownToLexical(markdown: string) {
  const lines = markdown.split("\n");
  const children: LexicalNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    if (trimmed.startsWith("### ")) {
      children.push(makeHeading("h3", trimmed.slice(4)));
      i++;
    } else if (trimmed.startsWith("## ")) {
      children.push(makeHeading("h2", trimmed.slice(3)));
      i++;
    } else if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      children.push(makeList(items));
    } else {
      children.push(makeParagraph(trimmed));
      i++;
    }
  }

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children,
    },
  };
}

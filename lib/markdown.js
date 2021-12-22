import markdownIt from "markdown-it";

let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
});

export function mdrender(content) {
  return markdownLibrary.render(content);
}

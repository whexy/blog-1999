import ReactMarkdown from "react-markdown";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";

let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
})
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    permalinkBefore: true,
  })
  .use(markdownItFootnote);

export function mdrender(content) {
  return markdownLibrary.render(content)
}

export default function MdContent({ content }) {
  // Markdown Callout
  markdownLibrary.use(require("markdown-it-container"), "callout", {
    validate: function (params) {
      return params.trim().match(/^callout\s+(.*)$/);
    },

    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^callout\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return (
          "<div class='callout'><div class='text-[1.1em] pt-4 -mb-4 font-semibold'>" +
          markdownLibrary.utils.escapeHtml(m[1]) +
          "</div>\n"
        );
      } else {
        return "</div>\n";
      }
    },
  });

  // Markdown Warn
  markdownLibrary.use(require("markdown-it-container"), "warn", {
    validate: function (params) {
      return params.trim().match(/^warn$/);
    },

    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^warn$/);
      if (tokens[idx].nesting === 1) {
        return "<div class='warn'>\n";
      } else {
        return "</div>\n";
      }
    },
  });
  return (
    <>
      {/* <ReactMarkdown>{content}</ReactMarkdown> */}
      <article
        dangerouslySetInnerHTML={{ __html: markdownLibrary.render(content) }}
      />
    </>
  );
}

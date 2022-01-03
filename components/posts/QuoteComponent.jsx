import React from "react";
import { mdrender } from "../../lib/markdown";

const QuoteComponent = ({ content, cite, subcite, children }) => (
  <div className="relative mx-2 px-2 py-4 rounded-lg secondbg border">
    <div
      className="mr-2 text-slate-500/20 absolute top-1 leading-none text-3xl"
      aria-hidden="true"
    >
      <i className="fas fa-quote-left"></i>
    </div>
    <div
      className="pl-8 pr-2 text-sm"
      dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
    ></div>
    {cite && (
      <div className="not-prose opacity-70 pr-2 text-right">
        <p className="text-sm font-bold">{cite}</p>
        {subcite && <p className="text-base">{subcite}</p>}
      </div>
    )}
  </div>
);
export default QuoteComponent;

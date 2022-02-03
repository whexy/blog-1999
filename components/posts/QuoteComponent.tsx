import React from "react";

const QuoteComponent = ({ cite, subcite, children }) => (
  <div className="relative mx-2 px-2 py-4 rounded-lg secondbg break-inside-avoid-page">
    <div
      className="mr-2 text-slate-500/20 absolute top-1 leading-none text-3xl"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-14 h-14 fill-slate-500/20"
        style={{ transform: "scale(-1, -1)" }}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.62 18h-5.24l2-4H13V6h8v7.24L18.62 18zm-2-2h.76L19 12.76V8h-4v4h3.62l-2 4zm-8 2H3.38l2-4H3V6h8v7.24L8.62 18zm-2-2h.76L9 12.76V8H5v4h3.62l-2 4z" />
      </svg>
    </div>
    <div className="pl-8 pr-2 text-sm">{children}</div>
    {cite && (
      <div className="not-prose opacity-70 pr-2 text-right">
        <p className="text-sm font-bold">{cite}</p>
        {subcite && <p className="text-base">{subcite}</p>}
      </div>
    )}
  </div>
);
export default QuoteComponent;

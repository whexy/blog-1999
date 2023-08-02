import React from "react";

const QuoteComponent = ({ cite, subcite, url, children }) => {
  return (
    <div className="secondbg relative mx-2 break-inside-avoid-page rounded-lg px-2 py-4">
      <div
        className="absolute top-1 mr-2 text-3xl leading-none text-slate-500/20"
        aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-14 w-14 fill-slate-500/20"
          style={{ transform: "scale(-1, -1)" }}>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18.62 18h-5.24l2-4H13V6h8v7.24L18.62 18zm-2-2h.76L19 12.76V8h-4v4h3.62l-2 4zm-8 2H3.38l2-4H3V6h8v7.24L8.62 18zm-2-2h.76L9 12.76V8H5v4h3.62l-2 4z" />
        </svg>
      </div>
      <div className="pl-8 pr-2 text-sm">{children}</div>
      {cite && (
        <div className="not-prose pr-2 text-right opacity-70">
          {url ? (
            <a href={url}>
              <p className="text-sm font-bold">{cite}</p>
            </a>
          ) : (
            <p className="text-sm font-bold">{cite}</p>
          )}
          {subcite && <p className="text-base">{subcite}</p>}
        </div>
      )}
    </div>
  );
};

export default QuoteComponent;

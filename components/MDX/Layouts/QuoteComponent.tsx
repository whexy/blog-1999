import React from "react";

const QuoteComponent = ({ cite, subcite, url, children }) => {
  return (
    <div className="not-prose relative mx-auto my-8 max-w-4xl break-inside-avoid-page">
      {/* Main quote container */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-gray-100/80 via-gray-50/60 to-gray-100/40 p-8 shadow-sm backdrop-blur-xl">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50/30 via-transparent to-slate-50/20" />

        {/* Large opening quote mark */}
        <div className="absolute left-6 top-4 select-none font-serif text-6xl leading-none text-gray-300/60">
          &ldquo;
        </div>

        {/* Quote content with proper spacing */}
        <div className="relative ml-8 mr-4">
          <blockquote className="text-base font-medium leading-relaxed tracking-wide text-gray-800">
            {children}
          </blockquote>

          {/* Closing quote mark */}
          <div className="ml-1 inline select-none font-serif text-2xl text-gray-300/60">
            &rdquo;
          </div>
        </div>

        {/* Citation section */}
        {cite && (
          <div className="relative ml-8 mt-6 border-l-2 border-gray-200/50 pl-4">
            {url ? (
              <a
                href={url}
                className="group block transition-all duration-200 hover:translate-x-1"
                target="_blank"
                rel="noopener noreferrer">
                <div className="text-sm font-semibold text-gray-600 transition-colors group-hover:text-gray-800">
                  — {cite}
                </div>
                {subcite && (
                  <div className="mt-0.5 text-sm text-gray-500 transition-colors group-hover:text-gray-600">
                    {subcite}
                  </div>
                )}
              </a>
            ) : (
              <div>
                <div className="text-sm font-semibold text-gray-600">
                  — {cite}
                </div>
                {subcite && (
                  <div className="mt-0.5 text-sm text-gray-500">
                    {subcite}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full bg-gradient-to-br from-gray-400/40 to-slate-100/40 blur-xl" />
        <div className="absolute bottom-8 left-4 h-12 w-12 rounded-full bg-gradient-to-br from-gray-400/30 to-slate-100/30 blur-lg" />
      </div>
    </div>
  );
};

export default QuoteComponent;

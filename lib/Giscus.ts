import type {
  Theme,
  InputPosition,
  AvailableLanguage,
} from "@giscus/react";

interface ISetConfigMessage {
  setConfig: {
    theme?: Theme;
    repo?: string;
    term?: string;
    number?: number;
    category?: string;
    reactionsEnabled?: boolean;
    emitMetadata?: boolean;
    inputPosition?: InputPosition;
    lang?: AvailableLanguage;
  };
}

function sendMessage(message: ISetConfigMessage) {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame",
  );
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    { giscus: message },
    "https://giscus.app",
  );
}

export const toDarkTheme = () => {
  sendMessage({
    setConfig: {
      theme: "dark_dimmed",
    },
  });
};

export const toLightTheme = () => {
  sendMessage({
    setConfig: {
      theme: "light",
    },
  });
};

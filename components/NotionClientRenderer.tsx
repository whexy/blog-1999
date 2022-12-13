"use client";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(m => m.Code),
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    m => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then(
    m => m.Equation,
  ),
);
const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then(
      m => m.Modal,
    ),
  {
    ssr: false,
  },
);

type RenderProps = React.ComponentProps<typeof NotionRenderer>;

export default function NotionClientRenderer(props: RenderProps) {
  return (
    <NotionRenderer
      mapPageUrl={pageId => `/dyn/${pageId}`}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
      }}
      {...props}
    />
  );
}

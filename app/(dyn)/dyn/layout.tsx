// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

export default function NotionLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

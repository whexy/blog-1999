// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import React from "react";

export default function NotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

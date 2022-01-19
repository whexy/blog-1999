import metadata from "../data/metadata";
import Avatar from "../public/img/notion-avatar.svg";

export default function Footer() {
  return (
    <footer className="mx-auto sm:max-w-3xl {{ bgcolor or 'bg-black-readable'}}">
      <div className="mx-4 my-10 select-none">
        <div className="text-center fill-white">
          <Avatar className="mx-auto w-16 h-16" />
          <p className="text-white pb-2">{metadata.author.name}&apos;s Blog</p>
          <p className="text-xs text-jbgray-light font-light">
            Copyright © 2014-{metadata.year}
          </p>
          <p className="text-xs py-1 text-jbgray-light tracking-tight">
            Built with <a href="https://nextjs.org/">Next.js</a>,{" "}
            <a href="https://reactjs.org/">React</a>,{" "}
            <a href="https://reactjs.org/">Node.js</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

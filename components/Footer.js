import metadata from "../data/metadata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="mx-auto sm:max-w-3xl {{ bgcolor or 'bg-black-readable'}}">
      <div className="mx-4 my-10 select-none">
        <div className="text-center">
          <div className="text-sm py-1 flex space-x-2 items-center justify-center text-white-readable">
            <p>Copyright © 2014-{metadata.year}</p>
            <FontAwesomeIcon icon={faCat} className="text-red-500 w-6 h-6" />
            <p>{metadata.author.name}&apos;s Blog.</p>
          </div>
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

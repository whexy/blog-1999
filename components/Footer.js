import metadata from "../data/metadata";

export default function Footer() {
  return (
    <footer className="mx-auto sm:max-w-3xl {{ bgcolor or 'bg-black-readable'}}">
      <div className="mx-4 my-10 select-none">
        <div className="text-center">
          <p className="text-sm py-1 flex space-x-2 justify-center text-white-readable">
            <span>Copyright © 2014-{metadata.year}</span>
            <span>
              <i className="fas fa-cat text-red-500 text-xl"></i>
            </span>
            <span>{metadata.author.name}&apos;s Blog.</span>
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

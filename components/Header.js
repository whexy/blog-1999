import metadata from "../metadata";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto sm:max-w-3xl text-gray-400 border-red-500 border-b bg-black-readable relative z-50">
      <div className="flex flex-row justify-center items-center space-x-8 py-4">
        <Link href="/">
          <a>
            <h1 className="text-xl sm:text-2xl font-mono text-center text-white-readable">
              <span className="text-white">{metadata.header.logo}</span>
              <sup className="text-red-500">{metadata.header.sublogo}</sup>
            </h1>
          </a>
        </Link>
        {/* <div className="sm:flex-1 sm:flex sm:flex-row sm:justify-end">
            <div className="flex flex-row overflow-hidden flex-nowrap text-lg sm:text-xl font-light justify-center items-center divide-x divide-jbgray-light divide-opacity-10">
                {%- for entry in collections.all | eleventyNavigation %}
                    <a className=" {{ 'text-gray-200 font-semibold' if entry.url == page.url }} px-2 select-none" href="{{ entry.url | url }}">{{ entry.title }}</a>
                {%- endfor %}
            </div>
        </div> */}
      </div>
    </header>
  );
}

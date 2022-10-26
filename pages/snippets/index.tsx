import pick from "lodash/pick";
import { allSnippets } from "contentlayer/generated";
import PageTitle from "@/components/tiny/PageTitle";
import Main from "@/components/Main";
import type { InferGetStaticPropsType } from "next";

import Link from "next/link";

const FunctionCard = ({ title, description, slug, ...rest }) => {
  return (
    (<Link
      href={`/snippets/${slug}`}
      className="secondbg w-full rounded p-4"
      {...rest}>

      <h3 className="mt-2 text-left text-lg font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-1 text-gray-700 dark:text-gray-400">
        {description}
      </p>

    </Link>)
  );
};

export default function Snippets({
  snippets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Main>
      <PageTitle title={"Code Snippets"} emoji="📋" />
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Snippets are a new way to share my daily work without having
        to write an entire post. In snippets, I describe how to solve
        problems quickly in concise, step-by-step language.
      </p>
      <div className="grid w-full grid-cols-1 gap-4 pt-2 pb-4 sm:grid-cols-2">
        {snippets.map(snippet => (
          <FunctionCard
            key={snippet.slug}
            title={snippet.title}
            slug={snippet.slug}
            description={snippet.description}
          />
        ))}
      </div>
    </Main>
  );
}

export function getStaticProps() {
  const snippets = allSnippets.map(snippet =>
    pick(snippet, ["slug", "title", "logo", "description"]),
  );
  return { props: { snippets } };
}

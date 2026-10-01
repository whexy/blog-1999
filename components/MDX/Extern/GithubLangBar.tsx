import { getRepoLanguages } from "@/lib/github";

/**
 * Colors from github-linguist (lib/linguist/languages.yml) for the
 * languages most likely to show up in the embedded repos. Anything
 * else falls back to a neutral gray.
 */
const languageColors: Record<string, string> = {
  Assembly: "#6E4C13",
  C: "#555555",
  "C#": "#178600",
  "C++": "#f34b7d",
  CMake: "#DA3434",
  CSS: "#663399",
  Dart: "#00B4AB",
  Dockerfile: "#384d54",
  Go: "#00ADD8",
  HTML: "#e34c26",
  Haskell: "#5e5086",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  "Jupyter Notebook": "#DA5B0B",
  Kotlin: "#A97BFF",
  Lua: "#000080",
  MDX: "#fcb32c",
  Makefile: "#427819",
  Meson: "#007800",
  Nix: "#7e7eff",
  "Objective-C": "#438eff",
  OCaml: "#ef7a08",
  PHP: "#4F5D95",
  Perl: "#0298c3",
  PowerShell: "#012456",
  Python: "#3572A5",
  Ruby: "#701516",
  Rust: "#dea584",
  SCSS: "#c6538c",
  Scala: "#c22d40",
  Shell: "#89e051",
  Swift: "#F05138",
  TeX: "#3D6117",
  TypeScript: "#3178c6",
  Vue: "#41b883",
  Zig: "#ec915c",
};

const fallbackColor = "#a3a3a3"; // neutral-400

interface GithubLangBarProps {
  repo: string;
}

/**
 * Thin proportional language bar (like the one on GitHub's repo
 * page), rendered on the server from the languages API. Renders
 * nothing when the data is unavailable.
 */
const GithubLangBar = async ({ repo }: GithubLangBarProps) => {
  const languages = await getRepoLanguages(repo);
  const entries = Object.entries(languages ?? {}).filter(
    ([, bytes]) => bytes > 0,
  );
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return null;

  const segments = entries
    .sort(([, a], [, b]) => b - a)
    .map(([name, bytes]) => ({
      name,
      percent: (bytes / total) * 100,
      color: languageColors[name] ?? fallbackColor,
    }));
  const label = segments
    .map(s => `${s.name} ${s.percent.toFixed(1)}%`)
    .join(", ");

  return (
    <div title={label}>
      <div className="flex h-1.5 w-full" aria-hidden="true">
        {segments.map(s => (
          <span
            key={s.name}
            className="h-full"
            style={{
              width: `${s.percent}%`,
              backgroundColor: s.color,
            }}
          />
        ))}
      </div>
      <ul className="sr-only">
        {segments.map(s => (
          <li key={s.name}>
            {s.name} {s.percent.toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubLangBar;

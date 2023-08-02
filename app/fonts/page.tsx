import PageTitle from "@/components/UI/Website/PageTitle";

interface FontUsage {
  name: string;
  license: string;
  fontClassName: string;
  showCase?: string;
}

const fonts: FontUsage[] = [
  {
    name: "Lato",
    license: "Open Font License",
    fontClassName: "var(--font-lato)",
  },
  {
    name: "Fira Sans",
    license: "Open Font License",
    fontClassName: "var(--font-fira)",
  },
  {
    name: "Input Mono (Narrow)",
    license: "Adobe Fonts Licensing (Paid)",
    fontClassName: "input-mono-narrow",
    showCase: "auto foo = *(int *)0xdeadbeef;",
  },
  {
    name: "思源黑体",
    license: "Open Font License",
    fontClassName: "var(--font-notosans)",
    showCase: "我能吞下玻璃而不伤身体",
  },
];

export default function Page() {
  return (
    <div>
      <PageTitle title={"Fonts used on this website"} emoji={"🖋️"} />
      <div className="flex flex-col space-y-4 pb-4">
        {fonts.map(font => (
          <div key={font.name} className="primary rounded-lg p-4">
            <div className="justify-between sm:flex">
              <div
                id="font-name"
                style={{ fontFamily: font.fontClassName }}
                className="text-xl">
                {font.name}
              </div>
              <div>
                <p className="font-mono text-sm font-thin opacity-80">
                  {font.license}
                </p>
              </div>
            </div>
            <div style={{ fontFamily: font.fontClassName }}>
              {font.showCase ||
                "The quick brown fox jumps over the lazy dog"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Main from "@/components/Layouts/Main";
import Prose from "@/components/Layouts/Prose";
import Lyric from "@/components/Widgets/Lyric";

export default async function Page() {
  // fetch music data on server side, update every 10 minutes
  const resp = await fetch(
    "https://gist.githubusercontent.com/whexy/140120f032d8dec8ce716c1dc616716b/raw",
    { next: { revalidate: 600 } },
  );
  const musics = await resp.json();

  return (
    <Main>
      <div className="pb-5 pt-10">
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          height="450"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          className="mx-auto w-full rounded-lg"
          src="https://embed.music.apple.com/us/playlist/whexys-choice-2023/pl.u-DdANrYBuq4xqJe"
        />
      </div>
      {musics.map((music, index) => (
        <div className="bg-gray-100" key={index}>
          <article className="pb-5 pt-10 font-article">
            <Prose>
              <h2>
                #{index + 1} {music.title}
              </h2>
              <Lyric {...music} />
              <p>{music.comment}</p>
            </Prose>
          </article>
        </div>
      ))}
    </Main>
  );
}

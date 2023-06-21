import Lyric from "@/components/Widgets/Lyric";

export default function Page() {
  return (
    <div>
      <Lyric
        lyric={["给你一瓶魔法药水", "喝下去 就不需要氧气"]}
        song={"給你一瓶魔法藥水"}
        artist={"告五人"}
        img={
          "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/43/a9/fc/43a9fc88-3fe8-ad1a-6dfe-a222668465e5/196589267931.jpg/1000x1000bb.jpg"
        }
      />
    </div>
  );
}

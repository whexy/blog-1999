const Bilibili = ({
  aid,
  bvid,
  cid,
  danmu = false,
  wide = false,
}: {
  aid: string;
  bvid: string;
  cid: string;
  danmu: boolean;
  wide: boolean;
}) => {
  const danmu_opt = danmu ? 1 : 0;
  const wide_opt = wide ? 1 : 0;
  return (
    <div className="not-prose p-4">
      <iframe
        className="w-full aspect-[4/3]"
        src={`https://player.bilibili.com/player.html?aid=${aid}&;bvid=${bvid}&cid=${cid}&page=1&as_wide=${wide_opt}&high_quality=1&danmaku=${danmu_opt}`}
      />
    </div>
  );
};

export default Bilibili;

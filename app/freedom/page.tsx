export default function Page() {
  return (
    <div className="flex flex-col items-center px-4 pt-10">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#f65756] font-sans text-5xl text-white">
        !
      </div>
      <h1 className="py-5 text-xl font-bold">此内容因违规无法查看</h1>
      <p className="text-center">
        接相关投诉，此内容违反《中华人民共和国网络安全法》，查看
        <span className="text-[#5b6c83]">详细内容</span>
      </p>
    </div>
  );
}

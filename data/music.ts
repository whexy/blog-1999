interface Music {
  lyric: string | string[];
  song: string;
  artist: string;
  img: string;
  title: string;
  comment: string;
}

const musics: Music[] = [
  {
    lyric: [
      "我總是忽冷又忽熱",
      "隱藏我的感受",
      "只是怕愛你的心被你看透",
    ],
    song: "太聪明",
    artist: "陈绮贞",
    img: "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/3c/a2/21/3ca22123-14d6-57f4-9e52-aa4573a05b07/mzm.clkcarof.jpg/1000x1000bb.jpg",
    title: "我開始後悔不應該太聰明的賣弄",
    comment:
      "《太聪明》被网友誉为 “INTP 国歌”。因为它唱出了 INTP 小心翼翼的心路历程。学会大方地表达自己的情绪吧！",
  },
  {
    lyric: ["给你一瓶魔法药水", "喝下去 就不需要氧气"],
    song: "給你一瓶魔法藥水",
    artist: "告五人",
    img: "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/43/a9/fc/43a9fc88-3fe8-ad1a-6dfe-a222668465e5/196589267931.jpg/1000x1000bb.jpg",
    title: "擁有你 就不需要魔法給的勇氣",
    comment:
      "《给你一瓶魔法药水》，一首很俗气的歌。但正是它糖水般的词曲让来自宝岛台湾的告五人乐队在大陆互联网彻底打响了名气。个人觉得这首歌爆火的原因很简单：足够直白、足够浪漫。它传达了一个忧郁的时代迫切需要的温柔。",
  },
];

export default musics;

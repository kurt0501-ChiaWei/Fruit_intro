import { photos, type Photo } from "./photos";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  cover: Photo;
  body: Block[];
};

/** 由新到舊排列 */
export const posts: Post[] = [
  {
    slug: "pomelo-mid-autumn",
    title: "中秋前的一顆文旦：為什麼要先放幾天再吃？",
    excerpt: "文旦是中秋餐桌上的主角，但剛買回來的文旦，常常不是最好吃的時候。老一輩說的「辭水」，其實有它的道理。",
    category: "當季",
    date: "2026-09-15",
    readMinutes: 4,
    cover: photos.pomelo,
    body: [
      {
        type: "p",
        text: "每年八、九月，台南麻豆的文旦陸續採收，正好趕上中秋節。一家人圍著月餅和烤肉，桌上總少不了一顆剝開的文旦，小朋友頭上還頂著柚皮做的帽子。",
      },
      { type: "h2", text: "剛採下的文旦，水分太多" },
      {
        type: "p",
        text: "文旦剛採收時果皮飽滿、果肉含水量高，吃起來容易偏酸、口感也比較硬。所以很多人買回家後，會先放在陰涼通風處幾天到一兩週，讓果皮稍微變軟、表面出現細紋，這個過程俗稱「辭水」。",
      },
      {
        type: "p",
        text: "辭水之後，果肉的酸味會變得柔和，甜味更明顯，口感也更細緻。這就是為什麼常聽到「文旦要放一下再吃」。",
      },
      { type: "quote", text: "果皮從緊繃變得有一點皺，就是文旦在告訴你：可以吃了。" },
      { type: "h2", text: "怎麼挑一顆好文旦" },
      {
        type: "list",
        items: [
          "拿在手上有沉甸感，代表果肉飽滿多汁。",
          "底部較寬、呈穩定的「坐姿」，外型端正。",
          "果皮細緻、油胞明顯，顏色均勻帶淡黃綠。",
          "避免表面有軟爛、凹陷或明顯碰傷的果實。",
        ],
      },
      { type: "h2", text: "剝完別急著丟皮" },
      {
        type: "p",
        text: "文旦皮帶著清新的柑橘香，曬乾後可以放在房間或鞋櫃當天然香氛，也有人拿來做蜜餞或柚皮茶。一顆文旦從果肉到果皮，都能好好利用。",
      },
    ],
  },
  {
    slug: "how-to-pick-mango",
    title: "挑一顆好吃的愛文芒果，看這四件事就夠",
    excerpt: "夏天走進市場，整排芒果看起來都一樣紅。從顏色、香氣、手感到重量，教你挑出真正熟得剛好的那一顆。",
    category: "挑選",
    date: "2026-06-18",
    readMinutes: 5,
    cover: photos.mango,
    body: [
      {
        type: "p",
        text: "五月到八月是愛文芒果的季節，台南玉井、屏東枋山的芒果大量上市。愛文香氣濃、果肉細緻，是做芒果冰最受歡迎的品種。但同樣一箱芒果，熟度可能差很多，學會挑選，就能少踩雷。",
      },
      { type: "h2", text: "一、看顏色" },
      {
        type: "p",
        text: "成熟的愛文果皮通常由綠轉為紅色、橙黃色交錯。不過顏色也跟日照有關，只看紅不紅並不準，最好搭配下面幾個方法一起判斷。",
      },
      { type: "h2", text: "二、聞香氣" },
      {
        type: "p",
        text: "靠近蒂頭的地方聞一聞，熟度剛好的芒果會散發明顯的甜香。如果幾乎沒有味道，通常還需要再放幾天。",
      },
      { type: "h2", text: "三、摸手感" },
      {
        type: "p",
        text: "用指腹輕輕按壓，微微軟、有彈性的最好吃；硬邦邦的還沒熟，太軟或有凹陷則可能過熟。記得不要用力捏，芒果很容易被壓傷。",
      },
      { type: "h2", text: "四、掂重量" },
      {
        type: "p",
        text: "同樣大小的芒果，拿起來比較重的，通常果肉比較飽滿多汁。",
      },
      { type: "quote", text: "顏色、香氣、手感、重量，四件事都對了，就是今天該吃的那一顆。" },
      { type: "h2", text: "買回家怎麼保存" },
      {
        type: "list",
        items: [
          "還沒熟的芒果放在室溫通風處，讓它自然後熟，不要先放冰箱。",
          "已經熟了的芒果可以冷藏，但最好在幾天內吃完。",
          "想做芒果冰，可以把果肉切丁後冷凍，隨時拿出來用。",
        ],
      },
    ],
  },
  {
    slug: "winter-wax-apple-sugar-apple",
    title: "冬天才有的甜：蓮霧與釋迦",
    excerpt: "天氣變冷，水果攤換上一整排深紅色的蓮霧和一顆顆綠色的釋迦。這兩種冬季水果，吃法和挑法都不太一樣。",
    category: "產地",
    date: "2026-01-10",
    readMinutes: 4,
    cover: photos.waxApple,
    body: [
      {
        type: "p",
        text: "很多人以為台灣水果集中在夏天，其實冬天一樣熱鬧。屏東的蓮霧和台東的釋迦，都是冬天到春天水果攤上的主角。",
      },
      { type: "h2", text: "蓮霧：越深色越受歡迎" },
      {
        type: "p",
        text: "屏東林邊、南州一帶是蓮霧的重要產地。「黑珍珠」這個名字，來自它深紅發亮、接近暗紫的果皮。好的蓮霧咬下去清脆多汁，帶一點淡淡的甜。",
      },
      {
        type: "list",
        items: [
          "果皮顏色深、有光澤，看起來飽滿不乾扁。",
          "底部的開口（臍部）張開較大，通常代表發育成熟。",
          "拿起來有重量感，表面沒有明顯裂痕或碰傷。",
        ],
      },
      { type: "h2", text: "釋迦：買回家要等它變軟" },
      {
        type: "p",
        text: "台東是台灣釋迦最主要的產地。釋迦採收時通常還是硬的，需要在室溫下放幾天，等果實整顆變軟、鱗目之間的縫隙變明顯，才是吃的時候。",
      },
      { type: "quote", text: "硬的釋迦不是壞掉，只是還沒準備好。耐心等它，軟了再吃。" },
      {
        type: "p",
        text: "軟了之後的釋迦很快就會過熟，可以冷藏延長一兩天，或是把果肉挖出來冷凍，做成冰沙也很好吃。另外常見的「鳳梨釋迦」口感比較紮實、帶一點酸，喜歡清爽口味的人可以試試。",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}.${m}.${d}`;
}

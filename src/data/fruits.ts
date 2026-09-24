import { photos, type Photo } from "./photos";

export type Fruit = {
  name: string;
  latin: string;
  origin: string;
  months: number[];
  desc: string;
  /** 亮面球的三段色：亮部、主色、暗部 */
  colors: [string, string, string];
  photo: Photo;
};

export const fruits: Fruit[] = [
  {
    name: "愛文芒果",
    latin: "Irwin Mango",
    origin: "台南玉井、屏東枋山",
    months: [5, 6, 7, 8],
    desc: "香氣濃郁、果肉細緻無纖維，夏天最具代表性的台灣水果，也是芒果冰的靈魂。",
    colors: ["#FFD37A", "#F79A2E", "#C2521C"],
    photo: photos.mango,
  },
  {
    name: "金鑽鳳梨",
    latin: "Golden Diamond Pineapple",
    origin: "屏東、嘉義、台南",
    months: [3, 4, 5, 6, 7, 8],
    desc: "酸甜平衡、果心可食，纖維細緻多汁，也是鳳梨酥的重要原料。",
    colors: ["#FFEA8F", "#F2C21B", "#A87C05"],
    photo: photos.pineapple,
  },
  {
    name: "旗山香蕉",
    latin: "Chishan Banana",
    origin: "高雄旗山、屏東",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    desc: "曾經風靡日本市場，香氣濃、口感Q彈綿密，一年四季都吃得到。",
    colors: ["#FFF4AE", "#E4D544", "#9B8F10"],
    photo: photos.banana,
  },
  {
    name: "玉荷包荔枝",
    latin: "Yu Her Pao Lychee",
    origin: "高雄大樹",
    months: [5, 6],
    desc: "果肉厚、籽小、甜度高，產季只有短短一個多月，是夏初限定的珍品。",
    colors: ["#FFA3A3", "#DF3549", "#86132C"],
    photo: photos.lychee,
  },
  {
    name: "台東釋迦",
    latin: "Taitung Sugar Apple",
    origin: "台東卑南、太麻里",
    months: [8, 9, 10, 11, 12, 1, 2, 3],
    desc: "外型像佛頭而得名，綿密香甜；鳳梨釋迦則帶有清爽微酸的口感。",
    colors: ["#D4F2C6", "#7DBE79", "#3A7446"],
    photo: photos.sugarApple,
  },
  {
    name: "黑珍珠蓮霧",
    latin: "Black Pearl Wax Apple",
    origin: "屏東林邊、南州",
    months: [12, 1, 2, 3, 4],
    desc: "外皮深紅發亮、清脆爽口，冬季到春季限定，是年節送禮的熱門選擇。",
    colors: ["#FF94B4", "#BE1B5A", "#630A31"],
    photo: photos.waxApple,
  },
  {
    name: "燕巢芭樂",
    latin: "Yanchao Guava",
    origin: "高雄燕巢",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    desc: "珍珠芭樂、帝王芭樂口感清脆，富含維生素C，是最日常的健康水果。",
    colors: ["#E6F8B4", "#A3CE48", "#57861C"],
    photo: photos.guava,
  },
  {
    name: "麻豆文旦",
    latin: "Madou Pomelo",
    origin: "台南麻豆",
    months: [8, 9],
    desc: "中秋節的應景水果，果肉清甜多汁、微微帶酸，柚皮還能做成柚子帽。",
    colors: ["#FFF2BC", "#EFC54A", "#B08026"],
    photo: photos.pomelo,
  },
];

export function formatMonths(months: number[]) {
  if (months.length === 12) return "全年";
  return `${months[0]}–${months[months.length - 1]} 月`;
}

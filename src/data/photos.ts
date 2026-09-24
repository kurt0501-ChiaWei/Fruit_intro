export type Photo = {
  src: string;
  label: string;
  author: string;
  license: string;
  source: string;
};

/** 照片皆來自 Wikimedia Commons，CC 授權需標示作者，詳見 public/images/CREDITS.md */
export const photos = {
  mango: {
    src: "/images/mango.jpg",
    label: "愛文芒果",
    author: "Evo101469",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Irwin_Mango_20110726.jpg",
  },
  pineapple: {
    src: "/images/pineapple.jpg",
    label: "鳳梨",
    author: "Thamizhpparithi Maari",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:A_basket_of_pineapple_cut_fruit.JPG",
  },
  banana: {
    src: "/images/banana.jpg",
    label: "香蕉",
    author: "PattayaPatrol",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:DFC_4184_Bunches_of_ripe_bananas_neatly_arranged_at_a_bustling_market_stall_ready_for_shoppers.jpg",
  },
  lychee: {
    src: "/images/lychee.jpg",
    label: "荔枝",
    author: "ChildofMidnight",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Lychee_fruit.jpg",
  },
  sugarApple: {
    src: "/images/sugar-apple.jpg",
    label: "釋迦",
    author: "Yarzaryeni",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Annona_squamosa_fruit_from_Myanmar.jpg",
  },
  waxApple: {
    src: "/images/wax-apple.jpg",
    label: "蓮霧",
    author: "Basile Morin",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Syzygium_fruit.jpg",
  },
  guava: {
    src: "/images/guava.jpg",
    label: "芭樂",
    author: "PattayaPatrol",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:DFC_3945_A_pile_of_glossy_green_guavas_with_one_sliced_open_to_reveal_its_bright_pink_seed-speckled_interior.jpg",
  },
  pomelo: {
    src: "/images/pomelo.jpg",
    label: "文旦",
    author: "Ivar Leidus",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Pomelo_flesh.jpg",
  },
  papaya: {
    src: "/images/papaya.jpg",
    label: "木瓜",
    author: "Maksym Kozlenko",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Papaya_cut_half.jpg",
  },
  watermelon: {
    src: "/images/watermelon.jpg",
    label: "西瓜",
    author: "Ralff Nestor Nacor",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Watermelon_slice,_May_2024.jpg",
  },
} satisfies Record<string, Photo>;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, formatDate, type Post } from "@/data/posts";
import Parallax from "@/components/Parallax";

export const metadata: Metadata = {
  title: "產季筆記｜台灣好果",
  description: "關於台灣水果的挑選、保存與產地故事。",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="mx-auto max-w-6xl px-5 pb-28">
      {/* 頁首 */}
      <header className="grid gap-6 border-b border-ink/15 pb-14 pt-16 md:grid-cols-12 md:pt-24">
        <p className="text-xs tracking-[0.3em] text-ink-soft md:col-span-3 md:pt-4">
          <span className="font-latin text-sm italic tracking-normal">Journal</span> — 產季筆記
        </p>
        <div className="md:col-span-9">
          <h1 className="font-serif text-5xl font-black leading-tight sm:text-7xl">關於水果，慢慢說。</h1>
          <p className="mt-6 max-w-lg leading-8 text-ink-soft">
            怎麼挑、怎麼放、什麼時候吃最好。寫給每個在水果攤前猶豫過的人。
          </p>
        </div>
      </header>

      {/* 精選文章 */}
      <Link href={`/blog/${featured.slug}`} className="group mt-14 grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
        <div className="gloss gloss-flat aspect-[4/3] overflow-hidden rounded-[2rem] md:col-span-7">
          <Parallax speed={0.06} className="absolute inset-x-0 -inset-y-[20%]">
            <Image
              src={featured.cover.src}
              alt={featured.cover.label}
              fill
              loading="eager"
              sizes="(min-width: 768px) 640px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </Parallax>
        </div>
        <div className="md:col-span-5">
          <PostMeta post={featured} />
          <h2 className="mt-4 font-serif text-3xl font-black leading-snug transition group-hover:text-ink/70 sm:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-5 leading-8 text-ink-soft">{featured.excerpt}</p>
          <p className="mt-8 text-sm font-medium">
            閱讀全文
            <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
          </p>
        </div>
      </Link>

      {/* 其他文章 */}
      <div className="mt-20 grid gap-x-10 gap-y-16 border-t border-ink/15 pt-16 md:grid-cols-2">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="gloss gloss-flat aspect-[3/2] overflow-hidden rounded-3xl">
              <Parallax speed={0.05} className="absolute inset-x-0 -inset-y-[18%]">
                <Image
                  src={post.cover.src}
                  alt={post.cover.label}
                  fill
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </Parallax>
            </div>
            <div className="mt-6">
              <PostMeta post={post} />
              <h2 className="mt-3 font-serif text-2xl font-bold leading-snug transition group-hover:text-ink/70 sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 leading-7 text-ink-soft">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex items-center gap-3 text-sm text-ink-soft">
      <span className="rounded-full border border-ink/20 px-3 py-0.5 text-xs text-ink">{post.category}</span>
      <span className="font-latin text-base">{formatDate(post.date)}</span>
      <span className="text-ink/30">／</span>
      <span>{post.readMinutes} 分鐘閱讀</span>
    </p>
  );
}

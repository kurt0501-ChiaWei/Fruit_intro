import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate, type Block } from "@/data/posts";
import Parallax from "@/components/Parallax";

// 只有 posts 裡的文章會產生頁面，其他網址直接 404
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜台灣好果`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <main className="pb-28">
      {/* 標題區 */}
      <header className="mx-auto max-w-3xl px-5 pt-14 md:pt-20">
        <Link href="/blog" className="group text-sm text-ink-soft transition hover:text-ink">
          <span className="mr-2 inline-block transition group-hover:-translate-x-1">←</span>
          產季筆記
        </Link>
        <p className="mt-10 flex items-center gap-3 text-sm text-ink-soft">
          <span className="rounded-full border border-ink/20 px-3 py-0.5 text-xs text-ink">{post.category}</span>
          <span className="font-latin text-base">{formatDate(post.date)}</span>
          <span className="text-ink/30">／</span>
          <span>{post.readMinutes} 分鐘閱讀</span>
        </p>
        <h1 className="mt-6 font-serif text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-ink-soft">{post.excerpt}</p>
      </header>

      {/* 封面 */}
      <figure className="mx-auto mt-14 max-w-6xl px-5">
        <div className="gloss gloss-flat aspect-[16/10] overflow-hidden rounded-[2rem] sm:aspect-[21/9]">
          <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[20%]">
            <Image
              src={post.cover.src}
              alt={post.cover.label}
              fill
              loading="eager"
              sizes="(min-width: 1152px) 1120px, 100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
        <figcaption className="mt-3 text-right text-xs text-ink-soft">
          照片：
          <a href={post.cover.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {post.cover.author}（{post.cover.license}）
          </a>
        </figcaption>
      </figure>

      {/* 內文 */}
      <article className="mx-auto mt-16 max-w-2xl px-5">
        {post.body.map((block, i) => (
          <BlockView key={i} block={block} first={i === 0} />
        ))}
      </article>

      {/* 延伸閱讀 */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <div className="border-t border-ink/15 pt-12">
          <p className="text-xs tracking-[0.3em] text-ink-soft">延伸閱讀</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid grid-cols-[7rem_1fr] items-center gap-6">
                <div className="gloss gloss-flat aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={p.cover.src}
                    alt={p.cover.label}
                    fill
                    sizes="112px"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="font-latin text-base text-ink-soft">{formatDate(p.date)}</p>
                  <h2 className="mt-1 font-serif text-xl font-bold leading-snug transition group-hover:text-ink/70">
                    {p.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BlockView({ block, first }: { block: Block; first: boolean }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mb-5 mt-14 font-serif text-2xl font-bold sm:text-3xl">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-12 border-y border-ink/15 py-8 text-center font-serif text-2xl font-bold leading-relaxed sm:text-3xl">
          「{block.text}」
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[1.5rem_1fr] text-lg leading-8 text-ink/85">
              <span className="text-ink/40">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      // 第一段加上首字放大，增加雜誌感
      return (
        <p
          className={`mb-6 text-lg leading-9 text-ink/85 ${
            first
              ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:font-black first-letter:leading-none first-letter:text-ink"
              : ""
          }`}
        >
          {block.text}
        </p>
      );
  }
}

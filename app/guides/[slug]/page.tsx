import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Book } from "@/components/estate/book";
import { GuideBody } from "@/components/estate/guide-body";
import { GuideHero } from "@/components/estate/guide-hero";
import { GuideRelated } from "@/components/estate/guide-related";
import { postBySlug, posts, slugOf } from "@/components/estate/posts";

// Six records in, six pages out, all of them built at build time. Every link
// into here was written before this route existed — the home page's eleventh
// section, the shelf on /guides and the related row on each of these pages —
// and all of them derive the segment through `slugOf` over the title, which is
// what this reads back.
export function generateStaticParams() {
  return posts.map((post) => ({ slug: slugOf(post) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Domus`,
    description: post.excerpt,
  };
}

export default async function GuidePage({
  params,
}: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  // The head, the article, what to read next, and the form every route on this
  // site closes with. The hero and the body are one child of `main` rather than
  // two: a title, its figures, its photograph and the prose under them are one
  // continuous read, where `main`'s 10rem is the distance between one subject
  // and the next. Same call the listing page makes with its mosaic.
  return (
    <>
      <div className="flex flex-col gap-24">
        <GuideHero post={post} />
        <GuideBody post={post} />
      </div>
      <GuideRelated post={post} />
      <Book />
    </>
  );
}

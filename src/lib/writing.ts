import { getCollection, type CollectionEntry } from "astro:content";

export type WritingEntry = CollectionEntry<"writing">;

export async function getPublishedPosts(): Promise<WritingEntry[]> {
  const posts = await getCollection("writing", ({ data }) => !data.draft);

  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function getWritingUrl(post: WritingEntry): string {
  return `/writing/${post.id}/`;
}

export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

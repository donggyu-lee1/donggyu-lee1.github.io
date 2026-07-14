import rss from "@astrojs/rss";
import { getPublishedPosts, getWritingUrl } from "../lib/writing";

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Donggyu Lee Writing",
    description:
      "Notes and essays on machine learning, economics, computational social science, and research.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getWritingUrl(post),
      categories: post.data.tags
    }))
  });
}

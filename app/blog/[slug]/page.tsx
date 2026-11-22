import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformPage from "../../../components/PlatformPage";
import { publishedArticles } from "../../../lib/platform";

export function generateStaticParams() { return publishedArticles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = publishedArticles.find(article => article.slug === slug);
  return a ? { title: `${a.title} | DXJ Labs`, description: a.excerpt } : { title: "Article not found | DXJ Labs" };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = publishedArticles.find(item => item.slug === slug);
  if (!article) notFound();
  return (
    <PlatformPage number="03" tag={article.category.toUpperCase()} title={article.title} description={article.excerpt}>
      <article className="platform-article"><div className="platform-article-meta"><span>BY {article.author.toUpperCase()}</span><time dateTime={article.publishedAt}>{article.publishedAt}</time></div><div className="platform-article-body">{article.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div></article>
      <div className="platform-back"><Link href="/blog">← All studio notes</Link></div>
    </PlatformPage>
  );
}

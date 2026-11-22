import type { Metadata } from "next";
import Link from "next/link";
import PlatformPage from "../../components/PlatformPage";
import { publishedArticles } from "../../lib/platform";

export const metadata: Metadata = { title: "Blog & Research | DXJ Labs", description: "Engineering notes, research, ecosystem updates, and studio journals from DXJ Labs." };

export default function BlogPage() {
  return (
    <PlatformPage number="03" tag="BLOG & RESEARCH" title="Ideas, documented." description="Engineering notes, research, ecosystem updates and studio journal entries. We publish the thinking as well as the building.">
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Latest writing</h2><span>Notes from the studio</span></div>
        {publishedArticles.length === 0 ? <p className="platform-fineprint">No articles have been published.</p> : <div className="article-list">{publishedArticles.map((article, i) => <article className="article-row" key={article.slug}><span className="article-number">0{i + 1}</span><div><span className="activity-kind">{article.category.toUpperCase()} / {article.publishedAt}</span><h3><Link href={`/blog/${article.slug}`}>{article.title} <span aria-hidden="true">↗</span></Link></h3><p>{article.excerpt}</p><span className="article-byline">BY {article.author.toUpperCase()}</span></div></article>)}</div>}
      </section>
      <section className="platform-section platform-empty-section"><div><span className="section-tag">EDITORIAL DESK</span><h2>Four perspectives.</h2></div><div className="category-pills"><span>Engineering</span><span>Research</span><span>Ecosystem Updates</span><span>Studio Journal</span></div></section>
    </PlatformPage>
  );
}

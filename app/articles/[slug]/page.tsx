import { articles } from '@/lib/articles';
import ArticleDetailClient from './ArticleDetailClient';

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return <ArticleDetailClient slug={params.slug} />;
}

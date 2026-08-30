import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
  renderMarkdown,
} from "@/lib/blog";
import {
  BlogPostingStructuredData,
  BreadcrumbStructuredData,
} from "@/components/blog-structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://keisoftware.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://keisoftware.dev/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <div className="min-h-screen bg-background">
      <BlogPostingStructuredData
        post={post}
        url={`https://keisoftware.dev/blog/${post.slug}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://keisoftware.dev" },
          { name: "Blog", url: "https://keisoftware.dev/blog" },
          {
            name: post.title,
            url: `https://keisoftware.dev/blog/${post.slug}`,
          },
        ]}
      />
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-4 h-4 text-neon" />
            <span className="text-xs font-mono text-neon uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-8 mb-8 border-b border-border/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <div className="text-sm text-muted-foreground">
              Por{" "}
              <span className="text-foreground font-medium">
                {post.author.name}
              </span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12 pb-8 border-b border-border/40">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.content),
              }}
            />
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 border border-neon/20 bg-neon/5 rounded-sm">
            <h3 className="text-xl font-bold text-foreground mb-3">
              ¿Listo para llevar tu proyecto al siguiente nivel?
            </h3>
            <p className="text-muted-foreground mb-6">
              Conversemos sobre cómo podemos ayudarte a implementar estas
              soluciones en tu negocio.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-bold text-sm tracking-wide hover:bg-neon-bright transition-all rounded-sm"
            >
              Agendar consulta gratuita →
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-border/40 bg-surface/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-mono tracking-wider text-muted-foreground uppercase mb-8">
              Artículos relacionados
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block p-6 border border-border/60 rounded-sm hover:border-neon/40 hover:bg-surface/50 transition-all"
                >
                  <span className="text-xs font-mono text-neon uppercase tracking-wider">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-3 mb-2 group-hover:text-neon transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
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
import { BlogHeaderActions } from "@/components/blog-header-actions";

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-3">
          <Link
            href="/blog"
            className="inline-flex min-w-0 items-center gap-2 rounded-full py-2 pl-3 pr-4 -ml-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">Volver al blog</span>
          </Link>
          <div className="shrink-0">
            <BlogHeaderActions />
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-4 h-4 text-[#3f7dff]" />
            <span className="text-xs font-mono text-[#3f7dff] uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-google-sans text-3xl sm:text-5xl lg:text-6xl font-[450] tracking-normal text-foreground leading-tight mb-6">
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

          {/* Cover image */}
          <div className="relative aspect-[1200/630] overflow-hidden rounded-2xl mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
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
          <div className="mt-16 p-8 rounded-2xl border border-border bg-card shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)]">
            <h3 className="font-google-sans text-xl font-[450] text-foreground mb-3">
              ¿Listo para llevar tu proyecto al siguiente nivel?
            </h3>
            <p className="text-muted-foreground mb-6">
              Conversemos sobre cómo podemos ayudarte a implementar estas
              soluciones en tu negocio.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-[15px] transition-transform hover:scale-[1.03] active:scale-95"
              style={{ backgroundColor: "#3f7dff" }}
            >
              Agendar consulta gratuita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-border/40 bg-surface/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Artículos relacionados
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3f7dff]/35 hover:shadow-[0_24px_60px_-20px_rgba(63,125,255,0.35)]"
                >
                  <div className="relative aspect-[1200/630] overflow-hidden">
                    <Image
                      src={relatedPost.coverImage}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-[#3f7dff] uppercase tracking-wider">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-google-sans text-lg font-[450] text-foreground mt-3 mb-2 group-hover:text-[#3f7dff] transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

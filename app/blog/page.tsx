import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";
import {
  BlogListStructuredData,
  BreadcrumbStructuredData,
} from "@/components/blog-structured-data";

export const metadata: Metadata = {
  title: "Blog de Desarrollo y Tecnología",
  description:
    "Artículos sobre desarrollo de software, inteligencia artificial, automatización y mejores prácticas de programación.",
  alternates: {
    canonical: "https://keisoftware.dev/blog",
  },
  openGraph: {
    title: "Blog | KEI Software",
    description: "Artículos sobre desarrollo de software, IA y automatización",
    url: "https://keisoftware.dev/blog",
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <BlogListStructuredData posts={allPosts} />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://keisoftware.dev" },
          { name: "Blog", url: "https://keisoftware.dev/blog" },
        ]}
      />
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-neon" />
            <span className="text-[10px] tracking-[0.3em] text-neon uppercase font-mono">
              Blog
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tight leading-none mb-6">
            Desarrollo de Software, IA<br />
            <span className="text-neon">y Automatización</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
            Exploramos desarrollo de software, IA, automatización y las
            tecnologías que están transformando la industria.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-mono tracking-wider text-muted-foreground uppercase mb-8">
              Destacados
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 sm:p-8 border border-border/60 rounded-sm hover:border-neon/40 hover:bg-surface/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-neon uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-neon transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <ArrowRight className="w-4 h-4 text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-mono tracking-wider text-muted-foreground uppercase mb-8">
            Todos los artículos
          </h2>
          <div className="space-y-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 border-b border-border/40 hover:bg-surface/30 transition-all -mx-6 px-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-neon uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-neon transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("es-AR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-neon transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

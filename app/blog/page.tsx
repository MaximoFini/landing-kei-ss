import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";
import {
  BlogListStructuredData,
  BreadcrumbStructuredData,
} from "@/components/blog-structured-data";
import { SectionHeading } from "@/components/ui/section-heading";

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
            className="inline-flex items-center gap-2 rounded-full py-2 pl-3 pr-4 -ml-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Blog"
            title="Blog"
            subtitle="Software, IA y automatización"
            align="left"
            className="mb-0"
            description="Exploramos desarrollo de software, inteligencia artificial y las tecnologías que están transformando la industria."
          />
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Destacados
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3f7dff]/35 hover:shadow-[0_24px_60px_-20px_rgba(63,125,255,0.35)]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-[#3f7dff] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-google-sans text-xl sm:text-2xl font-[450] text-foreground mb-3 group-hover:text-[#3f7dff] transition-colors">
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
                    <ArrowRight className="w-4 h-4 text-[#3f7dff] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
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
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Todos los artículos
          </h2>
          <div className="space-y-4">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-2xl border border-transparent hover:border-border hover:bg-card transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-[#3f7dff] uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="font-google-sans text-lg sm:text-xl font-[450] text-foreground mb-2 group-hover:text-[#3f7dff] transition-colors">
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
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#3f7dff] group-hover:translate-x-0.5 transition-all" />
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

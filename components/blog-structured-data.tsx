/**
 * JSON-LD Structured Data for the blog (BlogPosting, BreadcrumbList, Blog)
 * Same pattern as components/structured-data.tsx.
 */
import type { BlogPost } from "@/lib/blog";

const PUBLISHER = {
  "@type": "Organization",
  name: "KEI Software",
  url: "https://keisoftware.dev",
  logo: {
    "@type": "ImageObject",
    url: "https://keisoftware.dev/kei-logo-nuevo.png",
  },
};

export function BlogPostingStructuredData({
  post,
  url,
}: {
  post: BlogPost;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "KEI Software",
      url: "https://keisoftware.dev",
    },
    publisher: PUBLISHER,
    mainEntityOfPage: url,
    keywords: post.keywords.join(", "),
    image: `https://keisoftware.dev/blog/${post.slug}/opengraph-image`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogListStructuredData({ posts }: { posts: BlogPost[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog | KEI Software",
    url: "https://keisoftware.dev/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://keisoftware.dev/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

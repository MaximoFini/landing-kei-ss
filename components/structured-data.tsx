/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand your business better
 */
export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Keii Solutions",
    url: "https://keisoftware.dev",
    description:
      "Desarrollamos software a medida, soluciones IA y automatización",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://keisoftware.dev/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Keii Solutions",
    url: "https://keisoftware.dev",
    logo: "https://keisoftware.dev/logo.png",
    description:
      "Desarrollamos software a medida, soluciones IA y automatización con transparencia y calidad garantizada.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Córdoba",
      addressCountry: "AR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "keiisolutions2@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://github.com/keiisolutions",
      "https://linkedin.com/company/keiisolutions",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Keii Solutions",
    description:
      "Desarrollo de software a medida, inteligencia artificial y automatización",
    url: "https://keisoftware.dev",
    telephone: "+54-9-351-XXXXXXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Córdoba",
      addressRegion: "Córdoba",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -31.4201,
      longitude: -64.1888,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@type": "Organization",
      name: "Keii Solutions",
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Desarrollo",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo Web",
            description:
              "Aplicaciones modernas, escalables y de alto rendimiento",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Soluciones IA",
            description: "Modelos de lenguaje y visión artificial integrados",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automatización",
            description: "Flujos que eliminan trabajo repetitivo",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto tiempo toma desarrollar un proyecto de software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El tiempo varía según la complejidad. Proyectos simples pueden tomar 2-4 semanas, mientras que sistemas complejos pueden requerir 2-6 meses. Trabajamos con sprints ágiles para entregar valor incremental.",
        },
      },
      {
        "@type": "Question",
        name: "¿Trabajan de forma remota?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, trabajamos 100% remoto con clientes de toda Argentina y el mundo. Tenemos nuestra base en Córdoba, Argentina.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tecnologías utilizan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Utilizamos tecnologías modernas como Next.js, React, Node.js, Python, PostgreSQL, y servicios cloud. Seleccionamos la mejor stack según las necesidades de cada proyecto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Ofrecen soporte después del lanzamiento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todos nuestros proyectos incluyen soporte post-lanzamiento. Ofrecemos mantenimiento continuo, actualizaciones y mejoras según lo necesites.",
        },
      },
      {
        "@type": "Question",
        name: "¿Pueden integrar IA en mi producto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, desarrollamos soluciones con modelos de lenguaje (LLMs), visión artificial, y automatización inteligente. Podemos integrar IA en productos nuevos o existentes.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand your business better
 */
export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KEI Software",
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
    name: "KEI Software",
    url: "https://keisoftware.dev",
    logo: "https://keisoftware.dev/kei-logo-nuevo.png",
    description:
      "Desarrollamos software a medida, soluciones IA y automatización con transparencia y calidad garantizada.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Córdoba",
      addressCountry: "AR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contacto@keisoftware.dev",
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
    name: "KEI Software",
    description:
      "Desarrollo de software a medida, inteligencia artificial y automatización",
    url: "https://keisoftware.dev",
    telephone: "+54-351-361-4462",
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
      name: "KEI Software",
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
    </>
  );
}

/**
 * JSON-LD FAQPage — solo se usa en /preguntas-frecuentes, donde el contenido
 * es visible en la página (el schema debe reflejar contenido real, no puede
 * vivir sitewide como si fuera boilerplate).
 */
export function FaqPageStructuredData({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

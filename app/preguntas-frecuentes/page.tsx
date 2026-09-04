import { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbStructuredData } from "@/components/blog-structured-data";
import { FaqPageStructuredData } from "@/components/faq-structured-data";

const FAQS = [
  {
    question: "¿Cuánto tiempo toma desarrollar un proyecto de software?",
    answer:
      "El tiempo varía según la complejidad. Proyectos simples pueden tomar 2-4 semanas, mientras que sistemas complejos pueden requerir 2-6 meses. Trabajamos con sprints ágiles para entregar valor incremental.",
  },
  {
    question: "¿Trabajan de forma remota?",
    answer:
      "Sí, trabajamos 100% remoto con clientes de toda Argentina y el mundo. Tenemos nuestra base en Córdoba, Argentina.",
  },
  {
    question: "¿Qué tecnologías utilizan?",
    answer:
      "Utilizamos tecnologías modernas como Next.js, React, Node.js, Python, PostgreSQL, y servicios cloud. Seleccionamos la mejor stack según las necesidades de cada proyecto.",
  },
  {
    question: "¿Ofrecen soporte después del lanzamiento?",
    answer:
      "Sí, todos nuestros proyectos incluyen soporte post-lanzamiento. Ofrecemos mantenimiento continuo, actualizaciones y mejoras según lo necesites.",
  },
  {
    question: "¿Pueden integrar IA en mi producto?",
    answer:
      "Sí, desarrollamos soluciones con modelos de lenguaje (LLMs), visión artificial, y automatización inteligente. Podemos integrar IA en productos nuevos o existentes.",
  },
  {
    question: "¿Qué tipo de proyectos desarrolla KEI Software?",
    answer:
      "Desarrollamos software a medida, aplicaciones web y móviles, plataformas e-commerce, CRMs y ERPs personalizados, soluciones con inteligencia artificial y sistemas de automatización para empresas de distintos tamaños e industrias.",
  },
  {
    question: "¿Cómo puedo contactar a KEI Software?",
    answer:
      "Podés escribirnos por WhatsApp al +54 351 361-4462, completar el formulario de contacto en keisoftware.dev, o enviarnos un email. Respondemos en menos de 24 horas hábiles y la primera consulta es sin cargo.",
  },
  {
    question: "¿En qué se diferencian de otras consultoras de software?",
    answer:
      "Nos enfocamos en transparencia total durante el proyecto, comunicación constante con el cliente, entregas incrementales con sprints cortos, y calidad garantizada con testing desde el día uno, en lugar de entregas cerradas sin visibilidad del proceso.",
  },
  {
    question: "¿Dónde está ubicada KEI Software?",
    answer:
      "Tenemos nuestra base en Córdoba, Argentina, y trabajamos 100% remoto con clientes de toda Argentina y el mundo.",
  },
];

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más frecuentes sobre desarrollo de software a medida, soluciones IA, automatización, tiempos de entrega y forma de trabajo de KEI Software.",
  alternates: {
    canonical: "https://keisoftware.dev/preguntas-frecuentes",
  },
  openGraph: {
    title: "Preguntas Frecuentes | KEI Software",
    description:
      "Respuestas a las preguntas más frecuentes sobre desarrollo de software a medida, soluciones IA y automatización.",
    url: "https://keisoftware.dev/preguntas-frecuentes",
  },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <FaqPageStructuredData faqs={FAQS} />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://keisoftware.dev" },
          {
            name: "Preguntas frecuentes",
            url: "https://keisoftware.dev/preguntas-frecuentes",
          },
        ]}
      />
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-neon" />
            <span className="text-[10px] tracking-[0.3em] text-neon uppercase font-mono">
              FAQ
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tight leading-none mb-6">
            Preguntas <span className="text-neon">Frecuentes</span>
          </h1>
          <p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
            Todo lo que necesitás saber sobre cómo trabajamos, los tiempos de
            desarrollo y los servicios de KEI Software.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto divide-y divide-border/40">
          {FAQS.map((faq) => (
            <div key={faq.question} className="py-6 sm:py-8">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                {faq.question}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 border border-neon/20 bg-neon/5 rounded-sm">
          <h3 className="text-xl font-bold text-foreground mb-3">
            ¿Tenés otra pregunta?
          </h3>
          <p className="text-muted-foreground mb-6">
            Escribinos y te respondemos en menos de 24 horas hábiles. La
            primera consulta es sin cargo.
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-background font-bold text-sm tracking-wide hover:bg-neon-bright transition-all rounded-sm"
          >
            Agendar consulta gratuita →
          </Link>
        </div>
      </section>
    </div>
  );
}

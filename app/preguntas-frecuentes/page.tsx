import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BreadcrumbStructuredData } from "@/components/blog-structured-data";
import { FaqPageStructuredData } from "@/components/faq-structured-data";
import { SectionHeading } from "@/components/ui/section-heading";

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
            className="inline-flex items-center gap-2 rounded-full py-2 pl-3 pr-4 -ml-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Preguntas frecuentes"
            align="left"
            className="mb-0"
            description="Todo lo que necesitás saber sobre cómo trabajamos, los tiempos de desarrollo y los servicios de KEI Software."
          />
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)]"
            >
              <h2 className="font-google-sans text-lg sm:text-xl font-[450] text-foreground mb-3">
                {faq.question}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 p-8 rounded-2xl border border-border bg-card shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)]">
          <h3 className="font-google-sans text-xl font-[450] text-foreground mb-3">
            ¿Tenés otra pregunta?
          </h3>
          <p className="text-muted-foreground mb-6">
            Escribinos y te respondemos en menos de 24 horas hábiles. La
            primera consulta es sin cargo.
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
      </section>
    </div>
  );
}

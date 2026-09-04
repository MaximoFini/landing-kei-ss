import { marked } from "marked";

// Blog data and utilities
// Aquí defines todos tus posts del blog
// Más adelante puedes migrar esto a un CMS como Contentful, Sanity, o una base de datos

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  keywords: string[];
  coverImage: string;
  author: {
    name: string;
    role: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-integrar-ia-en-tu-negocio",
    title: "Cómo Integrar IA en tu Negocio: Guía Práctica 2026",
    excerpt:
      "Descubre cómo las empresas están usando inteligencia artificial para automatizar procesos, mejorar la experiencia del cliente y aumentar la eficiencia.",
    date: "2026-05-01",
    readTime: "8 min",
    category: "Inteligencia Artificial",
    featured: false,
    coverImage: "/blog/covers/como-integrar-ia-en-tu-negocio.svg",
    keywords: [
      "IA",
      "inteligencia artificial",
      "automatización",
      "ChatGPT",
      "LLM",
      "negocio",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# Cómo Integrar IA en tu Negocio: Guía Práctica 2026

La inteligencia artificial ya no es el futuro: es el presente. En 2026, las empresas que integran IA de forma estratégica están viendo mejoras significativas en productividad, costos y experiencia del cliente.

## ¿Por Dónde Empezar?

### 1. Identifica Procesos Repetitivos
El primer paso es analizar qué tareas consumen tiempo pero no generan valor directo. Algunos ejemplos:
- Responder emails frecuentes
- Clasificar y etiquetar datos
- Generar reportes periódicos
- Atención al cliente con preguntas comunes

### 2. Chatbots Inteligentes
Los chatbots modernos con LLMs (Large Language Models) pueden:
- Responder consultas en lenguaje natural
- Acceder a tu base de conocimientos
- Derivar a humanos cuando es necesario
- Aprender de cada interacción

**Caso real:** en el sistema que desarrollamos para Alfa Club, armamos un asistente —Alfa Bot— que responde en segundos cuántos socios están activos, cuánto se recaudó o quién está por vencer su cuota, con los datos reales del negocio. Antes de darlo por terminado lo sometimos a un examen de 59 preguntas reales del negocio: acertó las 59. [Contamos el caso completo acá](/blog/le-ensenamos-a-una-ia-a-conocer-un-negocio-de-memoria).

### 3. Automatización de Documentos
La IA puede:
- Extraer datos de facturas y contratos
- Generar documentos personalizados
- Clasificar y archivar automáticamente
- Resumir textos largos

### 4. Análisis Predictivo
Usa IA para:
- Predecir demanda de productos
- Detectar fraude
- Identificar oportunidades de venta
- Optimizar precios dinámicamente

## Tecnologías Disponibles en 2026

- **OpenAI GPT-5**: Para procesamiento de lenguaje natural
- **Claude 4**: Excelente para análisis de documentos
- **Gemini**: Integración con ecosistema Google
- **Modelos open-source**: Llama 3, Mistral para deployment privado

## Errores Comunes a Evitar

Los errores más frecuentes que vemos: implementar IA por "estar a la moda" sin un objetivo concreto detrás, no definir de antemano qué significa éxito, ignorar la privacidad de los datos que la IA va a tocar, y no capacitar al equipo que la va a usar en el día a día.

Lo que sí funciona: empezar con un proyecto piloto acotado, medir el ROI desde el día uno, involucrar a los usuarios finales desde el principio, e iterar según el feedback real en vez de aferrarse a la hoja de ruta original.

## Conclusión

La IA es una herramienta, no una solución mágica. El éxito está en identificar dónde agrega valor real y ejecutar de forma gradual.

**¿Listo para integrar IA en tu negocio?** [Contáctanos](/#contacto) para una consulta gratuita.
    `,
  },
  {
    slug: "cuanto-cuesta-integrar-ia-en-tu-empresa",
    title: "¿Cuánto Cuesta Integrar IA en tu Empresa?",
    excerpt:
      "Nadie te va a dar un precio fijo por \"integrar IA\" porque no existe. Te contamos los 3 niveles reales de inversión y qué mueve el costo final.",
    date: "2026-05-03",
    readTime: "6 min",
    category: "Inteligencia Artificial",
    featured: false,
    coverImage: "/blog/covers/cuanto-cuesta-integrar-ia-en-tu-empresa.svg",
    keywords: [
      "costo integración IA",
      "cuánto cuesta IA",
      "precio IA empresas",
      "IA a medida",
      "presupuesto IA",
      "software a medida",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# ¿Cuánto Cuesta Integrar IA en tu Empresa?

Es la pregunta que más nos hacen en la primera consulta, y la que menos nos gusta responder con un solo número — porque cualquier cifra sin contexto termina siendo mentira. El costo de integrar IA en una empresa no es un precio de catálogo: depende de qué estás integrando, dónde, y qué tan atado está a tus sistemas actuales.

Esto es lo que realmente mueve el precio, sin vueltas.

## Los 3 Niveles Reales de Inversión

### 1. Herramientas listas para usar
ChatGPT Team, Copilot, plugins de tu CRM o tu helpdesk. Van desde gratis hasta unos pocos cientos de dólares mensuales. Se implementan en días, pero hacen exactamente lo que la herramienta ya permite — ni un poco más.

### 2. Integración a medida sobre tu software existente
Un chatbot conectado a tu base de datos real, un sistema que lee y clasifica tus documentos, un asistente interno con el contexto de tu empresa. La inversión típica arranca en un piloto acotado (un caso de uso, bien definido) y crece según cuántos sistemas hay que conectar y qué tan compleja es la lógica de negocio.

### 3. Plataforma con IA integrada desde el diseño
Un producto nuevo donde la IA es un módulo más del sistema, no un agregado. Se presupuesta igual que cualquier desarrollo de software a medida: por alcance, no por "cuánto cuesta la IA" como si fuera un ítem aparte.

## Qué Factores Mueven el Precio

- **Cuántos sistemas hay que conectar**: CRM, ERP, base de datos, WhatsApp Business, facturación. Cada integración adicional suma tiempo de desarrollo real.
- **El estado de tus datos**: si están ordenados y accesibles, el proyecto avanza rápido. Si hay que limpiar, migrar o consolidar información primero, ese trabajo se presupuesta aparte.
- **Privacidad y compliance**: si necesitás que todo corra en tu propia infraestructura en vez de la nube de un tercero, el proyecto cambia de arquitectura.
- **Soporte post-lanzamiento**: mantenimiento, ajustes del modelo con el tiempo, monitoreo de calidad de las respuestas.

## Por Qué no Publicamos una Tabla de Precios

Porque publicar "IA desde U$D X" sin conocer tu caso es, en el mejor de los casos, un precio de piloto mínimo que casi nunca aplica a un proyecto real — y en el peor, una forma de generar leads con un número que después no se cumple.

En KEI Software preferimos la otra vía: una primera consulta sin cargo donde entendemos tu caso puntual, definimos el alcance real, y ahí sí te damos un número concreto.

## Conclusión

El costo de integrar IA no se resume en un precio de catálogo, pero tampoco es un misterio: son tres niveles claros, y factores concretos que los mueven. Si querés saber en cuál de los tres estás parado vos, [conversemos sin cargo](/#contacto).
    `,
  },
  {
    slug: "ia-a-medida-vs-herramientas-genericas",
    title: "IA a Medida vs. Herramientas Genéricas: ¿Cuál Elegir?",
    excerpt:
      "ChatGPT y los plugins prearmados resuelven el 80% de los casos genéricos. Para el otro 20% — el que realmente te diferencia — hace falta IA integrada a tu propio software.",
    date: "2026-05-05",
    readTime: "6 min",
    category: "Inteligencia Artificial",
    featured: false,
    coverImage: "/blog/covers/ia-a-medida-vs-herramientas-genericas.svg",
    keywords: [
      "IA a medida",
      "herramientas de IA genéricas",
      "integración de IA",
      "software a medida",
      "ChatGPT vs IA a medida",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# IA a Medida vs. Herramientas Genéricas: ¿Cuál Elegir?

No toda "integración de IA" es igual, aunque el marketing de muchas herramientas quiera hacerte creer lo contrario. Hay una diferencia real entre conectar un plugin y construir algo que conoce tu negocio de verdad.

## Herramientas Genéricas

ChatGPT, Zapier AI, los plugins prearmados de tu CRM o helpdesk:

- Rápidas de probar, muchas veces sin costo inicial
- Limitadas a los flujos que la herramienta ya soporta de fábrica
- No conocen los datos ni las reglas específicas de tu negocio — responden con conocimiento general, no con el tuyo

Son excelentes para el 80% de los casos genéricos: redactar un email, resumir un documento, responder una pregunta frecuente sin contexto de tu empresa.

## IA a Medida, Integrada en tu Software

Un desarrollo que se conecta directo a tu base de datos, tu CRM o tu sistema interno:

- Responde con las reglas y el contexto reales de tu empresa, no genéricos
- Escala junto con el resto de tu plataforma en vez de quedar aislada como una herramienta más
- Se puede ajustar con el tiempo a medida que cambia tu negocio

## Ejemplos Concretos de Cuándo Conviene Cada Una

**Usá una herramienta genérica si:** necesitás redactar contenido, resumir textos, o responder consultas simples que no dependen de datos internos de tu empresa.

**Necesitás IA a medida si:** querés un chatbot que "sepa" tu stock real en tiempo real, un sistema que clasifique tus documentos con tu propio criterio de negocio (no uno genérico), o un dashboard que prediga demanda con tus datos históricos y no con supuestos generales.

La diferencia se nota apenas el caso de uso se aleja de lo genérico. Ahí es donde el desarrollo de software a medida le gana a cualquier herramienta lista para usar — porque una herramienta genérica no puede razonar sobre datos que nunca vio.

## Cómo Elegir

Antes de contratar cualquier IA, hacete una pregunta simple: ¿esta respuesta necesita saber algo específico de mi empresa que no está en internet? Si la respuesta es sí, una herramienta genérica te va a quedar corta tarde o temprano.

## Conclusión

No se trata de elegir "la mejor IA" en abstracto, sino la que corresponde a tu caso de uso. En KEI Software integramos ambos enfoques según lo que realmente necesites — sin venderte de más. [Conversemos sin cargo](/#contacto) sobre tu caso.
    `,
  },
  {
    slug: "ia-para-empresas-en-cordoba-y-argentina",
    title: "IA para Empresas en Córdoba y Argentina",
    excerpt:
      "Ser un equipo de Córdoba con clientes en toda Argentina nos da una mirada distinta sobre cómo pymes y empresas del país pueden integrar IA sin sobre-invertir.",
    date: "2026-05-07",
    readTime: "5 min",
    category: "Inteligencia Artificial",
    featured: false,
    coverImage: "/blog/covers/ia-para-empresas-en-cordoba-y-argentina.svg",
    keywords: [
      "IA Córdoba",
      "IA Argentina",
      "inteligencia artificial pymes Argentina",
      "desarrollo de software Córdoba",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# IA para Empresas en Córdoba y Argentina

Somos un equipo de Córdoba, Argentina, y trabajamos 100% remoto con empresas de todo el país. Eso nos da una mirada distinta sobre qué tiene sentido en IA para una pyme o empresa argentina, más allá de lo que se lee en artículos pensados para el mercado de Estados Unidos.

## El Contexto Local Importa

Las guías genéricas de IA asumen presupuestos, herramientas y sistemas que muchas empresas argentinas no tienen instalados. La realidad local es otra:

- Facturación electrónica de AFIP como sistema central del negocio
- WhatsApp Business como canal principal de ventas y atención, no un canal secundario
- ERPs y sistemas de gestión regionales que no siempre tienen integraciones "de fábrica" con las herramientas de IA más conocidas
- Presupuestos que necesitan resultados concretos rápido, no experimentos de laboratorio

## Dónde Vemos más Oportunidad Hoy

- **Atención por WhatsApp con contexto real**: un asistente que responda con el stock, los precios y las políticas reales de la empresa, no respuestas genéricas
- **Automatización de facturación y documentación**: extraer y cargar datos de facturas y comprobantes sin depender de una integración de fábrica que no existe para tu sistema
- **Integrar IA sobre lo que ya tenés**: no hace falta migrar todo tu stack para sumar IA — se puede integrar sobre el sistema que ya usás

## Por Qué Trabajar con un Equipo Local

- Entendemos el contexto de pymes y empresas argentinas: presupuestos, tiempos, y con qué sistemas ya trabajan
- Comunicación directa en español, sin intermediarios ni tercerización
- Somos parte del mismo huso horario y la misma realidad económica que vos

## Conclusión

La IA no es solo para empresas con presupuestos de Silicon Valley. Si estás evaluando qué tiene sentido para tu empresa en Córdoba o en cualquier parte de Argentina, [conversemos sin cargo](/#contacto) sobre tu caso puntual.
    `,
  },
  {
    slug: "nextjs-vs-react-que-elegir",
    title: "Next.js vs React: ¿Qué Framework Elegir en 2026?",
    excerpt:
      "Comparamos Next.js y React puro para ayudarte a decidir cuál es la mejor opción para tu próximo proyecto web.",
    date: "2026-04-28",
    readTime: "6 min",
    category: "Desarrollo Web",
    featured: false,
    coverImage: "/blog/covers/nextjs-vs-react-que-elegir.svg",
    keywords: [
      "Next.js",
      "React",
      "framework",
      "desarrollo web",
      "SSR",
      "performance",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# Next.js vs React: ¿Qué Framework Elegir en 2026?

La pregunta del millón: ¿Next.js o React puro? En 2026, la respuesta depende de tu caso de uso específico.

## React: El Fundamento

React sigue siendo la biblioteca de UI más popular. Sus ventajas:

- **Flexibilidad total**: Configuras todo desde cero
- **Ecosistema maduro**: Millones de paquetes disponibles
- **Curva de aprendizaje gradual**: Aprende lo básico primero
- **Control completo**: Decides cada aspecto de tu arquitectura

**Ideal para:**
- Aplicaciones de una sola página (SPA)
- Dashboards internos
- Proyectos con requisitos muy específicos
- Equipos que prefieren control total

## Next.js: El Framework Todo-en-Uno

Next.js toma React y agrega superpoderes. En 2026, Next.js 16 incluye:

- **Server Components por defecto**: Mejor performance
- **App Router estable**: Routing más intuitivo
- **Optimización automática**: Imágenes, fuentes, bundles
- **SEO superior**: SSR y SSG out-of-the-box
- **API Routes**: Backend integrado
- **TypeScript first**: Mejor DX desde día 1

**Ideal para:**
- Sitios web corporativos
- E-commerce
- Blogs y contenido SEO-crítico
- MVPs que necesitan lanzarse rápido
- Proyectos que crecerán en complejidad

## Comparativa Directa

| Aspecto | React | Next.js |
|---------|-------|---------|
| SEO | Manual (react-helmet) | Automático |
| Performance inicial | Depende de ti | Optimizado por defecto |
| Routing | React Router | Integrado (file-based) |
| SSR | Requiere setup | Built-in |
| Complejidad | Baja → Alta | Media desde inicio |
| Tiempo al mercado | Más lento | Más rápido |
| Hosting | Cualquier CDN | Vercel optimizado (o Node) |

## Nuestra Recomendación 2026

**Usa React puro si:**
- Construyes una app interna sin SEO
- Necesitas máxima flexibilidad
- Ya tienes arquitectura establecida
- El equipo prefiere configurar desde cero

**Usa Next.js si:**
- El SEO es importante
- Quieres productive desde día 1
- Necesitas SSR o SSG
- Valorás convenciones sobre configuración
- **En 90% de los casos, Next.js es la mejor opción**

## Nuestra Stack

En KEI Software usamos **Next.js 16** para la mayoría de proyectos porque:
- Velocidad de desarrollo
- Performance superior
- SEO optimizado
- Mejor experiencia de usuario
- Fácil deployment en Vercel

## Conclusión

No hay respuesta incorrecta, pero Next.js ha evolucionado tanto que en 2026 es difícil justificar React puro para nuevos proyectos web.

¿Necesitas ayuda para elegir tu stack? [Hablemos](/#contacto).
    `,
  },
  {
    slug: "automatizacion-procesos-empresariales",
    title: "5 Procesos Empresariales que Debes Automatizar Ya",
    excerpt:
      "Identifica qué tareas están consumiendo tiempo innecesario en tu empresa y cómo automatizarlas de forma efectiva.",
    date: "2026-04-25",
    readTime: "7 min",
    category: "Automatización",
    featured: false,
    coverImage: "/blog/covers/automatizacion-procesos-empresariales.svg",
    keywords: [
      "automatización",
      "productividad",
      "workflows",
      "Zapier",
      "Make",
      "n8n",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# 5 Procesos Empresariales que Debes Automatizar Ya

El tiempo de tu equipo es valioso. Estas son las automatizaciones con mayor ROI que vemos en 2026.

## 1. Onboarding de Clientes

**Antes:** Enviar emails manuales, crear cuentas una por una, configurar accesos.  
**Después:** Flujo automático desde el signup hasta el primer valor.

**Herramientas:** Zapier, n8n, o desarrollo custom  
**Ahorro:** 3-5 horas por cliente

## 2. Procesamiento de Facturas

**Antes:** Revisar PDF, copiar datos, cargar al sistema contable.  
**Después:** OCR + IA extrae datos automáticamente.

**Herramientas:** OpenAI Vision, DocuSign, integración con tu ERP  
**Ahorro:** 70% del tiempo administrativo

## 3. Reportes Periódicos

**Antes:** Recopilar datos manualmente cada semana/mes.  
**Después:** Dashboard actualizado en tiempo real + email automático.

**Herramientas:** Power BI, Metabase, desarrollo custom  
**Ahorro:** 2-4 horas semanales

## 4. Atención al Cliente Nivel 1

**Antes:** Responder las mismas preguntas 100 veces.  
**Después:** Chatbot responde FAQs, deriva casos complejos.

**Herramientas:** ChatGPT API, Intercom, desarrollo custom  
**Ahorro:** 50-70% de consultas automatizadas

## 5. Sincronización entre Sistemas

**Antes:** Exportar CSV de sistema A, importar a sistema B.  
**Después:** Sincronización automática en tiempo real.

**Herramientas:** Zapier, Make, APIs custom  
**Ahorro:** Elimina errores humanos + horas de trabajo

## ¿Cómo Empezar?

1. **Audita** tus procesos actuales
2. **Identifica** las tareas más repetitivas
3. **Prioriza** por impacto vs complejidad
4. **Implementa** gradualmente
5. **Mide** el ROI

## Conclusión

La automatización no es reemplazar personas: es liberarlas para trabajo de mayor valor.

[Agenda una consulta](/#contacto) para analizar qué procesos automatizar en tu empresa.
    `,
  },
  {
    slug: "mejores-practicas-desarrollo-software",
    title: "Mejores Prácticas de Desarrollo de Software a Medida",
    excerpt:
      "Descubre las metodologías y prácticas que usamos para garantizar calidad y transparencia en cada proyecto.",
    date: "2026-04-20",
    readTime: "10 min",
    category: "Desarrollo",
    featured: false,
    coverImage: "/blog/covers/mejores-practicas-desarrollo-software.svg",
    keywords: [
      "desarrollo software",
      "metodología ágil",
      "calidad",
      "testing",
      "CI/CD",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# Mejores Prácticas de Desarrollo de Software a Medida

Después de 53+ proyectos, estas son las prácticas que garantizan éxito.

## 1. Discovery antes de Código

**Nunca** empezamos a codear sin entender a fondo:
- ¿Qué problema resuelve?
- ¿Quiénes son los usuarios?
- ¿Cuáles son los casos de uso críticos?
- ¿Qué define el éxito?

**Tiempo invertido:** 1-2 semanas  
**Resultado:** 80% menos cambios de alcance

## 2. Sprints Cortos y Demo Constante

- Sprints de 1-2 semanas
- Demo funcional al final de cada sprint
- Feedback inmediato del cliente
- Ajustes sobre código real, no mockups

## 3. Testing desde Día 1

**Nuestra pirámide de testing:**
- **Unit tests:** Lógica de negocio (70%)
- **Integration tests:** APIs y servicios (20%)
- **E2E tests:** Flujos críticos (10%)

**Herramientas 2026:** Vitest, Playwright, Testing Library

## 4. Code Review Obligatorio

- Todo código pasa por revisión
- Al menos 1 aprobación antes de merge
- Checklist de calidad estandarizado
- Foco en legibilidad y mantenibilidad

## 5. CI/CD Automatizado

**Pipeline típico:**
1. Push a Git
2. Tests automáticos
3. Build & optimización
4. Deploy a staging
5. Validación
6. Deploy a producción

**Tiempo de deploy:** < 10 minutos

## 6. Documentación Viva

No documentos Word obsoletos. Usamos:
- **README.md** actualizado
- **Comentarios** en código complejo
- **API docs** auto-generados (OpenAPI)
- **Decision records** para arquitectura

## 7. Monitoring y Observabilidad

Desde día 1 monitoreamos:
- Errores (Sentry)
- Performance (Vercel Analytics)
- Logs estructurados
- Métricas de negocio

## 8. Comunicación Transparente

- **Slack/Discord:** Comunicación diaria
- **Weekly sync:** 30 min con cliente
- **Notion/Linear:** Tracking de tareas visible
- **Sin sorpresas:** Problemas comunicados early

## 9. TypeScript Everywhere

En 2026, JavaScript puro es legacy. TypeScript provee:
- Menos bugs en producción
- Mejor DX
- Refactoring seguro
- Documentación implícita

## 10. Performance Budget

Definimos desde inicio:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size < 300KB
- Core Web Vitals en "Good"

## Stack Típico 2026

- **Frontend:** Next.js 16 + TypeScript
- **Backend:** Next.js API Routes o Node.js
- **Database:** PostgreSQL (Supabase)
- **Hosting:** Vercel
- **Auth:** Clerk o Auth.js
- **Payments:** Stripe

## Conclusión

El software a medida no es más caro si se hace bien desde el inicio.

Estas prácticas nos permiten entregar en tiempo, presupuesto, y con calidad excepcional.

[Hablemos de tu proyecto](/#contacto).
    `,
  },
  {
    slug: "stability-asistente-ia-para-entrenadores",
    title: "Dejá de Buscar. Empezá a Preguntar: el Asistente que le Sumamos a Stability",
    excerpt:
      "Le sumamos a Stability un asistente que conoce a cada uno de tus alumnos —planes, constancia, cargas, esfuerzo— y te contesta al toque, con tus palabras, sin abrir una sola planilla.",
    date: "2026-05-10",
    readTime: "5 min",
    category: "Casos de Éxito",
    featured: true,
    coverImage: "/blog/covers/stability-asistente-ia-para-entrenadores.svg",
    keywords: [
      "Stability",
      "asistente de IA",
      "software para gimnasios",
      "IA para entrenadores",
      "caso de éxito",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# Dejá de Buscar. Empezá a Preguntar

Le sumamos a **Stability** un asistente que conoce a cada uno de tus alumnos —planes, constancia, cargas, esfuerzo— y te contesta al toque, con tus palabras, sin que abras una sola planilla.

Así se ve en la práctica:

> **Vos:** ¿quién no entrenó esta semana?
>
> **Stability:** 3 alumnos sin sesiones registradas: Lucas M. (0/3), Fede R. (1/4), Cami S. (0/3). ¿Querés que te arme un recordatorio para los tres?

> **Vos:** ¿y cómo viene la sentadilla de Cami?
>
> **Stability:** De 40 kg a 62 kg en 10 semanas. Progresión constante, sin estancamientos.

## Tenés 60 Alumnos en la Cabeza y Ninguno en una Sola Pantalla

Planillas de Excel, capturas de WhatsApp, un cuaderno con anotaciones de la última semana. Te das cuenta de que alguien bajó los brazos recién cuando ya dejó de venir. Antes de armarle el próximo plan a un alumno, tenés que ir a buscar cómo venía entrenando, qué cargas movió, si viene reportando molestias — y eso, multiplicado por cada persona que entrena con vos, se come la tarde.

## Ahora se lo Preguntás, como Quien le Escribe a Alguien del Equipo

Nada de exportar reportes ni bucear en tres pantallas distintas. Le preguntás en una frase, con tus propias palabras, y te contesta con los datos reales de tu gimnasio —al instante, desde donde estés.

- **"¿Cómo viene la constancia de Juan este mes?"** → 68% de cumplimiento. Bajó dos semanas seguidas.
- **"¿A quién se le vence el plan esta semana?"** → 4 alumnos. El más urgente vence en 2 días.
- **"¿Quién viene entrenando muy exigido?"** → 2 alumnos con esfuerzo percibido alto en sus últimas 3 sesiones.
- **"Contame los planes que armé este mes"** → 12 planes nuevos, 7 ya asignados a alumnos activos.

## No es una Caja Negra. Es una Lupa más Rápida sobre lo Tuyo

Entendemos la desconfianza que genera meter "inteligencia artificial" en algo tan sensible como la información de tus alumnos. Por eso lo construimos con reglas simples:

- **Solo lee, nunca escribe.** El asistente consulta lo que ya tenés cargado. No puede crear, borrar ni modificar nada por su cuenta.
- **Solo vos le preguntás.** Cada acceso es personal y queda registrado. Nadie más entra a tus datos a través de él.
- **Tus datos siguen siendo tuyos.** No se comparten con terceros ni se usan para entrenar nada. Son la información de tu gimnasio, punto.

## ¿Y en tu Gimnasio?

Mostranos cómo trabajás hoy. Te mostramos cómo quedaría con tus alumnos reales. Sin compromiso, sin tecnicismos — una charla de 20 minutos para ver si un asistente así te sirve tal como venís laburando.

**[Hablemos →](/#contacto)**

Respondemos nosotros, no un bot.
    `,
  },
  {
    slug: "le-ensenamos-a-una-ia-a-conocer-un-negocio-de-memoria",
    title: "Le Enseñamos a una Inteligencia Artificial a Conocer un Negocio de Memoria",
    excerpt:
      "En el sistema que desarrollamos para Alfa Club armamos un asistente que sabe, en tiempo real, cuántos socios están activos, cuánto se recaudó y quién está por vencer su cuota — y lo pusimos a prueba con 59 preguntas reales antes de darlo por terminado.",
    date: "2026-05-12",
    readTime: "4 min",
    category: "Casos de Éxito",
    featured: true,
    coverImage: "/blog/covers/le-ensenamos-a-una-ia-a-conocer-un-negocio-de-memoria.svg",
    keywords: [
      "Alfa Club",
      "Alfa Bot",
      "asistente de IA",
      "software para gimnasios",
      "caso de éxito",
      "IA para negocios",
    ],
    author: {
      name: "KEI Software",
      role: "Equipo de Desarrollo",
    },
    content: `
# Le Enseñamos a una Inteligencia Artificial a Conocer un Negocio de Memoria

Hay una pregunta que todo dueño de negocio se hace parado, con el celular en la mano: "¿cómo venimos este mes?" Normalmente cuesta tiempo: abrir una planilla, cruzar números, llamar a alguien.

En uno de nuestros últimos proyectos —el sistema que desarrollamos para **Alfa Club**— decidimos que esa pregunta debía tener respuesta en tres segundos, en español de todos los días, sin que nadie tuviera que aprender nada nuevo.

## Así Nació Alfa Bot

Un asistente que vive adentro del sistema y sabe, en tiempo real, cuántos socios están activos, cuánto se recaudó, quién está por vencer su cuota. Se le pregunta como a un empleado de confianza que se sabe el negocio de memoria — con la diferencia de que está disponible las 24 horas y nunca se cansa de repetir la respuesta.

## Lo Fácil y lo Difícil

Conectar una inteligencia artificial a los datos de una empresa es la parte fácil. Lo difícil —y en lo que pusimos casi todo el esfuerzo— es hacerlo bien: que nunca muestre lo que no debe, que nunca se equivoque con un número, que el dueño pueda confiar ciegamente en lo que le contesta.

## El Examen de 59 Preguntas

Antes de dar el trabajo por terminado, armamos un examen de 59 preguntas reales del negocio y las corrimos una por una para medir qué tan bien respondía Alfa Bot.

**El resultado: acertó las 59.**

Esa disciplina —probar antes de confiar— es la diferencia entre "le pusimos un chat de IA" y algo que un negocio puede usar todos los días sin sorpresas.

## La Pregunta que Importa

Si estás pensando en sumarle inteligencia artificial a tu negocio, la pregunta no es "¿se puede?" — hoy casi todo se puede. La pregunta es quién te lo construye con ese mismo cuidado.

**[Hablemos →](/#contacto)**
    `,
  },
];

// Render a post's Markdown body to HTML.
// The leading `# H1` line is stripped so the rendered article body starts at H2
// (the page already renders the post title as the single <h1>).
// Marked output is trusted here: blog content is authored in-repo, never user
// input, so no HTML sanitizer is needed.
export function renderMarkdown(md: string): string {
  const withoutLeadingH1 = md.replace(/^\s*#\s+.*(\r?\n)?/, "");
  return marked.parse(withoutLeadingH1, {
    async: false,
    gfm: true,
    breaks: false,
  });
}

// Utility functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 2,
): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

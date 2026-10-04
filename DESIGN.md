---
name: KEI Software
description: Calm, light studio landing in the Lusion x Osmo register, built from the KEI brand manual.
colors:
  azul-ui: "#3F7DFF"
  fondo-oscuro: "#020714"
  azul-marino: "#16205E"
  fondo-claro: "#F9FAFC"
  azul-hielo: "#DFE8FD"
  card-white: "#FFFFFF"
  ink-soft: "rgba(2, 7, 20, 0.64)"
  hairline: "rgba(2, 7, 20, 0.12)"
  on-dark-soft: "rgba(223, 232, 253, 0.72)"
typography:
  display:
    fontFamily: "Glacial Indifference, Montserrat, sans-serif"
    fontSize: "clamp(2.9rem, 7.6vw, 7.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Glacial Indifference, Montserrat, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Glacial Indifference, Montserrat, sans-serif"
    fontSize: "clamp(1.75rem, 2.8vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.15vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.14em"
  button:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.08em"
rounded:
  pill: "999px"
  panel: "clamp(1.5rem, 2.6vw, 2.5rem)"
  card: "clamp(1.25rem, 1.8vw, 1.75rem)"
  textarea: "1.75rem"
  frame: "1.2rem"
spacing:
  gutter: "clamp(1rem, 3vw, 2.5rem)"
  section: "clamp(5.5rem, 12vw, 11rem)"
  panel-block: "clamp(4.5rem, 10vw, 9rem)"
  card-inset: "clamp(1.5rem, 2.4vw, 2.25rem)"
  wrap-max: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.fondo-oscuro}"
    textColor: "{colors.fondo-claro}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem 0 1.25rem"
    height: "3.25rem"
  button-light:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.fondo-oscuro}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem 0 1.25rem"
    height: "3.25rem"
  button-ice:
    backgroundColor: "{colors.azul-hielo}"
    textColor: "{colors.fondo-oscuro}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.1rem 0 0.95rem"
    height: "2.5rem"
  button-on-dark:
    backgroundColor: "{colors.fondo-claro}"
    textColor: "{colors.fondo-oscuro}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem 0 1.25rem"
    height: "3.25rem"
  input-field:
    backgroundColor: "{colors.azul-hielo}"
    textColor: "{colors.fondo-oscuro}"
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3.5rem"
  input-field-focus:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.fondo-oscuro}"
  nav-bar:
    backgroundColor: "{colors.fondo-oscuro}"
    textColor: "{colors.fondo-claro}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.5rem 0.5rem 1.25rem"
    height: "3.5rem"
  chip-inline:
    backgroundColor: "rgba(63, 125, 255, 0.16)"
    textColor: "{colors.azul-ui}"
    rounded: "{rounded.pill}"
    padding: "0.12em 0.55em"
  panel-navy:
    backgroundColor: "{colors.azul-marino}"
    textColor: "{colors.fondo-claro}"
    rounded: "{rounded.panel}"
    padding: "clamp(4.5rem, 10vw, 9rem) 0"
  card-quote:
    backgroundColor: "{colors.azul-hielo}"
    textColor: "{colors.fondo-oscuro}"
    rounded: "{rounded.card}"
    padding: "clamp(1.5rem, 2.5vw, 2.25rem)"
    width: "min(86vw, 27rem)"
---

# Design System: KEI Software

## Overview

**Creative North Star: "The Quiet Studio Floor"**

A bright, unhurried studio page where the work does the talking. The ground is a near-white cool paper, type is set huge and at regular weight, and everything you can touch is a soft pill or a big soft-cornered panel. The register is borrowed from lusion.co (statement sections, the reel window, register marks, the counting intro) and osmo.supply (floating dark pill nav, ruled service rows, pill fields, colored author cards, rolling labels). Decoration is replaced by KEI's real projects: the hero's arc of project cards, the reel, the two-column project grid.

Density is low. Sections breathe with 88 to 176px of vertical padding, headlines take the width, and body copy sits off to the right in a narrow column. Motion is soft and once: lines rise out of masks, blocks fade up, rules draw from the left. Nothing loops except the nav strip marquee and the reel crossfade.

The palette is the brand manual and nothing else: five brand colors plus white for cards. One accent, Azul UI, carries every highlight.

**Key Characteristics:**
- Regular-weight Glacial Indifference display at very large sizes, tight leading (0.98), slight negative tracking.
- Full pills everywhere: buttons, nav, fields, chips, icon buttons, logo discs.
- Large panel radii (24 to 40px, fluid) on photo frames, navy slabs and team cards.
- A single blue accent: the pill dot, the second headline line, the drawn arc, the process progress line.
- Flat surfaces; depth only from long soft shadows on floating ink elements.
- Light and dark themes share one token set; dark swaps ground and ink and turns ice surfaces navy.

## Colors

A cool, low-chroma blue family from the brand manual with one saturated blue doing all the pointing.

### Primary
- **Azul UI** (#3F7DFF): the only accent. Pill dots, the second line of the hero and closing headlines, the blue thread (a 8–36px stroke that opens as the statement arc and falls through the page margins to the closing), the celeste highlight behind the hero's three service words (Azul UI at 16% opacity, text in Azul UI), the process progress line and step nodes, contact-icon hover fill, the first team card, focus rings and text selection.

### Secondary
- **Azul Marino** (#16205E): the deep slab. The process panel, the contact success panel, the second team card, image placeholders behind photos. In dark mode it becomes the card and ice surface.

### Tertiary
- **Azul Hielo** (#DFE8FD): the soft surface. Form fields at rest, testimonial cards, the third team card, the nav marquee strip, contact icon discs, the small nav CTA pill.

### Neutral
- **Fondo Claro** (#F9FAFC): page ground in light mode; text on dark surfaces.
- **Fondo Oscuro** (#020714): ink in light mode; the nav pill, loader, wheel card frames, primary pill and WhatsApp pill; page ground in dark mode.
- **Card White** (#FFFFFF): the light pill and focused fields only. Not a page surface.
- **Ink Soft** (ink at 64%; dark mode ice at 70%): body copy and supporting text.
- **Ink Faint** (ink at 62%; dark mode ice at 66%): tags under rows, placeholders, register marks.
- **Hairline** (ink at 12%; dark mode ice at 14%): service row rules, the client label border, logo disc rings.
- **On-dark Soft** (ice at 72%): body copy inside navy panels.

### Named Rules
**The Brand Manual Rule.** The palette is exactly #3F7DFF, #020714, #16205E, #F9FAFC, #DFE8FD, plus #FFFFFF for cards. Tints are opacity steps of those colors, never new hues. No gradients.

**The One Blue Rule.** Azul UI is the only accent. If something needs to point, it gets the blue dot or blue text; nothing else competes.

**The Two-Theme Rule.** Use the variable tokens (ground, ink, ice, card, line) for anything that sits on the page ground, so the `.dark` swap carries it. Hard-coded navy and ink are reserved for surfaces that stay dark in both themes (nav, loader, process slab, wheel frames).

## Typography

**Display Font:** Glacial Indifference (self-hosted, SIL OFL), falling back to Montserrat
**Body Font:** Montserrat (next/font/google, weights 300 to 700), falling back to system-ui

**Character:** A wide, geometric, slightly naive display face set large and regular, against a sturdy geometric sans that handles every label and paragraph. The contrast is scale and weight, never ornament.

### Hierarchy
- **Display** (400, clamp(2.9rem, 7.6vw, 7.25rem), 0.98): hero headline and the closing question. Balanced wrap.
- **Headline** (400, clamp(2.6rem, 6.4vw, 6rem), 0.98): every section title.
- **Title** (400, clamp(1.75rem, 2.8vw, 2.6rem), 1.04): service row names; project and team names use the same face at 1.75 to 3.25rem.
- **Body** (400, clamp(1rem, 1.15vw, 1.125rem), 1.65): paragraphs in Ink Soft, held to 22 to 40rem measure.
- **Label** (600, 0.6875rem, 0.14em, uppercase): category and capability tags joined by " • ", form labels, contact method labels.
- **Button** (600, 0.8125rem, 0.08em, uppercase): pill labels; 0.6875rem in the small pill.

### Named Rules
**The Regular Weight Rule.** Display type is always weight 400. Size carries the hierarchy; the bold cut is loaded but not part of the system.

**The Two Faces Rule.** Glacial for anything read as a headline or name, Montserrat for everything else. No third family on this surface.

## Layout

Content sits in a centered wrap (max 1600px) with a fluid gutter (clamp(1rem, 3vw, 2.5rem)). Sections get symmetric block padding of clamp(5.5rem, 12vw, 11rem); sections that follow a panel drop their top padding.

The section grammar is a 12-column header: the headline takes columns 1 to 7, a short body paragraph sits in columns 9 to 12 aligned to the headline's baseline. Lists then run full width below with a clamp(2.5rem, 5vw, 5.5rem) gap. Variants: services as ruled rows (title in 6 columns, copy in columns 8 to 12), projects as a two-column image grid, process as four columns on a navy slab, team as three equal cards, testimonials as a horizontal snap rail that bleeds to the gutter.

Full-bleed panels (process) are inset from the viewport by clamp(0.5rem, 1.2vw, 1rem) so their rounded corners stay visible. Below 768px every grid collapses to one column; the hero's project wheel shrinks (radius 620px, cards 220px) below 640px.

Fixed chrome: the nav floats 12 to 16px from the top, max 46rem wide; the WhatsApp pill floats bottom-right and appears after 70% of the first viewport.

## Elevation & Depth

Flat by default. Surfaces separate by tone (ground, ice, navy, white), not by shadow. Shadows exist only on things that float or lift off the ground, and they are long, soft and pulled upward with a negative spread so they read as ambient lift rather than outline.

### Shadow Vocabulary
- **Floating ink** (`box-shadow: 0 18px 40px -18px rgba(2,7,20,0.55)`): the nav pill and the WhatsApp pill, paired with a 1px white/10 ring.
- **Light lift** (`box-shadow: 0 1px 0 rgba(2,7,20,0.04), 0 8px 24px -14px rgba(2,7,20,0.35)`): the light pill and the carousel arrow buttons.
- **Wheel card** (`box-shadow: 0 30px 60px -30px rgba(2,7,20,0.55)`): hero project cards; in dark mode a 1px ice/16 ring plus a black drop.

Image depth comes from masks instead: the hero fades out over its last 4rem, the marquee strip fades at both ends, the reel opens via clip-path inset.

### Named Rules
**The Tone Before Shadow Rule.** Panels and cards never take a shadow. Only floating controls and the wheel cards do.

## Shapes

Two shape families and nothing in between: the full pill (999px) for every interactive control, chip, field and avatar disc, and the large fluid panel radius for every content surface. Panels and photo frames use clamp(1.5rem, 2.6vw, 2.5rem); testimonial cards use the smaller clamp(1.25rem, 1.8vw, 1.75rem); textareas soften to 1.75rem; wheel cards frame their image in a 6px ink border with 1.2rem outer and 0.9rem inner corners. Portraits and client logos are perfect circles.

The recurring geometric accent is the Lusion register mark: a light-weight "+" in Ink Faint hung just below the bottom corners of a panel (reel, process slab).

## Components

### Buttons
Soft, confident pills with a leading blue dot and a label that rolls.
- **Shape:** full pill (999px), 3.25rem tall; small size 2.5rem.
- **Primary (ink):** Fondo Oscuro fill, Fondo Claro label, Azul UI dot, padding 0 1.5rem 0 1.25rem, 0.7rem gap.
- **Light:** white fill, ink label, light-lift shadow; usually without the dot as the secondary action beside a primary.
- **Ice:** Azul Hielo fill (navy in dark mode, light text); the nav CTA.
- **On-dark:** Fondo Claro fill on navy or photo surfaces.
- **Hover (fine pointers only):** the label rolls up to a copy of itself (320ms, ease-out) and the dot scales to 1.6x (300ms).
- **Active:** scale 0.97 (160ms ease-out).
- **Focus:** 2px Azul UI outline, 3px offset, pill-shaped.
- **Icon buttons:** 40 to 48px circles; translucent white on the nav, white with light lift for carousel arrows, ice discs for contact methods (fill turns Azul UI with white icon on hover).

### Chips
- **Inline highlight (k-mark):** a pill of Azul UI at 16% opacity (24% in dark) behind a word in the hero sentence, text in Azul UI at weight 600, padding 0.12em 0.55em; it sweeps in left to right with clip-path after the hero sentence rises, 90ms apart.
- **Tag line:** uppercase Label type, items joined by " • " in Ink Faint, under service and project descriptions.

### Cards / Containers
- **Navy slab:** Azul Marino, panel radius, clamp(4.5rem, 10vw, 9rem) block padding, register marks; holds process and the contact success state.
- **Project frame:** 4:3 image in a panel-radius frame on an ice placeholder; a small light pill ("Ver proyecto") rises in on hover or focus.
- **Testimonial card:** Azul Hielo, card radius, width min(86vw, 27rem), quote above a circular logo and name.
- **Team card:** 4:5, panel radius, one of three tones in order (Azul UI with ink text, Azul Marino with light text, Azul Hielo with ink text), name in Glacial on two lines, circular portrait at 68% width, small LinkedIn pill.
- **Shadow strategy:** none (see Elevation).

### Inputs / Fields
- **Style:** Azul Hielo fill, 1px transparent border, full pill, 3.5rem tall, padding 0 1.4rem, 1rem text; textarea at 1.75rem radius.
- **Focus:** border turns Azul UI and the fill turns white (card token); no glow.
- **Error:** border turns red on aria-invalid; message below in red, weight 500.
- **Labels:** Label type in Ink Soft above each field.

### Navigation
A floating ink pill, 3.5rem tall, centered, max 46rem: horizontal logo left, rolling links (0.8125rem, weight 500, 70% white to full on hover), theme and sound icon buttons, an ice "Hablemos" pill. An ice marquee strip of tagged phrases hangs under it and slides up out of view after 40px of scroll. On mobile a "Menú" pill opens a full-screen ground sheet that wipes down via clip-path (500ms, in-out) with Glacial links at 3.25rem staggering up and a full-width primary pill at the bottom.

### Project Wheel (signature)
The hero is type and two actions only, centred in the first screen with generous spacing between the headline, the sentence and the buttons. The blue thread starts below it, in the statement.

### Motion
- **Curves:** ease-out cubic-bezier(0.23, 1, 0.32, 1) for nearly everything; in-out cubic-bezier(0.77, 0, 0.175, 1) for the loader and menu wipe.
- **Reveal system:** content is visible without JS. Once the document is marked, headline lines rise from a mask (translateY 108%, 1000ms, 90ms stagger), blocks fade up 18px (800 to 900ms, 70ms stagger), rules scale in from the left (1200ms, 80ms stagger). Each fires once on entering view.
- **Hero:** animates with pure CSS so it never waits on hydration; lines 1100ms with 110ms stagger, sub and CTA follow at +260ms and +360ms.
- **Loader:** first visit per session only; a 000 to 100 counter and a bar on ink, then a clip-path wipe upward.
- **Scroll-linked:** the blue thread draws with scroll, its tip held at 62% of the viewport, running down the middle of the page margins on top of the content (behind it only inside the Statement), switching sides only in the empty gaps between sections, to land above the closing question; the tip eases after the reader with a 70ms critically damped follow, the process line fills with scroll, the reel opens from a 7% side inset.
- **Smooth scroll:** Lenis (lerp 0.1) for wheel and trackpad only; touch stays native.
- **Reduced motion:** loader, marquee, reveals, wheel spin, thread draw, highlight sweep and smooth scroll are all disabled; content shows in place.

## Do's and Don'ts

### Do:
- **Do** draw every color from the brand manual tokens; express softer shades as opacity steps of ink or ice.
- **Do** set headlines in Glacial Indifference at weight 400 with 0.98 leading and -0.02em tracking.
- **Do** make every control a full pill (999px) and every content surface a large fluid-radius panel.
- **Do** lead primary pills with the Azul UI dot and give them the rolling label.
- **Do** show KEI's real projects, people and clients as the imagery.
- **Do** use the 12-column header grammar: headline in columns 1 to 7, short body in columns 9 to 12.
- **Do** gate hover effects behind fine-pointer media queries and give every motion a reduced-motion fallback.
- **Do** keep content visible before JavaScript runs; reveals only hide content once the document is marked ready.

### Don't:
- **Don't** introduce colors outside #3F7DFF, #020714, #16205E, #F9FAFC, #DFE8FD and white cards, and don't use gradients.
- **Don't** recolor, tint or filter the KEI isotipo PNG; it is placed as supplied (inline in the hero headline).
- **Don't** apply this system to the footer (components/footer.tsx); it is a preserved legacy piece and stays as it is.
- **Don't** build dark neon heroes, icon-card grids, or abstract 3D and blob decoration.
- **Don't** put shadows on panels or cards; shadows belong only to floating controls and wheel cards.
- **Don't** set display type bold, or add a third typeface.
- **Don't** add small uppercase labels above section headlines; section titles stand alone.

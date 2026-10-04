import { siteUrl } from "./site";

type Crumb = { name: string; path: string };

/**
 * BreadcrumbList structured data. "Home" is prepended automatically, so a page
 * only declares its own trail.
 */
export function breadcrumbSchema(crumbs: readonly Crumb[]) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/**
 * FAQPage structured data. Only questions and answers actually published on the
 * page may be included, so the markup never overstates what the page says.
 */
export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

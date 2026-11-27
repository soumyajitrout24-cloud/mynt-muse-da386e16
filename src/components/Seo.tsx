import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string; // e.g. "/services"
  jsonLd?: object | object[];
};

const SITE = "https://www.myntgirlfriend.in";

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Sets title, description, canonical, OG/Twitter tags and optional JSON-LD per route. */
const Seo = ({ title, description, path, jsonLd }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE}${path === "/" ? "/" : path}`;
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const existing = document.head.querySelectorAll('script[data-seo="route"]');
    existing.forEach((n) => n.remove());
    if (jsonLd) {
      (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).forEach((obj) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.dataset.seo = "route";
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
      });
    }
    return () => {
      document.head.querySelectorAll('script[data-seo="route"]').forEach((n) => n.remove());
    };
  }, [title, description, path, jsonLd]);

  return null;
};

export default Seo;
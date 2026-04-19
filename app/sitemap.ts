import type { MetadataRoute } from "next";

const BASE_URL = "https://fundaciopredator.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/projekte", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/ueber-uns", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/spenden", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // DE is default (no prefix), EN and ES get prefixed
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of staticPages) {
    // German (default, no prefix)
    entries.push({
      url: `${BASE_URL}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    });
    // English
    entries.push({
      url: `${BASE_URL}/en${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    });
    // Spanish
    entries.push({
      url: `${BASE_URL}/es${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    });
  }

  return entries;
}

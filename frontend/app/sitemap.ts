import type { MetadataRoute } from "next";
import { getAllProducts, getProductSlug } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = getSiteUrl();
	const now = new Date();

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
		{
			url: `${base}/products`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${base}/contact-us`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${base}/terms-and-conditions`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${base}/refund-policy`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	const productRoutes: MetadataRoute.Sitemap = getAllProducts().map(
		(product) => ({
			url: `${base}/products/${getProductSlug(product)}`,
			lastModified: now,
			changeFrequency: "monthly" as const,
			priority: 0.85,
		}),
	);

	return [...staticRoutes, ...productRoutes];
}

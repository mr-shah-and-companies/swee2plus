/**
 * Public site origin for canonical URLs, Open Graph, sitemap, and robots.
 *
 * On Vercel, set NEXT_PUBLIC_SITE_URL to your canonical site (e.g. https://swee2plus.in).
 * If unset, VERCEL_URL is often a preview hostname (*.vercel.app), which breaks sitemaps
 * in Google Search Console for a custom-domain property — always set it for production.
 */
function normalizeOrigin(raw: string): string {
	return raw.replace(/\/$/, "");
}

export function getSiteUrl(): string {
	const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (explicit) {
		return normalizeOrigin(explicit);
	}
	/** Production hostname when assigned (preferred over VERCEL_URL on preview deployments). */
	const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
	if (productionHost) {
		const host = productionHost.replace(/^https?:\/\//i, "");
		return `https://${normalizeOrigin(host)}`;
	}
	if (process.env.VERCEL_URL) {
		return `https://${normalizeOrigin(process.env.VERCEL_URL)}`;
	}
	return "http://localhost:3000";
}

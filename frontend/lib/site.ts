/**
 * Public site origin for canonical URLs, Open Graph, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourdomain.com).
 * On Vercel, VERCEL_URL is used when NEXT_PUBLIC_SITE_URL is unset.
 */
export function getSiteUrl(): string {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
	}
	return "http://localhost:3000";
}

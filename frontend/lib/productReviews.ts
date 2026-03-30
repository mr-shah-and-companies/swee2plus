import type { Product } from "@/lib/products";
import reviewData from "@/data/productReviews.json";

/**
 * Optional per-product ratings and reviews for JSON-LD (Rich Results).
 *
 * Do not add fabricated ratings — Google treats misleading structured data as spam.
 * Only publish values that match real, visible customer feedback (or verifiable third-party data).
 *
 * Keys (first match wins):
 * 1) UPIN/EAN-13 (`upin13`)
 * 2) Shared asset folder name when `assetFolder` is set (e.g. both Cool Talc SKUs → one entry under "Cool Talc")
 *
 * Example entry (for reference; remove before committing real data if you use a different shape):
 * "Cool Talc": {
 *   "aggregateRating": { "ratingValue": 4.6, "reviewCount": 14 },
 *   "reviews": [
 *     {
 *       "authorName": "A. Customer",
 *       "reviewBody": "Short genuine quote from the review.",
 *       "ratingValue": 5,
 *       "datePublished": "2026-02-01"
 *     }
 *   ]
 * }
 */

export type ReviewInput = {
	authorName: string;
	reviewBody: string;
	ratingValue: number;
	/** ISO 8601 date (YYYY-MM-DD) */
	datePublished?: string;
	bestRating?: number;
};

export type ProductReviewBundle = {
	aggregateRating?: {
		ratingValue: number;
		reviewCount: number;
		bestRating?: number;
		worstRating?: number;
	};
	reviews?: ReviewInput[];
};

type ReviewsMap = Record<string, ProductReviewBundle>;

function lookupBundle(product: Product): ProductReviewBundle | undefined {
	const map = reviewData as ReviewsMap;
	const byUpin = map[product.upin13];
	if (byUpin) return byUpin;
	const folder = (product as Product & { assetFolder?: string }).assetFolder?.trim();
	if (folder && map[folder]) return map[folder];
	return undefined;
}

/** Extra Product JSON-LD fields when `productReviews.json` has data for this product. */
export function getProductReviewJsonLd(product: Product): Record<string, unknown> {
	const bundle = lookupBundle(product);
	if (!bundle) return {};

	const out: Record<string, unknown> = {};

	if (bundle.aggregateRating) {
		const a = bundle.aggregateRating;
		out.aggregateRating = {
			"@type": "AggregateRating",
			ratingValue: a.ratingValue,
			reviewCount: a.reviewCount,
			bestRating: a.bestRating ?? 5,
			worstRating: a.worstRating ?? 1,
		};
	}

	if (bundle.reviews?.length) {
		out.review = bundle.reviews.map((r) => ({
			"@type": "Review",
			author: { "@type": "Person", name: r.authorName },
			reviewRating: {
				"@type": "Rating",
				ratingValue: r.ratingValue,
				bestRating: r.bestRating ?? 5,
				worstRating: 1,
			},
			reviewBody: r.reviewBody,
			...(r.datePublished ? { datePublished: r.datePublished } : {}),
		}));
	}

	return out;
}

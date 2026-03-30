import productsData from "@/data/products.json";

export type Product = (typeof productsData)[number];

/** URL segment: defaults to `upin13` when `slug` is omitted. */
export function getProductSlug(product: Product): string {
	return product.slug ?? product.upin13;
}

export function getAllProducts(): Product[] {
	return productsData;
}

export function getProductBySlug(slug: string): Product | undefined {
	return getAllProducts().find((p) => getProductSlug(p) === slug);
}

/** @deprecated Prefer getProductBySlug — kept for barcode-only lookups. */
export function getProductByUpin(upin13: string): Product | undefined {
	return getAllProducts().find((p) => p.upin13 === upin13);
}

export function getProductsByUpin(upin13: string): Product[] {
	return getAllProducts().filter((p) => p.upin13 === upin13);
}

export function getAllProductSlugs(): string[] {
	return getAllProducts().map((p) => getProductSlug(p));
}

export type ResolveRoute =
	| { kind: "ok"; product: Product }
	| { kind: "redirect"; to: string }
	| { kind: "notfound" };

/**
 * Resolve `/products/[id]` where `id` may be a slug, a lone barcode shared by variants, or a legacy upin-only URL.
 */
export function resolveProductRoute(productId: string): ResolveRoute {
	const bySlug = getProductBySlug(productId);
	if (bySlug) return { kind: "ok", product: bySlug };

	const sameBarcode = getProductsByUpin(productId);
	if (sameBarcode.length === 1) {
		return { kind: "ok", product: sameBarcode[0] };
	}
	if (sameBarcode.length > 1) {
		const sorted = [...sameBarcode].sort((a, b) =>
			getProductSlug(a).localeCompare(getProductSlug(b)),
		);
		return { kind: "redirect", to: `/products/${getProductSlug(sorted[0])}` };
	}
	return { kind: "notfound" };
}

/** Product for metadata when the URL may redirect (e.g. barcode → first variant). */
export function getCanonicalProduct(productId: string): Product | undefined {
	const r = resolveProductRoute(productId);
	if (r.kind === "ok") return r.product;
	if (r.kind === "redirect") {
		const slug = r.to.slice("/products/".length);
		return getProductBySlug(slug);
	}
	return undefined;
}

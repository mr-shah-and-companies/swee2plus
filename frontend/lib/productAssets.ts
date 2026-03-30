import {
	getAllProducts,
	getProductSlug,
	type Product,
} from "@/lib/products";

/**
 * Folder name under `public/product-assets/<name>/` (usually matches `productName`).
 * Use when multiple SKUs share one media folder (e.g. Cool Talc 80g + 160g).
 */
export function resolveAssetFolder(product: Product): string {
	const p = product as Product & { assetFolder?: string };
	if (p.assetFolder?.trim()) return p.assetFolder.trim();
	return product.productName;
}

/** Other catalog rows that share the same `product-assets` folder (e.g. Cool Talc 80g vs 160g). */
export function getProductsSharingAssetFolder(product: Product): Product[] {
	const folder = resolveAssetFolder(product);
	return getAllProducts().filter(
		(p) =>
			resolveAssetFolder(p) === folder &&
			getProductSlug(p) !== getProductSlug(product),
	);
}

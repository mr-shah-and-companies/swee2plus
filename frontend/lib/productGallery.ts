import fs from "node:fs";
import path from "node:path";
import type { GallerySlide } from "@/lib/galleryTypes";
import { resolveAssetFolder } from "@/lib/productAssets";
import { getProductSlug, type Product } from "@/lib/products";

export type { GallerySlide };

const FALLBACK_SLIDES: Omit<GallerySlide, "alt">[] = [
	{ src: "/product-gallery/slide-1.svg", caption: "Pack front" },
	{ src: "/product-gallery/slide-2.svg", caption: "Angle & details" },
	{ src: "/product-gallery/slide-3.svg", caption: "Finish & texture" },
];

const CAPTIONS = ["Pack front", "Product detail", "Texture & finish"] as const;

function findImageFilesInDir(absoluteDir: string): string[] {
	if (!fs.existsSync(absoluteDir) || !fs.statSync(absoluteDir).isDirectory()) {
		return [];
	}
	const files = fs.readdirSync(absoluteDir);
	const ext = /\.(jpe?g|png|webp)$/i;
	const numbered: string[] = [];
	for (let i = 1; i <= 3; i++) {
		let found: string | undefined;
		for (const extStr of ["jpg", "jpeg", "png", "webp"] as const) {
			const name = `${i}.${extStr}`;
			if (files.includes(name)) {
				found = name;
				break;
			}
		}
		if (found) numbered.push(found);
	}
	if (numbered.length > 0) return numbered;
	return files
		.filter((f) => ext.test(f))
		.sort((a, b) => a.localeCompare(b))
		.slice(0, 3);
}

function loadSlidesFromDir(
	absoluteDir: string,
	urlBase: string,
	product: Product,
): GallerySlide[] {
	const names = findImageFilesInDir(absoluteDir);
	if (names.length === 0) return [];
	const cap = (i: number) => CAPTIONS[Math.min(i, CAPTIONS.length - 1)];
	return names.map((file, i) => ({
		src: `${urlBase}/${encodeURIComponent(file)}`,
		alt: `${product.productName} — ${cap(i)}`,
		caption: cap(i),
	}));
}

/**
 * Images: `public/products/{slug}/` first (overrides), then shared
 * `public/product-assets/{assetFolder}/` (folder names match `productName` or `assetFolder`).
 * Filenames `1.jpg`…`3.jpg` preferred, else first images sorted by name.
 */
export function getGallerySlides(product: Product): GallerySlide[] {
	const segment = getProductSlug(product);
	const assetFolder = resolveAssetFolder(product);

	const candidates = [
		{
			abs: path.join(process.cwd(), "public", "products", segment),
			urlBase: `/products/${segment}`,
		},
		{
			abs: path.join(process.cwd(), "public", "product-assets", assetFolder),
			urlBase: `/product-assets/${encodeURIComponent(assetFolder)}`,
		},
	];

	for (const { abs, urlBase } of candidates) {
		const slides = loadSlidesFromDir(abs, urlBase, product);
		if (slides.length > 0) return slides;
	}

	return FALLBACK_SLIDES.map((s) => ({
		src: s.src,
		caption: s.caption,
		alt: `${product.productName} — ${s.caption}`,
	}));
}

/** First gallery image — for product cards and previews. */
export function getProductThumbnail(product: Product): GallerySlide {
	return getGallerySlides(product)[0];
}

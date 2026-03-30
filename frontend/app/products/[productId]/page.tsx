import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
	getAllProductSlugs,
	getCanonicalProduct,
	getProductsByUpin,
	getProductSlug,
	resolveProductRoute,
	type Product,
} from "@/lib/products";
import { getPackLabelBlock } from "@/lib/labelExtracts";
import { getProductsSharingAssetFolder } from "@/lib/productAssets";
import { getProductCopy, getProductDescriptionPlain } from "@/lib/productCopy";
import {
	getGallerySlides,
	getRasterGalleryAbsoluteUrls,
} from "@/lib/productGallery";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import { ProductImageCarousel } from "./ProductImageCarousel";

type Props = {
	params: Promise<{ productId: string }>;
};

export function generateStaticParams() {
	return getAllProductSlugs().map((productId) => ({ productId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { productId } = await params;
	const product = getCanonicalProduct(productId);
	if (!product) {
		return { title: "Product Not Found | Swee-2+" };
	}

	const path = `/products/${getProductSlug(product)}`;
	const title = `${product.productName} | ${product.brandName} | Swee-2+`;
	const longDesc = getProductDescriptionPlain(product);
	const description =
		longDesc.length > 155
			? `${longDesc.slice(0, 152).trim()}… · MRP ₹${product.mrp} · GTIN ${product.upin13}`
			: `${longDesc} MRP ₹${product.mrp}. GTIN ${product.upin13}.`;

	const slides = getGallerySlides(product);
	const rasterUrls = getRasterGalleryAbsoluteUrls(product, slides);
	const ogImage = rasterUrls[0] ?? absoluteUrl("/logo.png");
	const ogAlt =
		rasterUrls.length > 0
			? (slides.find((s) => !s.src.toLowerCase().endsWith(".svg"))?.alt ??
				slides[0]?.alt)
			: "Swee-2+ premium cosmetics";

	return {
		title,
		description,
		keywords: [
			product.upin13,
			"EAN-13",
			"GTIN",
			"barcode",
			product.brandName,
			product.productName,
			"Swee-2+",
			"SWEE2+",
		],
		alternates: {
			canonical: path,
		},
		openGraph: {
			title,
			description,
			url: path,
			siteName: "Swee-2+",
			type: "website",
			...(ogImage ? { images: [{ url: ogImage, alt: ogAlt }] } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			...(ogImage ? { images: [ogImage] } : {}),
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},
	};
}

function ProductNav() {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 glass">
			<div className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3">
						<Image
							src="/logo.png"
							alt="Swee-2+ Logo"
							width={50}
							height={50}
							className="rounded-full"
							priority
						/>
						<span className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[var(--accent-burgundy)]">
							Swee-2+
						</span>
					</Link>
					<div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-montserrat)] text-sm tracking-wide">
						<Link
							href="/products"
							className="text-[var(--foreground)] hover:text-[var(--accent-burgundy)] transition-colors"
						>
							All Products
						</Link>
						<Link
							href="/"
							className="text-[var(--foreground)] hover:text-[var(--accent-burgundy)] transition-colors"
						>
							Home
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}

function DetailRow({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="border-b border-gray-100 py-4 last:border-0">
			<dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
			<dd className="text-gray-800 leading-relaxed">{children}</dd>
		</div>
	);
}

function productJsonLd(product: Product, imageUrls: string[]) {
	const slug = getProductSlug(product);
	const productUrl = `${getSiteUrl()}/products/${slug}`;
	/** Prefer pack photos; logo avoids “Missing field image” if assets are missing on the host. */
	const images =
		imageUrls.length > 0 ? imageUrls : [absoluteUrl("/logo.png")];
	const refundUrl = `${getSiteUrl()}/refund-policy`;
	const offers: Record<string, unknown> = {
		"@type": "Offer",
		url: productUrl,
		priceCurrency: "INR",
		price: String(product.mrp),
		availability: "https://schema.org/InStock",
		itemCondition: "https://schema.org/NewCondition",
		seller: {
			"@type": "Organization",
			name: product.brandName,
		},
		shippingDetails: [
			{
				"@type": "OfferShippingDetails",
				shippingRate: {
					"@type": "MonetaryAmount",
					value: "0",
					currency: "INR",
				},
				shippingDestination: {
					"@type": "DefinedRegion",
					addressCountry: "IN",
				},
				deliveryTime: {
					"@type": "ShippingDeliveryTime",
					handlingTime: {
						"@type": "QuantitativeValue",
						minValue: 1,
						maxValue: 3,
						unitCode: "DAY",
					},
					transitTime: {
						"@type": "QuantitativeValue",
						minValue: 2,
						maxValue: 10,
						unitCode: "DAY",
					},
				},
			},
		],
		hasMerchantReturnPolicy: {
			"@type": "MerchantReturnPolicy",
			url: refundUrl,
			applicableCountry: "IN",
			returnPolicyCategory:
				"https://schema.org/MerchantReturnFiniteReturnWindow",
			merchantReturnDays: 7,
			returnMethod: "https://schema.org/ReturnByMail",
			returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
		},
	};
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.productName,
		description: getProductDescriptionPlain(product),
		image: images.length === 1 ? images[0] : images,
		sku: slug,
		productID: product.upin13,
		gtin13: product.upin13,
		brand: {
			"@type": "Brand",
			name: product.brandName,
		},
		offers,
	};
}

function variantShortLabel(product: Product): string {
	const m = product.productName.match(/\(([^)]+)\)\s*$/);
	return m ? m[1] : product.productName;
}

export default async function ProductDetailPage({ params }: Props) {
	const { productId } = await params;
	const resolved = resolveProductRoute(productId);
	if (resolved.kind === "redirect") {
		redirect(resolved.to);
	}
	if (resolved.kind === "notfound") {
		notFound();
	}
	const product = resolved.product;

	const slides = getGallerySlides(product);
	const imageUrls = getRasterGalleryAbsoluteUrls(product, slides);
	const jsonLd = productJsonLd(product, imageUrls);
	const copy = getProductCopy(product);
	const { intro: packLabelIntro, sections: labelSections } =
		getPackLabelBlock(product);
	const sizeSiblings = getProductsSharingAssetFolder(product);
	const siblings = getProductsByUpin(product.upin13);
	const currentSlug = getProductSlug(product);
	const hasColorVariants = siblings.length > 1;

	return (
		<div className="min-h-screen">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ProductNav />

			<section className="pt-28 pb-20 px-4 sm:px-6 bg-[var(--background)] bg-pattern min-h-screen">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-start">
						<div className="lg:sticky lg:top-28">
							<ProductImageCarousel
								slides={slides}
								productName={product.productName}
							/>
						</div>

						<div className="min-w-0">
							<span className="inline-block px-4 py-2 bg-[var(--accent-cream)] rounded-full text-sm font-medium text-[var(--accent-burgundy)] mb-4 tracking-widest uppercase">
								{product.brandName}
							</span>
							<h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-2 leading-tight">
								{product.productName}
							</h1>
							<p className="text-gray-500 text-sm mb-6">
								{product.specification} · MRP incl. of all taxes where applicable
							</p>
							<p className="text-4xl font-[family-name:var(--font-cormorant)] text-[var(--accent-burgundy)] font-semibold mb-8">
								₹{product.mrp}
							</p>

							{sizeSiblings.length > 0 && (
								<div className="mb-8 rounded-xl bg-white/80 border border-[var(--accent-rose)]/25 px-4 py-3 text-sm text-gray-600">
									<p className="font-medium text-gray-800 mb-2">
										Other pack sizes (shared imagery)
									</p>
									<ul className="flex flex-wrap gap-2">
										{sizeSiblings.map((p) => {
											const s = getProductSlug(p);
											return (
												<li key={s}>
													<Link
														href={`/products/${s}`}
														className="inline-flex rounded-full border border-[var(--accent-burgundy)]/30 px-3 py-1 text-[var(--accent-burgundy)] hover:bg-[var(--accent-cream)]"
													>
														{p.specification}
													</Link>
												</li>
											);
										})}
									</ul>
								</div>
							)}

							{hasColorVariants && (
								<div className="mb-8">
									<p className="text-sm font-medium text-gray-600 mb-2">
										Colour variants (same barcode on pack)
									</p>
									<div className="flex flex-wrap gap-2">
										{siblings.map((p) => {
											const slug = getProductSlug(p);
											const active = slug === currentSlug;
											return (
												<Link
													key={slug}
													href={`/products/${slug}`}
													className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
														active
															? "bg-[var(--accent-burgundy)] text-white"
															: "bg-white border border-[var(--accent-rose)] text-[var(--accent-burgundy)] hover:bg-[var(--accent-cream)]"
													}`}
												>
													{variantShortLabel(p)}
												</Link>
											);
										})}
									</div>
								</div>
							)}

							<div className="mb-8">
								{copy.paragraphs.map((p, i) => (
									<p
										key={i}
										className="text-gray-600 leading-relaxed mb-4 last:mb-0"
									>
										{p}
									</p>
								))}
							</div>

							<div className="rounded-2xl bg-[var(--accent-cream)]/60 p-6 mb-8">
								<h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-3">
									Highlights
								</h2>
								<ul className="space-y-2 list-disc list-inside text-gray-700 text-sm font-[family-name:var(--font-montserrat)]">
									{copy.highlights.map((h) => (
										<li key={h}>{h}</li>
									))}
								</ul>
							</div>

							{labelSections.length > 0 && (
								<div className="rounded-2xl border border-[var(--accent-rose)]/30 bg-white p-6 md:p-8 mb-8 shadow-sm">
									<h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-2">
										Pack label information
									</h2>
									<p className="text-sm text-gray-500 mb-6">{packLabelIntro}</p>
									<dl className="space-y-6">
										{labelSections.map((sec, i) => (
											<div
												key={`${i}-${sec.heading}`}
												className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
											>
												<dt className="font-[family-name:var(--font-cormorant)] text-base font-semibold text-[var(--accent-burgundy)] mb-2">
													{sec.heading}
												</dt>
												<dd className="text-sm text-gray-700 font-[family-name:var(--font-montserrat)] leading-relaxed">
													{sec.listItems &&
													sec.listItems.length > 0 &&
													sec.bulletList !== false ? (
														<ul className="list-disc list-inside space-y-1.5 text-gray-700">
															{sec.listItems.map((line) => (
																<li key={line}>{line}</li>
															))}
														</ul>
													) : sec.listItems &&
													  sec.listItems.length > 0 &&
													  sec.bulletList === false ? (
														<p className="text-gray-700 leading-relaxed">
															{sec.listItems.join(", ")}.
														</p>
													) : (
														<p className="whitespace-pre-wrap text-gray-700">
															{sec.body}
														</p>
													)}
												</dd>
											</div>
										))}
									</dl>
								</div>
							)}

							<div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[var(--accent-rose)]/20">
								<h2 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-4">
									Product details
								</h2>
								<dl>
									<DetailRow label="Barcode / UPIN (EAN-13, GTIN-13)">
										<span className="font-mono text-lg">{product.upin13}</span>
										<p className="text-sm text-gray-500 mt-2">
											{hasColorVariants
												? "This EAN-13 code is printed on Blue, Pink, and Purple packs of this product—the colour is identified on the packaging, not by a different barcode."
												: "Same as the EAN-13 barcode on pack. After Google indexes this site, searching this number may surface this page."}
										</p>
									</DetailRow>
									<DetailRow label="Net contents">{product.specification}</DetailRow>
									<DetailRow label="Brand">{product.brandName}</DetailRow>
									<DetailRow label="Marketed by">
										{product.companyNameAndAddress}
									</DetailRow>
								</dl>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 mt-10">
								<Link
									href="/products"
									className="inline-block text-center border-2 border-[var(--accent-burgundy)] text-[var(--accent-burgundy)] px-8 py-3 rounded-full font-medium hover:bg-[var(--accent-burgundy)] hover:text-white transition-all"
								>
									← All products
								</Link>
								<Link
									href="/"
									className="inline-block text-center bg-[var(--accent-burgundy)] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8a3d4d] transition-all"
								>
									Home
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

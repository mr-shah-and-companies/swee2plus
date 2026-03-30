import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductThumbnail } from "@/lib/productGallery";
import { getAllProducts, getProductSlug } from "@/lib/products";

export const metadata: Metadata = {
	title: "Products | Swee-2+ SWEE2+ Catalog",
	description:
		"Browse the complete SWEE2+ product range by Mr Shah And Companyes — hair care, skincare, body care, and more. UPIN and MRP listed.",
};

function ProductsNav() {
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

export default function ProductsPage() {
	const products = getAllProducts();

	return (
		<div className="min-h-screen">
			<ProductsNav />

			<section className="pt-32 pb-24 px-6 bg-[var(--background)] bg-pattern min-h-screen">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-14">
						<span className="inline-block px-4 py-2 bg-[var(--accent-cream)] rounded-full text-sm font-medium text-[var(--accent-burgundy)] mb-4 tracking-widest uppercase">
							Catalog
						</span>
						<h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-bold mb-4">
							<span className="gradient-text">SWEE2+ Products</span>
						</h1>
						<p className="text-gray-600 max-w-2xl mx-auto">
							{products.length} items — tap a product for full details, UPIN (13-digit
							product ID), and MRP.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{products.map((product) => {
							const thumb = getProductThumbnail(product);
							const slug = getProductSlug(product);
							return (
								<Link
									key={slug}
									href={`/products/${slug}`}
									className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-transparent hover:border-[var(--accent-rose)] hover:shadow-md transition-all"
								>
									<div className="relative aspect-[4/5] w-full bg-[var(--accent-cream)]/40 shrink-0">
										<Image
											src={thumb.src}
											alt={thumb.alt}
											fill
											className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-[1.02]"
											sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
										/>
									</div>
									<div className="p-6 md:p-8 flex flex-col flex-1">
										<div className="flex items-start justify-between gap-4 mb-4">
											<span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-burgundy)] bg-[var(--accent-cream)] px-3 py-1 rounded-full">
												{product.brandName}
											</span>
											<span className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] whitespace-nowrap">
												₹{product.mrp}
											</span>
										</div>
										<h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent-burgundy)] transition-colors">
											{product.productName}
										</h2>
										<p className="text-gray-500 text-sm mb-4">{product.specification}</p>
										<p className="text-xs text-gray-400 font-mono mt-auto">
											UPIN {product.upin13}
										</p>
										<p className="mt-4 text-sm text-[var(--accent-gold)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
											View details →
										</p>
									</div>
								</Link>
							);
						})}
					</div>

					<div className="text-center mt-16">
						<Link
							href="/"
							className="inline-block border-2 border-[var(--accent-burgundy)] text-[var(--accent-burgundy)] px-8 py-3 rounded-full font-medium hover:bg-[var(--accent-burgundy)] hover:text-white transition-all"
						>
							← Back to Home
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

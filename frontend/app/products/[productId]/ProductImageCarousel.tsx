"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { GallerySlide } from "@/lib/galleryTypes";

type Props = {
	slides: GallerySlide[];
	productName: string;
};

export function ProductImageCarousel({ slides, productName }: Props) {
	const [index, setIndex] = useState(0);
	const n = slides.length;
	const safeIndex = ((index % n) + n) % n;
	const current = slides[safeIndex];

	const go = useCallback(
		(dir: -1 | 1) => {
			setIndex((i) => {
				const next = i + dir;
				if (next < 0) return n - 1;
				if (next >= n) return 0;
				return next;
			});
		},
		[n],
	);

	if (n === 0) {
		return (
			<div className="aspect-[4/5] rounded-2xl bg-[var(--accent-cream)] flex items-center justify-center text-gray-500">
				No images
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="relative aspect-[4/5] w-full max-w-xl mx-auto overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(107,45,58,0.08)]">
				<Image
					src={current.src}
					alt={current.alt}
					fill
					className="object-contain object-center bg-[var(--accent-cream)]/40"
					sizes="(max-width: 1024px) 100vw, 50vw"
					priority
				/>
				<button
					type="button"
					onClick={() => go(-1)}
					className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-[var(--accent-burgundy)] shadow-md hover:bg-white flex items-center justify-center text-xl font-semibold"
					aria-label="Previous image"
				>
					‹
				</button>
				<button
					type="button"
					onClick={() => go(1)}
					className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-[var(--accent-burgundy)] shadow-md hover:bg-white flex items-center justify-center text-xl font-semibold"
					aria-label="Next image"
				>
					›
				</button>
				<div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/45 to-transparent pt-16 pb-4 px-4">
					<p className="text-white text-sm font-medium text-center drop-shadow">
						{current.caption}
					</p>
				</div>
			</div>

			<div className="flex justify-center gap-2 mt-4">
				{slides.map((s, i) => (
					<button
						key={`${s.src}-${i}`}
						type="button"
						onClick={() => setIndex(i)}
						className={`h-2 rounded-full transition-all ${
							i === safeIndex
								? "w-8 bg-[var(--accent-burgundy)]"
								: "w-2 bg-[var(--accent-rose)]/60 hover:bg-[var(--accent-rose)]"
						}`}
						aria-label={`Show image ${i + 1} of ${n} for ${productName}`}
						aria-current={i === safeIndex ? "true" : undefined}
					/>
				))}
			</div>
		</div>
	);
}

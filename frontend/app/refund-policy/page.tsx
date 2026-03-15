import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Cancellation & Refund Policy | Swee-2+ Premium Cosmetics",
	description:
		"Read the Cancellation and Refund Policy for Swee-2+ by Mr SHAH and COMPANYES.",
};

export default function RefundPolicy() {
	return (
		<div className="min-h-screen">
			{/* Navigation */}
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

			{/* Content */}
			<section className="pt-32 pb-24 px-6 bg-[var(--background)] bg-pattern min-h-screen">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-12">
						<span className="inline-block px-4 py-2 bg-[var(--accent-cream)] rounded-full text-sm font-medium text-[var(--accent-burgundy)] mb-4 tracking-widest uppercase">
							Policy
						</span>
						<h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-bold mb-4">
							<span className="gradient-text">Cancellation &amp; Refund Policy</span>
						</h1>
						<p className="text-gray-500 text-sm">
							Last updated on 15-03-2026
						</p>
					</div>

					<div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
						<div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
							<p>
								<strong className="text-[var(--accent-burgundy)]">Mr SHAH and COMPANYES</strong>{" "}
								believes in helping its customers as far as possible, and has therefore a
								liberal cancellation policy. Under this policy:
							</p>

							<ul className="list-disc pl-6 space-y-4">
								<li>
									Cancellations will be considered only if the request is made immediately
									after placing the order. However, the cancellation request may not be
									entertained if the orders have been communicated to the vendors/merchants
									and they have initiated the process of shipping them.
								</li>
								<li>
									Mr SHAH and COMPANYES does not accept cancellation requests for perishable
									items like flowers, eatables etc. However, refund/replacement can be made
									if the customer establishes that the quality of product delivered is not
									good.
								</li>
								<li>
									In case of receipt of damaged or defective items please report the same to
									our Customer Service team. The request will, however, be entertained once
									the merchant has checked and determined the same at his own end. This
									should be reported within{" "}
									<strong className="text-[var(--accent-burgundy)]">7 Days</strong> of
									receipt of the products. In case you feel that the product received is not
									as shown on the site or as per your expectations, you must bring it to the
									notice of our customer service within{" "}
									<strong className="text-[var(--accent-burgundy)]">7 Days</strong> of
									receiving the product. The Customer Service Team after looking into your
									complaint will take an appropriate decision.
								</li>
								<li>
									In case of complaints regarding products that come with a warranty from
									manufacturers, please refer the issue to them. In case of any Refunds
									approved by Mr SHAH and COMPANYES, it&apos;ll take{" "}
									<strong className="text-[var(--accent-burgundy)]">6-8 Days</strong> for
									the refund to be processed to the end customer.
								</li>
							</ul>
						</div>
					</div>

					<div className="text-center mt-12">
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

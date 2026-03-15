import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Contact Us | Swee-2+ Premium Cosmetics",
	description:
		"Get in touch with Swee-2+ by Mr SHAH and COMPANYES. Contact us via phone, email, or visit our office in Vapi, Gujarat.",
};

export default function ContactUs() {
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
							Get in Touch
						</span>
						<h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-bold mb-4">
							<span className="gradient-text">Contact Us</span>
						</h1>
						<p className="text-gray-500 text-sm">
							Last updated on 15-03-2026
						</p>
					</div>

					<div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
						<p className="text-gray-600 text-lg leading-relaxed mb-8">
							You may contact us using the information below:
						</p>

						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-[var(--accent-cream)] rounded-full flex items-center justify-center text-xl shrink-0">
									🏢
								</div>
								<div>
									<h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-1">
										Merchant Legal Entity Name
									</h3>
									<p className="text-gray-600">Mr SHAH and COMPANYES</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-[var(--accent-cream)] rounded-full flex items-center justify-center text-xl shrink-0">
									📍
								</div>
								<div>
									<h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-1">
										Registered Address
									</h3>
									<p className="text-gray-600">
										Shop No. A8, Tapovan-1, Bhairudham, Vapi, Gujarat, PIN: 396191
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-[var(--accent-cream)] rounded-full flex items-center justify-center text-xl shrink-0">
									🏪
								</div>
								<div>
									<h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-1">
										Operational Address
									</h3>
									<p className="text-gray-600">
										Shop No. A8, Tapovan-1, Bhairudham, Vapi, Gujarat, PIN: 396191
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-[var(--accent-cream)] rounded-full flex items-center justify-center text-xl shrink-0">
									📞
								</div>
								<div>
									<h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-1">
										Telephone No
									</h3>
									<p className="text-gray-600">
										<a
											href="tel:7984769962"
											className="hover:text-[var(--accent-burgundy)] transition-colors"
										>
											7984769962
										</a>
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="w-12 h-12 bg-[var(--accent-cream)] rounded-full flex items-center justify-center text-xl shrink-0">
									✉️
								</div>
								<div>
									<h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-1">
										E-Mail ID
									</h3>
									<p className="text-gray-600">
										<a
											href="mailto:swee2plus01@gmail.com"
											className="hover:text-[var(--accent-burgundy)] transition-colors"
										>
											swee2plus01@gmail.com
										</a>
									</p>
								</div>
							</div>
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

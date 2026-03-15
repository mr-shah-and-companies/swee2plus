import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Terms & Conditions | Swee-2+ Premium Cosmetics",
	description:
		"Read the Terms and Conditions for using Swee-2+ by Mr SHAH and COMPANYES website and services.",
};

export default function TermsAndConditions() {
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
							Legal
						</span>
						<h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-bold mb-4">
							<span className="gradient-text">Terms &amp; Conditions</span>
						</h1>
						<p className="text-gray-500 text-sm">
							Last updated on 15-03-2026
						</p>
					</div>

					<div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
						<div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
							<p>
								These Terms and Conditions, along with privacy policy or other terms
								(&quot;Terms&quot;) constitute a binding agreement by and between{" "}
								<strong className="text-[var(--accent-burgundy)]">Mr SHAH and COMPANYES</strong>{" "}
								(&quot;Website Owner&quot; or &quot;we&quot; or &quot;us&quot; or
								&quot;our&quot;) and you (&quot;you&quot; or &quot;your&quot;) and relate to
								your use of our website, goods (as applicable) or services (as applicable)
								(collectively, &quot;Services&quot;).
							</p>

							<p>
								By using our website and availing the Services, you agree that you have read
								and accepted these Terms (including the Privacy Policy). We reserve the right
								to modify these Terms at any time and without assigning any reason. It is
								your responsibility to periodically review these Terms to stay informed of
								updates.
							</p>

							<p className="font-semibold text-[var(--accent-burgundy)]">
								The use of this website or availing of our Services is subject to the
								following terms of use:
							</p>

							<ul className="list-disc pl-6 space-y-4">
								<li>
									To access and use the Services, you agree to provide true, accurate and
									complete information to us during and after registration, and you shall be
									responsible for all acts done through the use of your registered account.
								</li>
								<li>
									Neither we nor any third parties provide any warranty or guarantee as to
									the accuracy, timeliness, performance, completeness or suitability of the
									information and materials offered on this website or through the Services,
									for any specific purpose. You acknowledge that such information and
									materials may contain inaccuracies or errors and we expressly exclude
									liability for any such inaccuracies or errors to the fullest extent
									permitted by law.
								</li>
								<li>
									Your use of our Services and the website is solely at your own risk and
									discretion. You are required to independently assess and ensure that the
									Services meet your requirements.
								</li>
								<li>
									The contents of the Website and the Services are proprietary to Us and you
									will not have any authority to claim any intellectual property rights,
									title, or interest in its contents.
								</li>
								<li>
									You acknowledge that unauthorized use of the Website or the Services may
									lead to action against you as per these Terms or applicable laws.
								</li>
								<li>
									You agree to pay us the charges associated with availing the Services.
								</li>
								<li>
									You agree not to use the website and/or Services for any purpose that is
									unlawful, illegal or forbidden by these Terms, or Indian or local laws
									that might apply to you.
								</li>
								<li>
									You agree and acknowledge that website and the Services may contain links
									to other third party websites. On accessing these links, you will be
									governed by the terms of use, privacy policy and such other policies of
									such third party websites.
								</li>
								<li>
									You understand that upon initiating a transaction for availing the
									Services you are entering into a legally binding and enforceable contract
									with us for the Services.
								</li>
								<li>
									You shall be entitled to claim a refund of the payment made by you in case
									we are not able to provide the Service. The timelines for such return and
									refund will be according to the specific Service you have availed or
									within the time period provided in our policies (as applicable). In case
									you do not raise a refund claim within the stipulated time, then this
									would make you ineligible for a refund.
								</li>
								<li>
									Notwithstanding anything contained in these Terms, the parties shall not
									be liable for any failure to perform an obligation under these Terms if
									performance is prevented or delayed by a force majeure event.
								</li>
								<li>
									These Terms and any dispute or claim relating to it, or its
									enforceability, shall be governed by and construed in accordance with the
									laws of India.
								</li>
								<li>
									All disputes arising out of or in connection with these Terms shall be
									subject to the exclusive jurisdiction of the courts in Vapi, Gujarat.
								</li>
								<li>
									All concerns or communications relating to these Terms must be
									communicated to us using the contact information provided on this website.
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

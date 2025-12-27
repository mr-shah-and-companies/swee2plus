import Image from "next/image";

export default function Home() {
	const products = [
		{
			name: "Lipsticks",
			description: "Rich, long-lasting formulas in stunning shades",
			icon: "💄",
		},
		{
			name: "Foundations",
			description: "Flawless coverage for every skin tone",
			icon: "✨",
		},
		{
			name: "Skincare",
			description: "Nourishing treatments for radiant skin",
			icon: "🌸",
		},
		{
			name: "Eye Makeup",
			description: "Define and enhance with precision",
			icon: "👁️",
		},
		{
			name: "Nail Care",
			description: "Vibrant colors and lasting shine",
			icon: "💅",
		},
		{
			name: "Fragrances",
			description: "Captivating scents for every occasion",
			icon: "🌺",
		},
	];

	return (
		<div className="min-h-screen overflow-x-hidden">
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-50 glass">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
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
						</div>
						<div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-montserrat)] text-sm tracking-wide">
							<a
								href="#home"
								className="text-[var(--foreground)] hover:text-[var(--accent-burgundy)] transition-colors"
							>
								Home
							</a>
							<a
								href="#products"
								className="text-[var(--foreground)] hover:text-[var(--accent-burgundy)] transition-colors"
							>
								Products
							</a>
							<a
								href="#about"
								className="text-[var(--foreground)] hover:text-[var(--accent-burgundy)] transition-colors"
							>
								About
							</a>
							<a
								href="#contact"
								className="text-[var(--foreground)] hover:text-[var(--accent-burgundy)] transition-colors"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section
				id="home"
				className="relative min-h-screen hero-gradient bg-pattern flex items-center justify-center pt-20"
			>
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-20 right-10 w-72 h-72 bg-[var(--accent-blush)] rounded-full blur-3xl opacity-40 animate-float"></div>
					<div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--accent-rose)] rounded-full blur-3xl opacity-30 animate-float delay-300"></div>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
					<div
						className="animate-fade-in-up opacity-0"
						style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
					>
						<span className="inline-block px-4 py-2 bg-[var(--accent-cream)] rounded-full text-sm font-medium text-[var(--accent-burgundy)] mb-6 tracking-widest uppercase">
							Coming in 2026
						</span>
					</div>

					<Image
						src="/logo.png"
						alt="Swee-2+ Logo"
						width={400}
						height={400}
						className="mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 -mt-8 -mb-6 sm:-mt-12 sm:-mb-8 md:-mt-16 md:-mb-12 lg:-mt-20 lg:-mb-16"
					/>

					<p
						className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-[var(--accent-burgundy)] mb-4 animate-fade-in-up opacity-0"
						style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
					>
						Redefining Beauty Standards
					</p>

					<p
						className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 animate-fade-in-up opacity-0 leading-relaxed"
						style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
					>
						Experience the future of cosmetics. Premium formulations crafted
						with care, designed to enhance your natural beauty and empower your
						confidence.
					</p>

					<div
						className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up opacity-0"
						style={{ animationDelay: "1s", animationFillMode: "forwards" }}
					>
						<a
							href="#products"
							className="bg-[var(--accent-burgundy)] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-[#8a3d4d] transition-all hover:scale-105 shadow-lg"
						>
							Explore Products
						</a>
						<a
							href="#about"
							className="border-2 border-[var(--accent-burgundy)] text-[var(--accent-burgundy)] px-10 py-4 rounded-full text-lg font-medium hover:bg-[var(--accent-burgundy)] hover:text-white transition-all"
						>
							Learn More
						</a>
					</div>

					<div
						className="mt-16 animate-fade-in-up opacity-0"
						style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
					>
						<p className="text-sm text-gray-500 mb-2">A Premium Brand By</p>
						<p className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--accent-burgundy)] font-semibold">
							Mr SHAH and COMPANYES
						</p>
					</div>
				</div>

				{/* Scroll Indicator */}
				<div className="absolute bottom-10 left-1/2 scroll-indicator">
					<div className="w-8 h-12 border-2 border-[var(--accent-burgundy)] rounded-full flex justify-center pt-2">
						<div className="w-1.5 h-3 bg-[var(--accent-burgundy)] rounded-full animate-bounce"></div>
					</div>
				</div>
			</section>

			{/* Divider */}
			<div className="section-divider max-w-4xl mx-auto"></div>

			{/* Products Section */}
			<section id="products" className="py-24 px-6 bg-[var(--accent-cream)]">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-[var(--accent-burgundy)] mb-4 tracking-widest uppercase">
							Our Collection
						</span>
						<h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-bold mb-6">
							<span className="gradient-text">Product Range</span>
						</h2>
						<p className="max-w-2xl mx-auto text-gray-600 text-lg">
							From everyday essentials to glamorous must-haves, discover our
							complete range of premium cosmetics crafted for every occasion.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.map((product, index) => (
							<div
								key={product.name}
								className="product-card bg-white rounded-3xl p-8 text-center cursor-pointer group"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="w-20 h-20 mx-auto mb-6 bg-[var(--accent-blush)] rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
									{product.icon}
								</div>
								<h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[var(--accent-burgundy)] mb-3">
									{product.name}
								</h3>
								<p className="text-gray-600">{product.description}</p>
								<div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
									<span className="text-[var(--accent-gold)] font-medium text-sm tracking-wide">
										Coming Soon →
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Launch Countdown Section */}
			<section className="py-24 px-6 bg-[var(--accent-burgundy)] relative overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--accent-gold)] rounded-full blur-3xl opacity-10"></div>
					<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-rose)] rounded-full blur-3xl opacity-10"></div>
				</div>

				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-bold text-white mb-6">
						Launching in 2026
					</h2>
					<p className="text-[var(--accent-blush)] text-xl mb-12 max-w-2xl mx-auto">
						Be the first to experience our revolutionary cosmetics collection.
						Sign up to receive exclusive updates and early access.
					</p>
				</div>
			</section>

			{/* About Section */}
			<section
				id="about"
				className="py-24 px-6 bg-[var(--background)] bg-pattern"
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 gap-16 items-center">
						<div>
							<span className="inline-block px-4 py-2 bg-[var(--accent-cream)] rounded-full text-sm font-medium text-[var(--accent-burgundy)] mb-4 tracking-widest uppercase">
								Our Story
							</span>
							<h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-bold mb-6">
								<span className="gradient-text">About Swee-2+</span>
							</h2>
							<p className="text-gray-600 text-lg mb-6 leading-relaxed">
								Swee-2+ is a premium cosmetics brand born from a passion for
								beauty and self-expression. As a proud sub-brand of Mr SHAH and
								COMPANYES, we bring decades of expertise in quality and
								innovation to the beauty industry.
							</p>
							<p className="text-gray-600 text-lg mb-8 leading-relaxed">
								Our mission is to create cosmetics that not only enhance your
								natural beauty but also nourish and care for your skin. Every
								product is crafted with premium ingredients and designed to make
								you feel confident and beautiful.
							</p>

							<div className="flex items-center gap-6">
								<div className="text-center">
									<div className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[var(--accent-burgundy)]">
										50+
									</div>
									<div className="text-sm text-gray-500">Products</div>
								</div>
								<div className="w-px h-12 bg-[var(--accent-rose)]"></div>
								<div className="text-center">
									<div className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[var(--accent-burgundy)]">
										100%
									</div>
									<div className="text-sm text-gray-500">Premium Quality</div>
								</div>
								<div className="w-px h-12 bg-[var(--accent-rose)]"></div>
								<div className="text-center">
									<div className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[var(--accent-burgundy)]">
										2026
									</div>
									<div className="text-sm text-gray-500">Launch Year</div>
								</div>
							</div>
						</div>

						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-rose)] to-[var(--accent-gold)] rounded-3xl transform rotate-3 opacity-20"></div>
							<div className="relative bg-[var(--accent-cream)] rounded-3xl p-12 text-center">
								<Image
									src="/logo.png"
									alt="Swee-2+ Logo"
									width={200}
									height={200}
									className="mx-auto mb-8 rounded-full shadow-2xl"
								/>
								<h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[var(--accent-burgundy)] mb-2">
									Swee-2+
								</h3>
								<p className="text-gray-600">Premium Cosmetics</p>
								<div className="mt-6 pt-6 border-t border-[var(--accent-rose)]">
									<p className="text-sm text-gray-500">A brand by</p>
									<p className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--accent-burgundy)] font-semibold">
										Mr SHAH and COMPANYES
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-bold mb-6">
							<span className="gradient-text">Why Choose Us</span>
						</h2>
					</div>

					<div className="grid md:grid-cols-4 gap-8">
						{[
							{
								icon: "🌿",
								title: "Premium Ingredients",
								desc: "Carefully sourced, skin-loving formulas",
							},
							{
								icon: "🔬",
								title: "Dermatologically Tested",
								desc: "Safe for all skin types",
							},
							{
								icon: "🐰",
								title: "Cruelty Free",
								desc: "Never tested on animals",
							},
							{
								icon: "♻️",
								title: "Eco-Friendly",
								desc: "Sustainable packaging",
							},
						].map((feature, index) => (
							<div key={index} className="text-center p-6">
								<div className="text-5xl mb-4">{feature.icon}</div>
								<h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[var(--accent-burgundy)] mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-sm">{feature.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact/Footer Section */}
			<footer
				id="contact"
				className="bg-[var(--foreground)] text-white py-16 px-6"
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-3 gap-12 mb-12">
						{/* Brand Info */}
						<div>
							<div className="flex items-center gap-3 mb-6">
								<Image
									src="/logo.png"
									alt="Swee-2+ Logo"
									width={60}
									height={60}
									className="rounded-full"
								/>
								<div>
									<span className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
										Swee-2+
									</span>
									<p className="text-sm text-gray-400">Premium Cosmetics</p>
								</div>
							</div>
							<p className="text-gray-400 leading-relaxed">
								Elevating beauty standards with premium cosmetics. Launching in
								2026 with a complete range of skincare and makeup products.
							</p>
						</div>

						{/* Quick Links */}
						<div>
							<h4 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold mb-6">
								Quick Links
							</h4>
							<ul className="space-y-3">
								<li>
									<a
										href="#home"
										className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="#products"
										className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors"
									>
										Products
									</a>
								</li>
								<li>
									<a
										href="#about"
										className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="#contact"
										className="text-gray-400 hover:text-[var(--accent-gold)] transition-colors"
									>
										Contact
									</a>
								</li>
							</ul>
						</div>

						{/* Distribution Info */}
						<div>
							<h4 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold mb-6">
								Distributed & Marketed By
							</h4>
							<div className="text-gray-400 leading-relaxed">
								<p className="font-semibold text-[var(--accent-gold)] mb-2">
									Mr SHAH and COMPANYES
								</p>
								<p>Shree Sai Apartment, Shop No. G-1/2,</p>
								<p>Chikuwadi, Navi Nagri, Mandha,</p>
								<p>Vapi, Gujarat-396191</p>
								<p className="mt-4">India</p>
							</div>
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-gray-800 pt-8">
						<div className="flex flex-col md:flex-row justify-between items-center gap-4">
							<p className="text-gray-500 text-sm">
								© 2025 Swee-2+ by Mr SHAH and COMPANYES. All rights reserved.
							</p>
							<div className="flex gap-6">
								<a
									href="#"
									className="text-gray-500 hover:text-[var(--accent-gold)] transition-colors text-sm"
								>
									Privacy Policy
								</a>
								<a
									href="#"
									className="text-gray-500 hover:text-[var(--accent-gold)] transition-colors text-sm"
								>
									Terms of Service
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

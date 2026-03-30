import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
	variable: "--font-cormorant",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: "Swee-2+ | Premium Cosmetics",
	description:
		"Discover Swee-2+, a premium cosmetics brand by Mr SHAH and COMPANYES—a complete range of beauty and personal care products.",
	keywords:
		"cosmetics, beauty, skincare, makeup, Swee-2+, premium beauty, luxury cosmetics",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${cormorant.variable} ${montserrat.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}

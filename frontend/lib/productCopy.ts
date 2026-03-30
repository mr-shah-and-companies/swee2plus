import type { Product } from "@/lib/products";

export type ProductCopy = {
	paragraphs: string[];
	highlights: string[];
};

function hairSerumCopy(product: Product, name: string): ProductCopy {
	const extra =
		name.includes("argan") && name.includes("oil")
			? "Argan oil is prized for helping smooth the hair cuticle and add luminous shine—ideal for everyday styling and touch-ups."
			: name.includes("almond") || name.includes("wheat germ")
				? "Almond and wheat germ oils help nourish strands and improve manageability with a lightweight, non-greasy feel."
				: name.includes("glossy")
					? "Formulated to enhance light reflection for a glossy, polished finish that complements your style."
					: name.includes("frizz")
						? "Targets frizz and flyaways so hair looks smoother, more controlled, and easier to style."
						: "Designed to help improve shine, softness, and manageability with a lightweight finish.";

	return {
		paragraphs: [
			`${product.brandName} ${product.productName} is a hair serum in a ${product.specification} pack—perfect for applying to mid-lengths and ends after washing or before styling.`,
			"Serums help seal the look of the hair surface, reduce the appearance of dryness, and add a touchable softness without a heavy residue.",
			extra,
		],
		highlights: [
			"Lightweight serum texture for mid-lengths & ends",
			"Helps boost shine and manageability",
			`${product.specification} pack size for regular use`,
			"From SWEE2+ personal care range",
		],
	};
}

function faceWashCopy(product: Product, name: string): ProductCopy {
	let focus =
		"This face wash is designed for daily cleansing—removing excess oil, sweat, and buildup while leaving skin feeling fresh.";
	if (name.includes("vitamin c"))
		focus =
			"Vitamin C is widely used in skincare routines to support a brighter-looking complexion and antioxidant care alongside cleansing.";
	if (name.includes("ubtan"))
		focus =
			"Inspired by traditional ubtan blends, this wash supports gentle exfoliation and a refreshed, even-toned look.";
	if (name.includes("niacinamide"))
		focus =
			"With 2% niacinamide, it supports balance and clarity for oily or combination skin types when used as part of a routine.";
	if (name.includes("salicylic"))
		focus =
			"2% salicylic acid helps unclog pores and clarify blemish-prone skin—pair with sunscreen in the daytime.";
	if (name.includes("d-ten") || name.includes("d ten"))
		focus =
			"D-Ten is crafted for thorough cleansing while keeping skin comfortable—ideal as a daily face wash step.";

	return {
		paragraphs: [
			`${product.brandName} ${product.productName} comes in a ${product.specification} size—easy to use morning and night as the first step in your skincare routine.`,
			focus,
			"Follow with moisturizer; in the morning, use sun protection as directed for your skin type.",
		],
		highlights: [
			"Daily facial cleanser",
			`${product.specification} convenient size`,
			"Rinses clean—pair with moisturizer after use",
			"SWEE2+ face care",
		],
	};
}

function faceSerumCopy(product: Product, name: string): ProductCopy {
	let actives = "";
	if (name.includes("niacinamide"))
		actives =
			"Niacinamide (vitamin B3) is popular for supporting barrier comfort, visible pores, and overall tone.";
	else if (name.includes("vitamin c"))
		actives =
			"Vitamin C serums are used to brighten the look of dull skin and support antioxidant defense—store away from direct heat where possible.";
	else if (name.includes("salicylic"))
		actives =
			"Salicylic acid helps refine texture and clarify pores—introduce gradually if you are new to acids.";
	else if (name.includes("kojic"))
		actives =
			"Kojic acid is often chosen for targeted tone support and spot care alongside a broad sun protection routine.";

	return {
		paragraphs: [
			`${product.brandName} ${product.productName} is a concentrated serum in a ${product.specification} format—use a few drops after cleansing and before moisturizer.`,
			actives ||
				"Serums deliver focused ingredients in a lightweight layer designed to absorb quickly.",
			"Patch test if you have sensitive skin, and always use sunscreen in the daytime when using active serums.",
		],
		highlights: [
			"Targeted serum step after cleansing",
			"Small format—easy to layer under moisturizer",
			"Patch test recommended for sensitive skin",
			"SWEE2+ serum range",
		],
	};
}

function talcCopy(product: Product, name: string): ProductCopy {
	const scent = name.includes("cherry")
		? "Cherry blossom-inspired fragrance for a soft, uplifting feel."
		: name.includes("rose")
			? "A delicate rose scent for a classic, fresh finish."
			: name.includes("cool")
				? "Cooling talc comfort for hot, humid days—helps skin feel dry and fresh."
				: name.includes("deo")
					? "Deo talcum helps absorb moisture and leaves skin feeling dry and comfortable."
					: "A silky powder finish that helps skin feel soft and fresh.";

	return {
		paragraphs: [
			`${product.brandName} ${product.productName} is a body powder in a ${product.specification} pack—apply as needed after bathing or during the day.`,
			scent,
			"Use on clean, dry skin; avoid inhalation and keep away from children’s reach.",
		],
		highlights: [
			"Absorbent powder texture",
			`${product.specification} size`,
			"Comfortable, fresh feel on skin",
			"SWEE2+ body care",
		],
	};
}

function sunblockCopy(product: Product): ProductCopy {
	return {
		paragraphs: [
			`${product.brandName} ${product.productName} offers high SPF protection in a ${product.specification} pack—apply generously to exposed skin before sun exposure.`,
			"Broad-spectrum sun care helps reduce the risk of sunburn and premature aging caused by UV rays when used as directed with other protection measures.",
			"Reapply every two hours, or after swimming or sweating, for continued protection.",
		],
		highlights: [
			"SPF 50++ sun protection (use as directed)",
			`${product.specification} pack`,
			"Apply before sun; reapply regularly",
			"SWEE2+ sun care",
		],
	};
}

function bodyWashCopy(product: Product, name: string): ProductCopy {
	const scent = name.includes("honey")
		? "Warm honey vanilla notes turn your shower into a comforting ritual."
		: name.includes("red rose")
			? "A romantic red rose fragrance for a luxurious cleanse."
			: "A rich lather that rinses clean.";

	return {
		paragraphs: [
			`${product.brandName} ${product.productName} is a body wash in a ${product.specification} bottle—ideal for daily shower use.`,
			scent,
			"Massage onto wet skin, lather, and rinse thoroughly. Follow with body lotion if desired.",
		],
		highlights: [
			"Daily body cleansing",
			"Rich lather, easy rinse",
			`${product.specification} family-friendly size`,
			"SWEE2+ bath & body",
		],
	};
}

function rollOnCopy(product: Product, name: string): ProductCopy {
	const scent = name.includes("lotus")
		? "Lotus bouquet notes for a clean, floral freshness."
		: name.includes("yellow") || name.includes("summer")
			? "A bright summer-inspired scent for all-day confidence."
			: "Designed for dependable freshness underarms.";

	return {
		paragraphs: [
			`${product.brandName} ${product.productName} is an underarm roll-on in a ${product.specification} size—apply to clean, dry underarms.`,
			scent,
			"Allow to dry before dressing. Discontinue if irritation occurs.",
		],
		highlights: [
			"Roll-on format—easy application",
			"Helps you feel fresh through the day",
			`${product.specification} pack`,
			"SWEE2+ personal care",
		],
	};
}

function defaultCopy(product: Product): ProductCopy {
	return {
		paragraphs: [
			`${product.brandName} ${product.productName} is offered in a ${product.specification} pack as part of the SWEE2+ range—crafted for everyday personal care.`,
			"Please read pack instructions before use. Patch test if you have sensitive skin.",
		],
		highlights: [
			`Pack size: ${product.specification}`,
			"SWEE2+ quality",
			"Follow on-pack directions",
		],
	};
}

/**
 * Marketing-style copy inferred from product name and pack size.
 * Replace with CMS or catalog copy when official text is available.
 */
export function getProductCopy(product: Product): ProductCopy {
	const name = product.productName.toLowerCase();

	if (name.includes("hair serum")) return hairSerumCopy(product, name);
	if (name.includes("face wash") || name.includes("facewash"))
		return faceWashCopy(product, name);
	if (name.includes("face serum")) return faceSerumCopy(product, name);
	if (
		name.includes("talc") ||
		name.includes("powder") ||
		name.includes("talcum")
	)
		return talcCopy(product, name);
	if (name.includes("sunblock") || name.includes("spf"))
		return sunblockCopy(product);
	if (name.includes("body wash")) return bodyWashCopy(product, name);
	if (name.includes("roll on")) return rollOnCopy(product, name);
	if (name.includes("hair remover") || name.includes("remover cream"))
		return {
			paragraphs: [
				`${product.brandName} ${product.productName} is a depilatory cream in a ${product.specification} pack—designed to help remove unwanted hair when used as directed.`,
				"Apply only to intended areas, follow timing instructions carefully, and rinse thoroughly. Do not use on broken or irritated skin.",
			],
			highlights: [
				"Hair removal cream format",
				`Pack: ${product.specification}`,
				"Follow timing & safety on pack",
				"SWEE2+ hair removal",
			],
		};

	return defaultCopy(product);
}

export function getProductDescriptionPlain(product: Product): string {
	const { paragraphs } = getProductCopy(product);
	return paragraphs.join(" ");
}

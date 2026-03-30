/**
 * Post-processes extracted label sections: fixes common PDF text glitches, re-parses
 * combined text so headings embedded mid-stream become real sections, sorts for
 * consumer-friendly order, and trims obvious template/footer noise.
 */
import {
	parseInnerLabelText,
	type InnerLabelSection,
} from "@/lib/parseInnerLabelText";

/** Typical cosmetic-label flow (lower = earlier on page). Unknowns sort last. */
const CANONICAL_ORDER: Record<string, number> = {
	"label information": 0,
	composition: 10,
	"key ingredients": 12,
	"active ingredients": 14,
	"key benefits": 18,
	directions: 22,
	"directions for use": 22,
	"how to use": 22,
	usage: 24,
	"method of use": 24,
	"product description": 26,
	ingredients: 28,
	warnings: 40,
	caution: 40,
	precautions: 40,
	"safety information": 45,
	storage: 50,
	"shelf life": 55,
	"net quantity": 58,
	manufacturer: 60,
	"manufacturer by": 60,
	"manufactured by": 60,
	mrp: 70,
	"distributed & marketed by": 82,
	"distributed by": 82,
	"marketed by": 82,
	"batch no.": 90,
	batch: 90,
	expiry: 85,
	"exp. date": 85,
	"best before": 86,
	"use before": 87,
	"country of origin": 95,
	license: 100,
	"customer care": 100,
};

function orderKey(heading: string): number {
	const k = heading
		.toLowerCase()
		.replace(/\s+/g, " ")
		.replace(/[.:]+$/g, "")
		.trim();
	return CANONICAL_ORDER[k] ?? 500;
}

/**
 * Fix common inner-label PDF extraction issues (replacement chars, broken ligatures).
 */
export function fixPdfLabelText(s: string): string {
	let t = s.normalize("NFKC");
	const pairs: [RegExp, string][] = [
		[/Precau.ons/gi, "Precautions"],
		[/Discon\uFFFDnue/gi, "Discontinue"],
		[/Discon[^\n]{0,4}nue/gi, "Discontinue"],
		[/Discon.ue/gi, "Discontinue"],
		[/irrita.on/gi, "irritation"],
		[/circular\s+mo.ons/gi, "circular motions"],
		[/effec.ve/gi, "effective"],
		[/impuri.es/gi, "impurities"],
		[/an.oxidants/gi, "antioxidants"],
		[/protec.ng/gi, "protecting"],
		[/boos.ng/gi, "boosting"],
		[/essen.al/gi, "essential"],
		[/so.(?=, and revitalized)/gi, "soft"],
		[/so.(?=, and smooth)/gi, "soft"],
		[/finger.ps/gi, "fingertips"],
		[/un.l(?=\s+absorbed)/gi, "until"],
		[/un.l/gi, "until"],
		[/s.cky/gi, "sticky"],
		[/pollu.on/gi, "pollution"],
		[/polu.on/gi, "pollution"],
		[/pigmenta.on/gi, "pigmentation"],
		[/tradi.onal/gi, "traditional"],
		[/Multani Mi./gi, "Multani Mitti"],
		[/non-greasy/gi, "non-greasy"],
		[/non-s.cky/gi, "non-sticky"],
		[/protec.on/gi, "protection"],
		[/essenti.l/gi, "essential"],
	];
	for (const [re, rep] of pairs) {
		t = t.replace(re, rep);
	}
	return t;
}

function compactBatchSection(sections: InnerLabelSection[]): InnerLabelSection[] {
	return sections.map((sec) => {
		if (!/^batch/i.test(sec.heading)) return sec;
		const b = sec.body;
		if (
			/USP\s*\n\s*Mfg\.\s*Date/i.test(b) &&
			/Use Before\s+\d+\s+Months/i.test(b)
		) {
			return {
				heading: sec.heading,
				body: "Batch number, manufacture date, expiry, and USP are printed on the pack.\nUse before 36 months from the date of manufacture.",
			};
		}
		return sec;
	});
}

/** Remove repeated shop / footer lines usually appended after real label copy. */
function stripTrailingPackNoise(sections: InnerLabelSection[]): InnerLabelSection[] {
	const shopBlock =
		/\n{1,2}SHOP ONLINE AT\s*:\s*WWW\.SWEE2PLUS\.IN[\s\S]*$/i;
	return sections.map((sec) => ({
		heading: sec.heading,
		body: sec.body.replace(shopBlock, "").trimEnd(),
	}));
}

function sortCanonical(sections: InnerLabelSection[]): InnerLabelSection[] {
	return [...sections].sort((a, b) => {
		const d = orderKey(a.heading) - orderKey(b.heading);
		return d !== 0 ? d : 0;
	});
}

/** Face wash: "Wet your face…" through "…clean towel." */
const FACE_WASH_HOW_TO = new RegExp(
	[
		"^Wet your face with clean, lukewarm water\\.",
		"[\\s\\S]*?",
		"Rinse thoroughly with water and pat dry with a clean towel\\.",
	].join(""),
	"i",
);

/** Sunscreen: generous amount through reapply line (period optional if PDF is noisy) */
const SUNSCREEN_HOW_TO = new RegExp(
	[
		"^Take a generous amount of sunscreen",
		"[\\s\\S]*?",
		"reapply every\\s*2[\\u2013\\-–]3\\s*hours[^\\n]*",
	].join(""),
	"i",
);

function findWetYourFaceStart(body: string): number {
	let i = body.search(/\nWet your face with clean, lukewarm water\./i);
	if (i >= 0) return i;
	i = body.search(/^Wet your face with clean, lukewarm water\./im);
	return i;
}

function findSunscreenHowToStart(body: string): number {
	let i = body.search(/\nTake a generous amount of sunscreen\b/i);
	if (i >= 0) return i;
	i = body.search(/^Take a generous amount of sunscreen\b/im);
	return i;
}

function splitBenefitsAndDescription(middle: string): {
	benefits: string;
	description: string;
} {
	const lines = middle.split("\n").map((l) => l.trim());
	const nonEmpty = lines.map((l, idx) => ({ l, idx })).filter((x) => x.l.length > 0);

	const descIdx = nonEmpty.findIndex(
		({ l }) =>
			l.length > 45 &&
			/\b(?:is a|is an|is specially)\b/i.test(l) &&
			/\b(?:Wash|Sunscreen|Cream|Cleanser|Treatment|Sunblock|Lotion|Serum|Ubtan|De-?Tan)\b/i.test(
				l,
			),
	);
	if (descIdx >= 0) {
		const cut = nonEmpty[descIdx].idx;
		const benefitLines = lines.slice(0, cut).filter((l) => l.length > 0);
		const descLines = lines.slice(cut).filter((l) => l.length > 0);
		return {
			benefits: benefitLines.join("\n").trim(),
			description: descLines.join("\n").trim(),
		};
	}

	const longIdx = lines.findIndex((l) => l.length > 200);
	if (longIdx >= 0) {
		return {
			benefits: lines.slice(0, longIdx).join("\n").trim(),
			description: lines.slice(longIdx).join("\n").trim(),
		};
	}

	return { benefits: middle.trim(), description: "" };
}

function splitAtAquaBlock(s: string): { before: string; ingredients: string } | null {
	let pos = s.search(/\n(?=Aqua\b)/i);
	if (pos === -1) pos = s.search(/^Aqua\b/im);
	if (pos === -1) return null;
	const ingredients = s.slice(pos).replace(/^\n/, "").trim();
	const before = s.slice(0, pos).trim();
	if (ingredients.length < 20) return null;
	return { before, ingredients };
}

/**
 * Splits a single "Precautions" section when PDF text merged usage, benefits,
 * marketing copy, and INCI into one block (common with vector PDFs).
 */
function trySplitPrecautionsBlob(body: string): InnerLabelSection[] | null {
	const wetIdx = findWetYourFaceStart(body);
	const sunIdx = findSunscreenHowToStart(body);

	let mode: "face" | "sun" | null = null;
	let splitIdx = -1;
	if (wetIdx >= 0 && (sunIdx < 0 || wetIdx <= sunIdx)) {
		mode = "face";
		splitIdx = wetIdx;
	} else if (sunIdx >= 0) {
		mode = "sun";
		splitIdx = sunIdx;
	}
	if (mode == null || splitIdx < 0) return null;

	const precautions = body.slice(0, splitIdx).trim();
	const tail = body.slice(splitIdx).replace(/^\n/, "");

	let howTo = "";
	let afterHowTo = tail;

	if (mode === "face") {
		const m = tail.match(FACE_WASH_HOW_TO);
		if (!m) return null;
		howTo = m[0].trim();
		afterHowTo = tail.slice(m[0].length).replace(/^\n+/, "");
	} else {
		const m = tail.match(SUNSCREEN_HOW_TO);
		if (!m) return null;
		howTo = m[0].trim();
		afterHowTo = tail.slice(m[0].length).replace(/^\n+/, "");
	}

	const aqua = splitAtAquaBlock(afterHowTo);
	if (!aqua) return null;

	const { benefits, description } = splitBenefitsAndDescription(aqua.before);
	const out: InnerLabelSection[] = [];
	if (precautions.length > 0) {
		out.push({ heading: "Precautions", body: precautions });
	}
	if (howTo.length > 0) {
		out.push({ heading: "How to use", body: howTo });
	}
	if (benefits.length > 0) {
		out.push({ heading: "Key benefits", body: benefits });
	}
	if (description.length > 0) {
		out.push({ heading: "Product description", body: description });
	}
	out.push({ heading: "Ingredients", body: aqua.ingredients });
	return out;
}

function expandBloatedPrecautions(
	sections: InnerLabelSection[],
): InnerLabelSection[] {
	const out: InnerLabelSection[] = [];
	for (const sec of sections) {
		const h = sec.heading.trim();
		if (!/^precautions$/i.test(h)) {
			out.push(sec);
			continue;
		}
		const body = sec.body;
		if (
			body.length < 280 ||
			(!/\bAqua\b/i.test(body) && !/\bAqua,/i.test(body))
		) {
			out.push(sec);
			continue;
		}
		const expanded = trySplitPrecautionsBlob(body);
		if (expanded && expanded.length > 0) {
			out.push(...expanded);
		} else {
			out.push(sec);
		}
	}
	return out;
}

/**
 * Reconstructs full label text with headings, fixes text, re-parses to split
 * embedded sections (e.g. Precautions after Distributed), then sorts and trims.
 */
export function refineInnerLabelSections(
	sections: InnerLabelSection[],
): InnerLabelSection[] {
	if (sections.length === 0) return [];

	const blob = sections
		.map((s) => `${s.heading}:\n${s.body}`)
		.join("\n\n");

	const fixed = fixPdfLabelText(blob);
	let out = parseInnerLabelText(fixed);
	out = expandBloatedPrecautions(out);
	out = compactBatchSection(out);
	out = stripTrailingPackNoise(out);
	out = sortCanonical(out);

	return out;
}

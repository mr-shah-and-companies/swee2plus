import labelExtracts from "@/data/labelExtracts.json";
import {
	parseInnerLabelText,
	type InnerLabelSection,
} from "@/lib/parseInnerLabelText";
import { refineInnerLabelSections } from "@/lib/refineLabelSections";
import { resolveAssetFolder } from "@/lib/productAssets";
import type { Product } from "@/lib/products";

export type LabelExtractEntry = { sections: InnerLabelSection[] };

const DEFAULT_PACK_LABEL_INTRO =
	"Details from the product insert. The same insert may apply across pack sizes or variants that share this artwork.";

/** Display order for hand-authored `labelExtracts.json` (flat object per product). */
const STRUCTURED_KEYS_ORDER = [
	"Pack label information",
	"Key benefits",
	"How to use",
	"Product description",
	"Ingredients",
	"Precautions",
	"Manufacturer By",
	"MRP",
	"Distributed & Marketed By",
	"Batch No.",
] as const;

const map = labelExtracts as Record<
	string,
	LabelExtractEntry | string | Record<string, string | string[] | unknown> | undefined
>;

function isStructuredLabelEntry(
	entry: unknown,
): entry is Record<string, string | string[]> {
	if (entry == null || typeof entry !== "object" || Array.isArray(entry)) {
		return false;
	}
	const o = entry as Record<string, unknown>;
	if (Array.isArray(o.sections)) return false;
	return Array.isArray(o.Ingredients);
}

function structuredEntryToSections(
	data: Record<string, string | string[]>,
): InnerLabelSection[] {
	const sections: InnerLabelSection[] = [];
	for (const key of STRUCTURED_KEYS_ORDER) {
		if (key === "Pack label information") continue;
		const val = data[key];
		if (val == null) continue;
		if (Array.isArray(val)) {
			const items = val.map((x) => String(x).trim()).filter(Boolean);
			if (items.length === 0) continue;
			const isIngredients = key === "Ingredients";
			sections.push({
				heading: key,
				body: items.join(", "),
				listItems: items,
				bulletList: !isIngredients,
			});
		} else if (typeof val === "string" && val.trim()) {
			sections.push({ heading: key, body: val.trim() });
		}
	}
	return sections;
}

export type PackLabelBlock = {
	intro: string;
	sections: InnerLabelSection[];
};

/**
 * Pack label intro (from JSON when present) and sections. Supports:
 * - Hand-authored flat objects with string / string[] values
 * - Legacy `{ sections: [...] }` or raw string from PDF extraction
 */
export function getPackLabelBlock(product: Product): PackLabelBlock {
	const key = resolveAssetFolder(product);
	const entry = map[key];
	if (entry == null) {
		return { intro: DEFAULT_PACK_LABEL_INTRO, sections: [] };
	}
	if (isStructuredLabelEntry(entry)) {
		const raw = entry["Pack label information"];
		const intro =
			typeof raw === "string" && raw.trim()
				? raw.trim()
				: DEFAULT_PACK_LABEL_INTRO;
		return {
			intro,
			sections: structuredEntryToSections(entry),
		};
	}
	if (typeof entry === "string") {
		return {
			intro: DEFAULT_PACK_LABEL_INTRO,
			sections: refineInnerLabelSections(parseInnerLabelText(entry)),
		};
	}
	if (
		typeof entry === "object" &&
		entry !== null &&
		Array.isArray((entry as LabelExtractEntry).sections)
	) {
		return {
			intro: DEFAULT_PACK_LABEL_INTRO,
			sections: refineInnerLabelSections((entry as LabelExtractEntry).sections),
		};
	}
	return { intro: DEFAULT_PACK_LABEL_INTRO, sections: [] };
}

/**
 * Pack-insert sections for this product (`data/labelExtracts.json`).
 * For intro text under the “Pack label information” heading, use `getPackLabelBlock`.
 */
export function getInnerLabelSections(product: Product): InnerLabelSection[] {
	return getPackLabelBlock(product).sections;
}

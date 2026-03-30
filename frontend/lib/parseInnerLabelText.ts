/**
 * Heuristic split of inner-label PDF text into sections for display (not raw dump).
 * Tuned for common Indian cosmetic / personal-care label headings.
 */
export type InnerLabelSection = {
	heading: string;
	body: string;
	/** When set, render as list (bullets) or inline list (ingredients). */
	listItems?: string[];
	/** With listItems: false = comma-separated ingredients; true/undefined = bullets. */
	bulletList?: boolean;
};

/** Lines that typically start a new block on pack inserts */
const HEADER_LINE = new RegExp(
	[
		"^\\s*(",
		[
			"Ingredients?\\s*[/&]\\s*Composition",
			"Ingredients?",
			"Composition",
			"Key ingredients?",
			"Key\\s+benefits?",
			"Active ingredients?",
			"Directions?\\s+for\\s+use",
			"Directions?",
			"How\\s+to\\s+use",
			"Usage",
			"Method\\s+of\\s+use",
			"Warnings?",
			"Caution",
			"Precautions?",
			"Safety\\s+information",
			"Storage(?:\\s+conditions)?",
			"Shelf\\s+life",
			"Manufacturer\\s+by",
			"Manufacturer",
			"Manufactured\\s+by",
			"Marketed\\s+by",
			"Distributed\\s+by",
			"Distributed\\s*(?:&|and)\\s*Marketed\\s+by",
			"Country\\s+of\\s+origin",
			"M\\.?R\\.?P\\.?",
			"Net\\s+(?:quantity|contents|wt\\.?|weight|volume)",
			"Batch(?:\\s+no\\.?)?",
			"(?:Expiry|Exp\\.?)(?:\\s+date)?",
			"Best\\s+before",
			"Use\\s+before",
			"License",
			"Customer\\s+care",
		].join("|"),
		")\\s*:?\\s*$",
	].join(""),
	"i",
);

function normalize(raw: string): string {
	return raw
		.normalize("NFKC")
		.replace(/\r\n/g, "\n")
		.replace(/\u00a0/g, " ")
		.replace(/[ \t]+/g, " ")
		.trim();
}

export function parseInnerLabelText(raw: string): InnerLabelSection[] {
	const text = normalize(raw);
	if (!text) return [];

	const lines = text.split("\n");
	const sections: InnerLabelSection[] = [];
	let heading = "Label information";
	let bodyLines: string[] = [];

	function flush() {
		const body = bodyLines.join("\n").trim();
		if (body.length > 0) {
			sections.push({ heading, body });
		}
		bodyLines = [];
	}

	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.length === 0) {
			bodyLines.push("");
			continue;
		}
		if (HEADER_LINE.test(trimmed)) {
			if (bodyLines.some((l) => l.trim().length > 0)) {
				flush();
			} else {
				bodyLines = [];
			}
			heading = trimmed.replace(/:\s*$/, "").trim();
			continue;
		}
		bodyLines.push(line);
	}
	flush();

	if (sections.length === 0) {
		return [{ heading: "Label information", body: text }];
	}
	return sections;
}

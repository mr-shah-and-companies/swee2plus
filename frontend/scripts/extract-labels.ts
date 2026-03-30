/**
 * Reads each `public/product-assets/<folder>/inner label.pdf`, extracts text,
 * splits into sections, and writes `data/labelExtracts.json` (structured; no PDF on site).
 *
 * Requires: npm install pdf-parse --save-dev
 * Run: npx tsx scripts/extract-labels.ts
 *   or: npm run extract-labels
 *
 * If npm install fails locally, use Python + pypdf instead:
 *   pip install pypdf && npm run extract-labels:py
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseInnerLabelText } from "../lib/parseInnerLabelText";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsRoot = path.join(__dirname, "..", "public", "product-assets");
const outFile = path.join(__dirname, "..", "data", "labelExtracts.json");

async function loadPdfParse(): Promise<
	((buf: Buffer) => Promise<{ text?: string }>) | null
> {
	try {
		const mod = (await import("pdf-parse")) as {
			default?: (buf: Buffer) => Promise<{ text?: string }>;
		};
		return mod.default ?? (mod as unknown as (b: Buffer) => Promise<{ text?: string }>);
	} catch {
		return null;
	}
}

async function main() {
	const pdfParse = await loadPdfParse();
	if (!pdfParse) {
		console.warn(
			"[extract-labels] Skipped: install pdf-parse: npm i pdf-parse -D",
		);
		process.exit(0);
	}

	const result: Record<string, { sections: ReturnType<typeof parseInnerLabelText> }> =
		{};

	if (!fs.existsSync(assetsRoot)) {
		console.warn("[extract-labels] No public/product-assets folder.");
		process.exit(0);
	}

	for (const entry of fs.readdirSync(assetsRoot, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const folderName = entry.name;
		const dir = path.join(assetsRoot, folderName);
		const pdfName = fs
			.readdirSync(dir)
			.find((f) => /^inner label\.pdf$/i.test(f));
		if (!pdfName) continue;
		const buf = fs.readFileSync(path.join(dir, pdfName));
		try {
			const data = await pdfParse(buf);
			const text = (data.text || "").trim();
			if (text) {
				result[folderName] = { sections: parseInnerLabelText(text) };
			}
		} catch (e) {
			console.warn(`[extract-labels] Failed: ${folderName}`, e);
		}
	}

	fs.mkdirSync(path.dirname(outFile), { recursive: true });
	fs.writeFileSync(outFile, JSON.stringify(result, null, "\t") + "\n");
	console.log(
		`[extract-labels] Wrote ${Object.keys(result).length} products -> ${outFile}`,
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});

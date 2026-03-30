"""
Extract text from each public/product-assets/<folder>/inner label.pdf, split with
the same heuristics as lib/parseInnerLabelText.ts, and write data/labelExtracts.json.

Requires: pip install pypdf
Run from frontend/: python scripts/extract_labels.py
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from pypdf import PdfReader

SCRIPT_DIR = Path(__file__).resolve().parent
FRONTEND = SCRIPT_DIR.parent
ASSETS = FRONTEND / "public" / "product-assets"
OUT = FRONTEND / "data" / "labelExtracts.json"

# Keep in sync with lib/parseInnerLabelText.ts HEADER_LINE
_HEADER_PARTS = [
    r"Ingredients?\s*[/&]\s*Composition",
    r"Ingredients?",
    r"Composition",
    r"Key ingredients?",
    r"Key\s+benefits?",
    r"Active ingredients?",
    r"Directions?\s+for\s+use",
    r"Directions?",
    r"How\s+to\s+use",
    r"Usage",
    r"Method\s+of\s+use",
    r"Warnings?",
    r"Caution",
    r"Precautions?",
    r"Safety\s+information",
    r"Storage(?:\s+conditions)?",
    r"Shelf\s+life",
    r"Manufacturer\s+by",
    r"Manufacturer",
    r"Manufactured\s+by",
    r"Marketed\s+by",
    r"Distributed\s+by",
    r"Distributed\s*(?:&|and)\s*Marketed\s+by",
    r"Country\s+of\s+origin",
    r"M\.?R\.?P\.?",
    r"Net\s+(?:quantity|contents|wt\.?|weight|volume)",
    r"Batch(?:\s+no\.?)?",
    r"(?:Expiry|Exp\.?)(?:\s+date)?",
    r"Best\s+before",
    r"Use\s+before",
    r"License",
    r"Customer\s+care",
]
HEADER_LINE = re.compile(
    r"^\s*(" + "|".join(_HEADER_PARTS) + r")\s*:?\s*$",
    re.IGNORECASE,
)
HEADING_TRIM = re.compile(r":\s*$")


def normalize(raw: str) -> str:
    t = unicodedata.normalize("NFKC", raw)
    t = t.replace("\r\n", "\n").replace("\u00a0", " ")
    t = re.sub(r"[ \t]+", " ", t)
    return t.strip()


def parse_inner_label_text(raw: str) -> list[dict[str, str]]:
    text = normalize(raw)
    if not text:
        return []

    lines = text.split("\n")
    sections: list[dict[str, str]] = []
    heading = "Label information"
    body_lines: list[str] = []

    def flush() -> None:
        nonlocal body_lines
        body = "\n".join(body_lines).strip()
        if body:
            sections.append({"heading": heading, "body": body})
        body_lines = []

    for line in lines:
        trimmed = line.strip()
        if not trimmed:
            body_lines.append("")
            continue
        if HEADER_LINE.match(trimmed):
            if any(l.strip() for l in body_lines):
                flush()
            else:
                body_lines = []
            heading = HEADING_TRIM.sub("", trimmed).strip()
            continue
        body_lines.append(line)
    flush()

    if not sections:
        return [{"heading": "Label information", "body": text}]
    return sections


def pdf_text(path: Path) -> str:
    reader = PdfReader(str(path))
    parts: list[str] = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return "\n".join(parts).strip()


def main() -> None:
    result: dict[str, dict] = {}
    if not ASSETS.is_dir():
        print(f"[extract_labels] Missing {ASSETS}")
        return

    for sub in sorted(ASSETS.iterdir()):
        if not sub.is_dir():
            continue
        pdf = sub / "inner label.pdf"
        if not pdf.is_file():
            continue
        try:
            text = pdf_text(pdf)
            if text:
                result[sub.name] = {"sections": parse_inner_label_text(text)}
        except Exception as e:
            print(f"[extract_labels] Failed: {sub.name}", e)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent="\t", ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"[extract_labels] Wrote {len(result)} products -> {OUT}")


if __name__ == "__main__":
    main()

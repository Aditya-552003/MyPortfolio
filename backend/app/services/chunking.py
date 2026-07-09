"""Splits markdown source docs into heading-scoped chunks for RAG retrieval."""

import re
from dataclasses import dataclass

_HEADING_PATTERN = re.compile(r"^#{1,6}\s+(.*)$", re.MULTILINE)


@dataclass(frozen=True)
class Chunk:
    text: str
    source: str
    section: str


def chunk_markdown(markdown_text: str, source: str) -> list[Chunk]:
    """Each heading and the body text below it (until the next heading) becomes one chunk."""
    matches = list(_HEADING_PATTERN.finditer(markdown_text))
    chunks: list[Chunk] = []

    for index, match in enumerate(matches):
        section = match.group(1).strip()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown_text)
        body = markdown_text[start:end].strip()
        if not body:
            continue
        chunks.append(Chunk(text=f"{section}\n{body}", source=source, section=section))

    return chunks

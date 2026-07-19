"""Static portfolio context for lite mode (no vector DB / sentence-transformers)."""

from __future__ import annotations

import logging
from pathlib import Path

from app.data.search_catalog import SEARCH_ITEMS

logger = logging.getLogger("app.lite_context")

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
_context: str | None = None


def load_lite_context() -> None:
    """Load markdown + skills catalog into memory once at startup."""
    global _context
    parts: list[str] = []

    for filename in ("about.md", "projects.md"):
        path = DATA_DIR / filename
        if path.exists():
            parts.append(path.read_text(encoding="utf-8"))
        else:
            logger.warning("lite context missing %s", path)

    skill_lines = [f"- **{item.title}** ({item.type}): {item.context}" for item in SEARCH_ITEMS]
    parts.append("## Skills & projects index\n" + "\n".join(skill_lines))

    _context = "\n\n---\n\n".join(parts)
    logger.info(
        "lite context loaded",
        extra={"extra_fields": {"chars": len(_context)}},
    )


def get_lite_context() -> str:
    if _context is None:
        load_lite_context()
    return _context or "(No portfolio context available.)"

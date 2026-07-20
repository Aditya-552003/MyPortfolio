"""Detect common prompt-injection patterns before they reach the LLM."""

import re

_INJECTION_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?)", re.I),
    re.compile(r"disregard\s+(?:all\s+)?(?:your\s+)?(?:previous|prior\s+)?(?:instructions?|rules?)", re.I),
    re.compile(r"reveal\s+(?:the\s+)?(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)", re.I),
    re.compile(
        r"(show|print|repeat|output)\s+(?:the\s+)?(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)",
        re.I,
    ),
    re.compile(r"you\s+are\s+now\s+(a|an|in)\s+", re.I),
    re.compile(r"act\s+as\s+(if\s+you\s+are\s+)?(?!aditya)", re.I),
    re.compile(r"<\s*/?\s*(system|assistant|user)\s*>", re.I),
    re.compile(r"jailbreak", re.I),
    re.compile(r"developer\s+mode", re.I),
)

REFUSAL_MESSAGE = (
    "I can only speak to Aditya's work, skills, and projects on this portfolio. "
    "What would you like to know about those?"
)


def is_prompt_injection_attempt(message: str) -> bool:
    """Return True when the user message matches known injection heuristics."""
    text = message.strip()
    if not text:
        return False
    return any(pattern.search(text) for pattern in _INJECTION_PATTERNS)

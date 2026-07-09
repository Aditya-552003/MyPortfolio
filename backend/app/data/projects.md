# Projects

## EmoSens — overview

EmoSens is a full-stack emotion detection system that classifies text into
six emotions (anger, fear, joy, neutral, sadness, surprise) using a hybrid
ensemble of a fine-tuned RoBERTa transformer and an XGBoost classifier
trained on TF-IDF and NRC Emotion Lexicon features. Categories: AI, ML, NLP.
Repository: https://github.com/Aditya-552003/emosense-ai

## EmoSens — problem and solution

Single-model emotion classifiers force a tradeoff: transformer models capture
context well but are slower and can misfire on lexicon-heavy phrasing;
classical ML models are fast but miss contextual nuance. EmoSens solves this
with a confidence-gated ensemble: when the fine-tuned RoBERTa branch is
confident (at least 75%), its prediction is used directly; when it's
uncertain, its output is blended 70/30 with the XGBoost branch. This
guarantees ensemble accuracy never falls below RoBERTa's alone.

## EmoSens — architecture and tech stack

Backend: FastAPI, Uvicorn, Pydantic. ML: PyTorch, Transformers (RoBERTa),
XGBoost, scikit-learn, NRC Emotion Lexicon. The live demo on this site is the
real EmoSens ensemble, loaded from its trained weights, not a mock.

## EmoSens — performance metrics

On a stratified 300-sample evaluation set (50 per class): ensemble accuracy
98.0%, ensemble macro F1 98.0%, RoBERTa branch alone 98.0% accuracy, XGBoost
branch alone 91.3% accuracy. Average RoBERTa inference latency is about 94ms.

## Chat with Code — overview

Chat with Code is a Retrieval-Augmented Generation app that lets you point it
at any public GitHub repository and ask natural-language questions about the
codebase, with streamed answers grounded in the actual source. Categories:
AI, NLP, Search, Web. Repository:
https://github.com/Aditya-552003/chat-with-code

## Chat with Code — problem and solution

Understanding an unfamiliar codebase by reading files one at a time is slow —
keyword search misses semantically related code that doesn't share exact
terms. Chat with Code loads a repository directly from GitHub, indexes it
into a vector store, and answers questions by retrieving the top-5 most
semantically relevant chunks and passing them to an LLM as grounding context.

## Chat with Code — architecture and tech stack

Streamlit app. Retrieval via LlamaIndex with HuggingFace embeddings
(BAAI/bge-small-en). Generation via Google Gemini 2.5 Flash. Pipeline: GitHub
URL parsed, repository loaded via LlamaIndex's GithubRepositoryReader, files
embedded into a VectorStoreIndex, query embedded and top-5 chunks retrieved,
then sent to Gemini alongside the question for a grounded, streamed answer.

## Smart Shortlist — overview

Smart Shortlist (repo name "Sortlist") is a semantic applicant-tracking
system that ranks candidates against a job's specific criteria using
sentence-embedding similarity, enriched with real signal from a candidate's
GitHub and LeetCode activity. Categories: ML, NLP, Search, Web. Repository:
https://github.com/Aditya-552003/Sortlist

## Smart Shortlist — problem and solution

Keyword-matching applicant tracking systems reject qualified candidates whose
resumes don't contain a recruiter's exact phrasing. Smart Shortlist embeds
each job criterion and each resume sentence with a Sentence-Transformer model
(all-MiniLM-L6-v2), scores candidates by cosine similarity per criterion
weighted by importance, and blends that semantic score with normalized
GitHub and LeetCode activity signals into one composite score.

## Smart Shortlist — architecture and tech stack

Frontend: Next.js 15 (App Router), Tailwind CSS. API: Node.js, Express,
MongoDB, BullMQ, Cloudinary, JWT auth. ML service: Python, FastAPI,
Sentence-Transformers, PyMuPDF. Because embedding generation and profile
scraping take a few seconds per candidate, analysis runs asynchronously via a
BullMQ worker queue so the recruiter dashboard stays responsive.

## Voice AI Assistant — status

There is an early experimental voice assistant script in Aditya's GitHub, but
it is a simple speech-to-text/text-to-speech command-matching tool, not an
LLM-grounded conversational assistant. It is not one of the flagship,
fully-documented projects on this site. Don't describe it as an AI
conversational agent — if asked, say it's an early experiment, not a
polished flagship project.

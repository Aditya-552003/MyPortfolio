"use client";

import type { ReactNode } from "react";

import { ApiError } from "@/lib/api";
import { useSemanticSearch } from "@/lib/hooks/useSemanticSearch";

import { RankedResultList } from "./RankedResultList";
import { SearchInput } from "./SearchInput";

export function SemanticSearchDemo(): ReactNode {
  const search = useSemanticSearch();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted text-sm">
        Searches Aditya&apos;s real skills and project catalog by meaning, not keywords — powered by
        Sentence-Transformer embeddings and cosine similarity.
      </p>

      <SearchInput onSubmit={(query) => search.mutate({ query })} isLoading={search.isPending} />

      {search.isError ? (
        <p role="alert" className="text-error text-sm">
          {search.error instanceof ApiError
            ? search.error.message
            : "Search is temporarily unavailable."}
        </p>
      ) : null}

      {search.isSuccess ? <RankedResultList results={search.data.results} /> : null}
    </div>
  );
}

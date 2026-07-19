"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import type { ReactNode } from "react";

import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AiStatusBanner } from "@/features/playground/AiStatusBanner";
import { ChatWindow } from "@/features/playground/chat";

function TabSkeleton(): ReactNode {
  return <Skeleton className="h-[32rem] w-full rounded-[var(--radius-lg)]" />;
}

const VoiceAssistant = dynamic(
  () => import("@/features/playground/voice").then((m) => ({ default: m.VoiceAssistant })),
  { loading: TabSkeleton },
);

const EmotionDemo = dynamic(
  () => import("@/features/playground/emotion").then((m) => ({ default: m.EmotionDemo })),
  { loading: TabSkeleton },
);

const SemanticSearchDemo = dynamic(
  () => import("@/features/playground/search").then((m) => ({ default: m.SemanticSearchDemo })),
  { loading: TabSkeleton },
);

const RagExplainer = dynamic(
  () => import("@/features/playground/rag").then((m) => ({ default: m.RagExplainer })),
  { loading: TabSkeleton },
);

export function PlaygroundHub(): ReactNode {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="flex flex-col gap-6">
      <AiStatusBanner />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-6">
        <TabsList className="h-auto w-full flex-wrap">
          <TabsTrigger value="chat">Chat with Portfolio</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="emotion">Emotion Detection</TabsTrigger>
          <TabsTrigger value="search">Semantic Search</TabsTrigger>
          <TabsTrigger value="rag">How RAG Works</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <ChatWindow />
        </TabsContent>
        <TabsContent value="voice">
          {activeTab === "voice" ? (
            <ErrorBoundary fallbackTitle="Voice assistant error">
              <Suspense fallback={<TabSkeleton />}>
                <VoiceAssistant />
              </Suspense>
            </ErrorBoundary>
          ) : null}
        </TabsContent>
        <TabsContent value="emotion">
          {activeTab === "emotion" ? (
            <ErrorBoundary fallbackTitle="Emotion demo error">
              <Suspense fallback={<TabSkeleton />}>
                <EmotionDemo />
              </Suspense>
            </ErrorBoundary>
          ) : null}
        </TabsContent>
        <TabsContent value="search">
          {activeTab === "search" ? (
            <ErrorBoundary fallbackTitle="Search demo error">
              <Suspense fallback={<TabSkeleton />}>
                <SemanticSearchDemo />
              </Suspense>
            </ErrorBoundary>
          ) : null}
        </TabsContent>
        <TabsContent value="rag">
          {activeTab === "rag" ? (
            <Suspense fallback={<TabSkeleton />}>
              <RagExplainer />
            </Suspense>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}

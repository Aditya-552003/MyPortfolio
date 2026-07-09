"use client";

import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ChatWindow } from "@/features/playground/chat";
import { EmotionDemo } from "@/features/playground/emotion";
import { SemanticSearchDemo } from "@/features/playground/search";

export function PlaygroundHub(): ReactNode {
  return (
    <Tabs defaultValue="chat" className="flex flex-col gap-6">
      <TabsList>
        <TabsTrigger value="chat">Chat with Portfolio</TabsTrigger>
        <TabsTrigger value="emotion">Emotion Detection</TabsTrigger>
        <TabsTrigger value="search">Semantic Search</TabsTrigger>
      </TabsList>

      <TabsContent value="chat">
        <ChatWindow />
      </TabsContent>
      <TabsContent value="emotion">
        <EmotionDemo />
      </TabsContent>
      <TabsContent value="search">
        <SemanticSearchDemo />
      </TabsContent>
    </Tabs>
  );
}

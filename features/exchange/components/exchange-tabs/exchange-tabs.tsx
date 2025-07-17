"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface ExchangeTabsProps {
  normalContent: React.ReactNode
  expressContent: React.ReactNode
}

export function ExchangeTabs({ normalContent, expressContent }: ExchangeTabsProps) {
  return (
    <Tabs defaultValue="normal" className="w-full">
      <TabsList className="before:bg-border relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
        <TabsTrigger
          value="normal"
          className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          Negociar Câmbio
        </TabsTrigger>
        <TabsTrigger
          value="express"
          className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
        >
          Câmbio Express
        </TabsTrigger>
      </TabsList>

      <TabsContent value="normal" className="mt-4">
        {normalContent}
      </TabsContent>

      <TabsContent value="express" className="mt-4">
        {expressContent}
      </TabsContent>
    </Tabs>
  )
}
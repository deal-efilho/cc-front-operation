"use client";

import "./globals.css";

import { MENU_CONFIG } from "@/config/menu-config";
import { QueryProvider } from "@/providers/query-provider";
import { RootLayouts } from "@mfe/cc-front-shared";
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <TooltipProvider>
          <RootLayouts menuConfig={MENU_CONFIG}>
            <Toaster />
            {children}
          </RootLayouts>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
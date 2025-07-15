"use client";

import "./globals.css";

import { MENU_CONFIG } from "@/config/menu-config";
import { QueryProvider } from "@/providers/query-provider";
import { RootLayouts } from "@mfe/cc-front-shared";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <RootLayouts menuConfig={MENU_CONFIG}>
            <Toaster />
            {children}
          </RootLayouts>
        </QueryProvider>
      </body>
    </html>
  );
}
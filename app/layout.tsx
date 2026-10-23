import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { QueryProvider } from "@/components/provider/query-provider";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "ChaiGPT — A little more clarity, one chat at a time",
  description: "Think, write, learn, and build with ChaiGPT, your everyday AI companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
     suppressHydrationWarning>      
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
        <QueryProvider>
          <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >        {children}
      </ThemeProvider>
        </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

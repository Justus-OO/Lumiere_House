import type { Metadata } from "next";
import GlobalLoader from "@/components/GlobalLoader";
import "./globals.css";

// 1. Brand Metadata
export const metadata: Metadata = {
  title: "Lumiere House | The Premiere Destination",
  description: "An independent studio-adjacent house dedicated exclusively to the art of the launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We removed the default Geist fonts. 
        Your typography and colors are now strictly controlled by globals.css 
      */}
      <body className="antialiased min-h-screen flex flex-col">
        
        {/* 2. The Cinematic Boot Sequence */}
        <GlobalLoader />
        
        {/* 3. The Main Application */}
        {children}
        
      </body>
    </html>
  );
}
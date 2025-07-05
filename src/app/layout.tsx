import "../styles/globals.css";
import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

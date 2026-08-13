import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SoundProvider } from "./components/SoundProvider";

export const metadata: Metadata = {
  title: "Abhishek Kumar — Software Engineering Portfolio",
  description:
    "Portfolio of Abhishek Kumar, a Software Engineering student at IIT Madras focused on Python, backend engineering, data science and machine learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <SoundProvider>
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
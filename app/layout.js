import "./globals.css";
import Shell from "../components/Shell";
export const metadata = { title: "MISO-OS — Muskan Bajetha", description: "A tiny, slightly-too-confident creature walks you through my work." };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body><Shell>{children}</Shell></body>
    </html>
  );
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fission UI Design System",
  description: "Component gallery and design system overview for Fission Labs",
}

const themeInitScript = `
(function () {
  try {
    var key = "fission-ui-theme";
    var saved = localStorage.getItem(key);
    var allowed = ["fission", "ocean", "forest", "violet", "slate"];
    var theme = allowed.indexOf(saved) >= 0 ? saved : "fission";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

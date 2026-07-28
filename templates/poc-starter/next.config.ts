import type { NextConfig } from "next"
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ui-design-system",
  images: { unoptimized: true },
}
export default nextConfig

import type { NextConfig } from "next"
const nextConfig: NextConfig = {
  images: {
    // 75 is Next's default; 90 is for the footer backdrop's fine particle detail.
    qualities: [75, 90],
  },
}
export default nextConfig

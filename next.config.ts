import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  // Çerçeve bilgisini yanıt başlığında açık etmemek için.
  poweredByHeader: false,
  images: {
    // SVG içeriği betik taşıyabildiği için görüntü iyileştiricisinden geçmez.
    dangerouslyAllowSVG: false,
    // Açık izin listesi: joker kullanılırsa iyileştirici herhangi bir adresi vekil olarak çeker.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;

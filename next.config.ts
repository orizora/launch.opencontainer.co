import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  // Çerçeve bilgisini yanıt başlığında açık etmemek için.
  poweredByHeader: false,
  images: {
    // SVG içeriği betik taşıyabildiği için görüntü iyileştiricisinden geçmez.
    dangerouslyAllowSVG: false,
    // Tüm görseller yerel; harici adres izni yok. Joker ya da üçüncü taraf adresi
    // eklenirse iyileştirici o adresi vekil olarak çeker.
    remotePatterns: [],
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

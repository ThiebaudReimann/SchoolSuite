import type { NextConfig } from "next";
import macros from 'unplugin-parcel-macros';

let plugin = macros.webpack();

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  webpack(config) {
    config.plugins.push(plugin);

    // Bundle all S2 and style-macro generated CSS into a single bundle instead of code splitting.
    // Because atomic CSS has so much overlap between components, loading all CSS up front results in
    // smaller bundles instead of producing duplication between pages.
    config.optimization.splitChunks ||= {};
    config.optimization.splitChunks.cacheGroups ||= {};
    config.optimization.splitChunks.cacheGroups.s2 = {
      name: 's2-styles',
      test(module: { type: string; identifier: () => string; }) {
        return (module.type === 'css/mini-extract' && module.identifier().includes('@react-spectrum/s2')) || /macro-(.*?)\.css/.test(module.identifier());
      },
      chunks: 'all',
      enforce: true
    };

    return config;
  }
};

export default nextConfig;

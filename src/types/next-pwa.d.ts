declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  interface PWAOptions {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    scope?: string;
    swSrc?: string;
    swDest?: string;
    runtimeCaching?: unknown[];
    fallbacks?: Record<string, string>;
  }

  export default function withPWA(
    pwaOptions: PWAOptions
  ): (nextConfig: NextConfig) => NextConfig;
}

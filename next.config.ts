import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config: any, { isServer }: any) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Ignore OpenTelemetry modules that are causing issues
    config.externals = config.externals || [];
    config.externals.push({
      '@opentelemetry/api': 'commonjs @opentelemetry/api',
      '@opentelemetry/instrumentation': 'commonjs @opentelemetry/instrumentation',
      '@opentelemetry/auto-instrumentations-node': 'commonjs @opentelemetry/auto-instrumentations-node',
    });
    
    return config;
  },
  transpilePackages: ['@sanity/vision'],
};

export default nextConfig;

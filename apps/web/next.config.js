const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: [
    '@assessment/core',
    '@assessment/ui',
    '@assessment/data-table',
    '@assessment/form-builder',
    '@assessment/blog-app',
    '@assessment/services',
    '@tanstack/react-query',
  ],
  webpack: (config, { isServer }) => {
    // Force single instance of react-query
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tanstack/react-query': path.resolve(__dirname, '../../node_modules/@tanstack/react-query'),
      '@assessment/core': path.resolve(__dirname, '../../packages/core/src'),
      '@assessment/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@assessment/data-table': path.resolve(__dirname, '../../packages/data-table/src'),
      '@assessment/form-builder': path.resolve(__dirname, '../../packages/form-builder/src'),
      '@assessment/blog-app': path.resolve(__dirname, '../../packages/blog-app/src'),
      '@assessment/services': path.resolve(__dirname, '../../packages/services/src')
    };

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
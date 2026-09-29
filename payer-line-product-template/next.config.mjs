import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow importing desk API + shared case data from the monorepo root.
  outputFileTracingRoot: rootDir,
  serverExternalPackages: ['@vectorize-io/hindsight-client'],
  turbopack: {
    root: rootDir,
    resolveAlias: {
      '@shared': path.join(rootDir, 'shared'),
      '@server': path.join(rootDir, 'server'),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': path.join(rootDir, 'shared'),
      '@server': path.join(rootDir, 'server'),
    }
    return config
  },
}

export default nextConfig

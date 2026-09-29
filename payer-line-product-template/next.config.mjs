import path from 'node:path'
import { fileURLToPath } from 'node:url'

const appDir = path.dirname(fileURLToPath(import.meta.url))
const deskDir = path.join(appDir, 'desk')

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@vectorize-io/hindsight-client'],
  turbopack: {
    resolveAlias: {
      '@shared': path.join(deskDir, 'shared'),
      '@server': path.join(deskDir, 'server'),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': path.join(deskDir, 'shared'),
      '@server': path.join(deskDir, 'server'),
    }
    return config
  },
}

export default nextConfig

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..')
const appRoot = path.join(repoRoot, 'payer-line-product-template')
const deskRoot = path.join(appRoot, 'desk')
const sourceServer = path.join(repoRoot, 'server')
const sourceShared = path.join(repoRoot, 'shared')

function copyDir(from, to) {
  fs.rmSync(to, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true })
}

if (!fs.existsSync(sourceServer) || !fs.existsSync(sourceShared)) {
  if (fs.existsSync(path.join(deskRoot, 'server')) && fs.existsSync(path.join(deskRoot, 'shared'))) {
    console.log('Using committed desk/ copy (repo root server/shared not present)')
    process.exit(0)
  }
  console.error('Missing server/ or shared/ to sync into desk/')
  process.exit(1)
}

copyDir(sourceServer, path.join(deskRoot, 'server'))
copyDir(sourceShared, path.join(deskRoot, 'shared'))
console.log('Synced server/ and shared/ into payer-line-product-template/desk')

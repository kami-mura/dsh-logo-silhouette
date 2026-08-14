#!/usr/bin/env node
/**
 * Regenerate lib/client.js from assets/favicon.svg.
 *
 * The bundle is handwritten; only the whale path (`d="..."`) comes from the
 * vendored favicon, so the shape stays byte-identical with the official
 * DeepSeek favicon. Run `npm run build` after replacing assets/favicon.svg.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const faviconPath = join(root, 'assets', 'favicon.svg')
const clientPath = join(root, 'lib', 'client.js')

const favicon = readFileSync(faviconPath, 'utf8')
const match = /\sd="([^"]+)"/.exec(favicon)
if (match === null) {
  throw new Error(`${faviconPath}: no d="..." attribute found`)
}
const client = readFileSync(clientPath, 'utf8')
const marker = '/*__WHALE_PATH__*/'
if (!client.includes(marker)) {
  throw new Error(`${clientPath}: PATH marker ${marker} not found`)
}
writeFileSync(clientPath, client.replace(marker, match[1]))
console.log(`lib/client.js: whale path updated from ${faviconPath}`)

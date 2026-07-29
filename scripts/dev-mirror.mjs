import { existsSync, mkdirSync, statSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const mirror = '/tmp/repute-agency-run'
const args = process.argv.slice(2)

mkdirSync(mirror, { recursive: true })

const rsync = spawnSync(
  'rsync',
  [
    '-a',
    '--delete',
    "--exclude=.git",
    "--exclude=.next",
    "--exclude=node_modules",
    `${root}/`,
    `${mirror}/`,
  ],
  { stdio: 'inherit' },
)

if (rsync.status !== 0) {
  process.exit(rsync.status ?? 1)
}

const lockfile = join(mirror, 'package-lock.json')
const modules = join(mirror, 'node_modules')
const modulesNeedInstall =
  !existsSync(modules) ||
  !existsSync(join(modules, '.package-lock.json')) ||
  statSync(join(modules, '.package-lock.json')).mtimeMs < statSync(lockfile).mtimeMs

if (modulesNeedInstall) {
  const npm = spawnSync('npm', ['ci', '--no-audit', '--no-fund'], {
    cwd: mirror,
    stdio: 'inherit',
  })

  if (npm.status !== 0) {
    process.exit(npm.status ?? 1)
  }
}

const node =
  existsSync('/tmp/codex-node22/bin/node') ? '/tmp/codex-node22/bin/node' : process.execPath

const next = spawn(
  node,
  [
    join(mirror, 'node_modules/next/dist/bin/next'),
    'dev',
    '--webpack',
    '--hostname',
    '127.0.0.1',
    '--port',
    process.env.PORT || '3001',
    ...args,
  ],
  {
    cwd: mirror,
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
    },
  },
)

next.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})

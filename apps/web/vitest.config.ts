import react from '@vitejs/plugin-react'
import { defineProject, mergeConfig } from 'vitest/config'

import { sharedProjectConfig } from '../../vitest.shared'

const resolve = (path: string) => new URL(path, import.meta.url).pathname

export default mergeConfig(
  sharedProjectConfig,
  defineProject({
    plugins: [react()],
    test: {
      setupFiles: ['./src/tests/setup.ts']
    },
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    }
  })
)

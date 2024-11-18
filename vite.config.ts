import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from  'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from "node:url";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';


// https://vitejs.dev/config/
export default defineConfig({
  base: '/m',
  // build: {
  //   outDir: 'dist/m'
  // },
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  assetsInclude: ['**/*.wasm'],
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:{
    proxy: {
      '/api/v1': {
        target: 'https://api-testnet.prover.xyz'
      }
    },
  },
  optimizeDeps: {
    exclude: [
      "@syntect/wasm"
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        // NodeModulesPolyfillPlugin(),
      ],
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss, 
        autoprefixer
      ]
    }
  }
})
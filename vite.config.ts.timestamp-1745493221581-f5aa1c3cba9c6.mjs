// vite.config.ts
import { defineConfig } from "file:///Users/roderick/forCoder/cysic/cysic-network-web/node_modules/vite/dist/node/index.js";
import react from "file:///Users/roderick/forCoder/cysic/cysic-network-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///Users/roderick/forCoder/cysic/cysic-network-web/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/roderick/forCoder/cysic/cysic-network-web/node_modules/autoprefixer/lib/autoprefixer.js";
import { fileURLToPath, URL } from "node:url";
import { NodeGlobalsPolyfillPlugin } from "file:///Users/roderick/forCoder/cysic/cysic-network-web/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/roderick/forCoder/cysic/cysic-network-web/vite.config.ts";
var vite_config_default = defineConfig({
  base: "/m",
  // build: {
  //   outDir: 'dist/m'
  // },
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  assetsInclude: ["**/*.wasm"],
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "https://api-testnet.prover.xyz"
      }
    }
  },
  optimizeDeps: {
    exclude: [
      "@syntect/wasm"
    ],
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
        // NodeModulesPolyfillPlugin(),
      ]
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcm9kZXJpY2svZm9yQ29kZXIvY3lzaWMvY3lzaWMtbmV0d29yay13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9yb2Rlcmljay9mb3JDb2Rlci9jeXNpYy9jeXNpYy1uZXR3b3JrLXdlYi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcm9kZXJpY2svZm9yQ29kZXIvY3lzaWMvY3lzaWMtbmV0d29yay13ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gICd0YWlsd2luZGNzcydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLWdsb2JhbHMtcG9seWZpbGwnO1xuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnL20nLFxuICAvLyBidWlsZDoge1xuICAvLyAgIG91dERpcjogJ2Rpc3QvbSdcbiAgLy8gfSxcbiAgZXNidWlsZDoge1xuICAgIC8vIGRyb3A6IFsnY29uc29sZScsICdkZWJ1Z2dlciddLFxuICB9LFxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyoud2FzbSddLFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjp7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpL3YxJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2FwaS10ZXN0bmV0LnByb3Zlci54eXonXG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogW1xuICAgICAgXCJAc3ludGVjdC93YXNtXCJcbiAgICBdLFxuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBkZWZpbmU6IHtcbiAgICAgICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXG4gICAgICB9LFxuICAgICAgcGx1Z2luczogW1xuICAgICAgICBOb2RlR2xvYmFsc1BvbHlmaWxsUGx1Z2luKHtcbiAgICAgICAgICBidWZmZXI6IHRydWUsXG4gICAgICAgICAgcHJvY2VzczogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIC8vIE5vZGVNb2R1bGVzUG9seWZpbGxQbHVnaW4oKSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICB0YWlsd2luZGNzcywgXG4gICAgICAgIGF1dG9wcmVmaXhlclxuICAgICAgXVxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFrQjtBQUN6QixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLGVBQWUsV0FBVztBQUNuQyxTQUFTLGlDQUFpQztBQUw4SixJQUFNLDJDQUEyQztBQVN6UCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJTixTQUFTO0FBQUE7QUFBQSxFQUVUO0FBQUEsRUFDQSxlQUFlLENBQUMsV0FBVztBQUFBLEVBQzNCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCwwQkFBMEI7QUFBQSxVQUN4QixRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQUE7QUFBQSxNQUVIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path'); //必须要引入resolve
import path from 'path';
function _resolve(dir: string) {
  return resolve(__dirname, dir);
}
export default defineConfig({
  server: {
    port: 3500,
  },
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './packages/index.js'),
      name: 'HemyProgress',
      fileName: (format) => `hemy-progress.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});

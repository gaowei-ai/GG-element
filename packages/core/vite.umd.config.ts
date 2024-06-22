import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      formats: ['umd'],
      name: 'GGElement',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'], //外部模块 vue排除不打包
      output: {
        exports: 'named',
        globals: {
          //只有umd或life模式需要定义globals
          vue: 'Vue', //指定外部模块 'vue' 在捆绑包中对应的全局变量是 Vue。这意味着在捆绑包中，当需要引用 'vue' 模块时，会使用全局变量
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        },
      },
    },
  },
});

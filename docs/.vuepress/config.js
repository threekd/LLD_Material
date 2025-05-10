import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'en-US',
  base: '/LLD_Material/',
  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      '/',
      '/document',
      '/flowchart'
    ],
  }),

  plugins: [
    mdEnhancePlugin({
      // 启用 mermaid
      mermaid: true,
    }),
  ],
  
  bundler: viteBundler(),
})

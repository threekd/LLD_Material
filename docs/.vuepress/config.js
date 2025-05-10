import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'en-US',
  base: '/LLD_Material/',
  title: 'New Purchase & Inventory',
  description: 'Low Level Design Document',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      '/', 
      '/flowchart',
      '/document',
    ],
  }),

  plugins: [
    mdEnhancePlugin({
      // 启用流程图
      flowchart: true,
    }),
  ],

  bundler: viteBundler(),
})


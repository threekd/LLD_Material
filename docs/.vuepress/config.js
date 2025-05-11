import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'en-US',
  base: '/LLD_Material/',
  title: 'LLD_Material',
  description: 'Low Level Design for Material Module',

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
      flowchart: true,
    }),
  ],
  
  bundler: viteBundler(),
})

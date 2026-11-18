import { defineConfig } from 'vitepress'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { pageKey, verifiedDate } from './reading-guides.mjs'
import { knowledgeSidebar } from './site-navigation.mjs'
import { sectionPager } from './theme/knowledge.mjs'
import { directoryMarkdown, directoryPager } from './directory-markdown.mjs'

const require = createRequire(import.meta.url)
const component = (name: string) => fileURLToPath(new URL(`./theme/components/${name}.vue`, import.meta.url))
const miniSearchEntry = require.resolve('minisearch', { paths: [require.resolve('vitepress/package.json')] })

// GitHub Pages 项目站点部署时需要设置仓库名作为 base。
// 本地开发默认 '/'；CI 构建时通过环境变量注入，例如 /cloud-ai-knowledge/
const base = (process.env.VITEPRESS_BASE || '/').replace(/([^/])$/, '$1/')

export default defineConfig({
  title: '云与 AI 技术知识库',
  description: '云计算、人工智能、软件研发、游戏行业与技术编年史的中文知识体系。',
  lang: 'zh-CN',
  appearance: true,
  base,
  cleanUrls: true,
  // 内容由快照迁入，暂不展示 Git 修订日期，避免与文章复核日期混淆。
  lastUpdated: false,
  ignoreDeadLinks: false,

  transformPageData(pageData) {
    const path = `/${pageKey(pageData.relativePath)}`
    Object.assign(pageData.frontmatter, sectionPager(knowledgeSidebar, path), directoryPager(path))
    if (pageData.frontmatter.directory) {
      pageData.frontmatter.outline = false
      pageData.frontmatter.aside = false
    }
    pageData.frontmatter.lastVerified = verifiedDate(pageData.frontmatter.lastVerified)
    pageData.frontmatter.lastReviewed = verifiedDate(pageData.frontmatter.lastReviewed)
  },

  vite: {
    resolve: {
      alias: [
        { find: /^\.\/components\/VPLocalNav\.vue$/, replacement: component('ReadingControls') },
        { find: /^\.\/components\/VPDocAsideOutline\.vue$/, replacement: component('KnowledgeAside') },
        { find: /^\.\/components\/VPSidebarGroup\.vue$/, replacement: component('KnowledgeTree') },
        { find: /^\.\/components\/VPDocOutlineItem\.vue$/, replacement: component('KnowledgeOutline') },
        { find: /^\.\/components\/VPLocalSearchBox\.vue$/, replacement: component('KnowledgeSearch') },
        { find: /^\.\/components\/VPNavBarHamburger\.vue$/, replacement: component('KnowledgeMenuButton') },
        // Use the exact MiniSearch version that wrote VitePress's local index.
        { find: /^minisearch$/, replacement: miniSearchEntry.replace('/cjs/index.cjs', '/es/index.js') },
      ],
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '云与 AI 技术知识库' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '云计算、人工智能、软件研发、游戏行业与技术编年史的中文知识体系',
      },
    ],
  ],

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
    config(markdown) {
      directoryMarkdown(markdown)
      const defaultFence = markdown.renderer.rules.fence?.bind(markdown.renderer.rules)
      if (!defaultFence) return

      markdown.renderer.rules.fence = (...args) => {
        const [tokens, index] = args
        const token = tokens[index]
        if (token.info.trim() !== 'mermaid') return defaultFence(...args)

        return `<Mermaid id="mermaid-${index}" graph="${encodeURIComponent(token.content)}"></Mermaid>`
      }
    },
  },

  sitemap: {
    hostname: 'https://shuifans.github.io/cloud-ai-knowledge/',
    transformItems(items) {
      return items.filter(item => {
        const url = item.url.replace(/\/$/, '')
        return !/^(?:404|updates)(?:\.html)?$/.test(url) && url !== 'knowledge'
      })
    },
  },

  themeConfig: {
    siteTitle: '云与 AI 技术知识库',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索知识', buttonAriaLabel: '搜索知识' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索框',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    nav: [
      { text: '知识体系', link: '/' },
      { text: '关于', link: '/about' },
      { text: '鹈鹕测试', link: 'https://shuifans.github.io/pelican-lab/benchmarks/pelican-2d/' },
    ],

    sidebar: knowledgeSidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/shuifans/cloud-ai-knowledge',
      },
    ],

    editLink: {
      pattern: 'https://github.com/shuifans/cloud-ai-knowledge/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    outline: { level: [2, 3], label: '本页目录' },

    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      message: '云与 AI 技术知识库 · 内容优先依据官方文档与原始来源',
      copyright: 'CC BY-NC-SA 4.0',
    },

    darkModeSwitchLabel: '日夜模式',
    lightModeSwitchTitle: '切换到白天模式',
    darkModeSwitchTitle: '切换到夜间模式',
    sidebarMenuLabel: '知识目录',
    returnToTopLabel: '返回顶部',
  },
})

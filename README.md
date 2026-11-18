# 云与 AI 技术知识库

云计算、人工智能、软件研发、游戏行业与技术编年史的中文知识体系，使用 VitePress 构建并发布到 GitHub Pages。

> 站点地址：<https://shuifans.github.io/cloud-ai-knowledge/>

鹈鹕模型测试已独立为 [Pelican Lab](https://shuifans.github.io/pelican-lab/) benchmark 站点；本仓库只维护知识内容。

## 内容结构

知识体系采用“领域 → 子域 → 专题”三级目录，技术领域、游戏行业与技术编年史并列：

| 支柱 | 路径 | 主题 |
| --- | --- | --- |
| 云计算 | `docs/cloud/` | 基座（虚拟化/OpenStack）· 计算·存储·网络 · 数据库·大数据（含 OLAP）· 云原生 · 架构与治理 |
| 人工智能 | `docs/ai/` | 模型与算法 · 数据与知识工程 · AI Infra（集群→训练→推理）· 应用与评测 · Agent · 工程运营与治理 |
| 软件研发与工程实践 | `docs/software/` | 项目入门 · 编程基础 · 需求与架构 · 前端与专项开发 · 后端与数据 · 工具与 AI 协作 · 测试与安全 · 交付与维护 · 查询索引 |
| 游戏行业 | `docs/gaming/` | 行业与组织 · 策划与研发 · 发行与运营 · 云与 AI · 调研与索引 |
| 技术编年史 | `docs/chronicle/` | 移动互联网→直播→短视频→区块链→元宇宙→AI，及信创暗流 |

文章状态：无标记 = 完整文章；提纲页使用纯文字“本文是提纲页”提示，并在导航标注“（提纲）”。仅规划的专题不创建空页、不提供空链接。

## 本地开发

```bash
npm install
npm run docs:dev      # http://localhost:5173
node --test tests/*.test.mjs
npm run docs:build
npm run docs:preview
```

写作规范与 AI 协作约定见 [CLAUDE.md](./CLAUDE.md)，通用文章模板见 [templates/article-template.md](./templates/article-template.md)。

## 发布

推送到 `main` 分支即由 GitHub Actions 自动构建并发布到 GitHub Pages（见 `.github/workflows/deploy.yml`）。仓库 Settings → Pages → Source 选择 **GitHub Actions**；工作流通过 `VITEPRESS_BASE` 自动注入仓库名前缀。

## 技术栈

- [VitePress](https://vitepress.dev/) 1.x（中文全文搜索内置）
- [Mermaid](https://mermaid.js.org/)（自定义组件按需渲染，支持主题切换与点击放大）

## 内容声明

技术内容优先依据官方公开文档、原始论文与项目仓库；工程建议会与可核验事实分开表述，并标注适用边界。内容不包含作者履历、客户信息、内部系统或未公开数据。内容许可：CC BY-NC-SA 4.0。

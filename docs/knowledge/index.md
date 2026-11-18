---
title: 知识体系已移至首页
layout: page
sidebar: false
outline: false
search: false
readingProgress: false
redirect: /
---

<script setup>
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
onMounted(() => {
  const destination = new URL(withBase(frontmatter.value.redirect), window.location.origin)
  destination.search = window.location.search
  if (window.location.hash) destination.hash = window.location.hash
  window.location.replace(destination.href)
})
</script>

<div class="vp-doc" style="max-width: 760px; margin: 0 auto; padding: 24px;">
  <h1>知识体系已移至首页</h1>
  <p>正在打开知识首页。也可以<a :href="withBase(frontmatter.redirect)">直接进入知识首页</a>。</p>
</div>

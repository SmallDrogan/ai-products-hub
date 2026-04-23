# AI产品导航

一个可扩展的AI产品聚合展示站点，支持分类浏览、搜索筛选、产品详情展示。

## 特性

- 🚀 **静态优先** - 使用Astro构建，极致性能
- 🎨 **美观UI** - Tailwind CSS，现代设计
- 🔍 **搜索筛选** - 实时搜索、标签筛选
- 📱 **响应式** - 完美适配移动端
- 🌙 **暗色模式** - 自动/手动切换
- 📦 **易于维护** - YAML数据文件管理

## 本地开发

```bash
cd ai-products-hub
npm install
npm run dev
```

## 新增产品

编辑 `src/data/products.ts` 文件，添加新产品数据：

```typescript
{
  id: 'new-product',
  name: '产品名称',
  slug: 'product-slug',
  description: '简短描述',
  fullDescription: '详细介绍',
  category: 'agent', // agent | writing | image | code | audio | video | other
  tags: ['标签1', '标签2'],
  logo: '/images/logo.svg',
  website: 'https://example.com',
  pricing: 'freemium', // free | freemium | paid
  featured: false,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
}
```

## 部署到GitHub Pages

1. 修改 `astro.config.mjs` 中的 `site` 和 `base`
2. 推送到GitHub仓库
3. 在仓库设置中启用GitHub Pages
4. 自动部署完成

## 技术栈

- Astro 4.x
- React 18.x
- Tailwind CSS 3.x
- TypeScript
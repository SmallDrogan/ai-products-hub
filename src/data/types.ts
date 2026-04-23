export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: CategoryId;
  tags: string[];
  logo: string;
  website: string;
  pricing: 'free' | 'freemium' | 'paid';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CategoryId = 'agent' | 'writing' | 'image' | 'code' | 'audio' | 'video' | 'other';

export interface Category {
  id: CategoryId;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'agent', name: 'AI Agent', nameEn: 'Agent', icon: '🤖', description: '智能代理和自动化助手' },
  { id: 'writing', name: '写作', nameEn: 'Writing', icon: '✍️', description: 'AI写作和内容创作工具' },
  { id: 'image', name: '图像', nameEn: 'Image', icon: '🎨', description: 'AI图像生成和编辑工具' },
  { id: 'code', name: '代码', nameEn: 'Code', icon: '💻', description: 'AI编程和代码辅助工具' },
  { id: 'audio', name: '音频', nameEn: 'Audio', icon: '🎵', description: 'AI音频生成和处理工具' },
  { id: 'video', name: '视频', nameEn: 'Video', icon: '🎬', description: 'AI视频生成和编辑工具' },
  { id: 'other', name: '其他', nameEn: 'Other', icon: '📦', description: '其他AI工具和产品' },
];

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find(c => c.id === id);
}
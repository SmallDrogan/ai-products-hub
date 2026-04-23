import { useState } from 'react';
import type { Product } from '../data/types';

interface Props {
  products: Product[];
  tags: string[];
}

export default function ProductList({ products: initialProducts, tags }: Props) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  
  const pricingOptions = ['free', 'freemium', 'paid'];
  
  const applyFilters = () => {
    let results = initialProducts;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    if (selectedTags.length > 0) {
      results = results.filter(p => selectedTags.some(t => p.tags.includes(t)));
    }
    
    if (selectedPricing.length > 0) {
      results = results.filter(p => selectedPricing.includes(p.pricing));
    }
    
    setFilteredProducts(results);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setTimeout(applyFilters, 0);
  };
  
  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    setTimeout(applyFilters, 0);
  };
  
  const handlePricingClick = (pricing: string) => {
    const newPricing = selectedPricing.includes(pricing)
      ? selectedPricing.filter(p => p !== pricing)
      : [...selectedPricing, pricing];
    setSelectedPricing(newPricing);
    setTimeout(applyFilters, 0);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedPricing([]);
    setFilteredProducts(initialProducts);
  };
  
  const hasFilters = searchQuery || selectedTags.length > 0 || selectedPricing.length > 0;
  
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      agent: '🤖',
      writing: '✍️',
      image: '🎨',
      code: '💻',
      audio: '🎵',
      video: '🎬',
      other: '📦',
    };
    return icons[category] || '📦';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="搜索AI产品..."
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setTimeout(applyFilters, 0); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {hasFilters && (
          <button onClick={clearFilters} className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
            清除筛选
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">标签:</span>
        {tags.slice(0, 12).map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">定价:</span>
        {pricingOptions.map(pricing => (
          <button
            key={pricing}
            onClick={() => handlePricingClick(pricing)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedPricing.includes(pricing)
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {pricing === 'free' ? '免费' : pricing === 'freemium' ? '免费增值' : '付费'}
          </button>
        ))}
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          找到 {filteredProducts.length} 个产品
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">没有找到匹配的产品</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <a key={product.id} href={`/product/${product.slug}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 group block">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(product.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                        精选
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {product.category === 'agent' ? 'AI Agent' : product.category === 'writing' ? '写作' : product.category === 'image' ? '图像' : product.category === 'code' ? '代码' : product.category === 'audio' ? '音频' : product.category === 'video' ? '视频' : '其他'}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  product.pricing === 'free' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                  product.pricing === 'freemium' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                  'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                }`}>
                  {product.pricing === 'free' ? '免费' : product.pricing === 'freemium' ? '免费增值' : '付费'}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
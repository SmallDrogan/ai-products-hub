import { useState } from 'react';
import type { Product } from '../data/types';
import { categories } from '../data/types';
import type { CategoryId } from '../data/types';

interface Props {
  products: Product[];
  onFilter: (results: Product[]) => void;
}

export default function FilterBar({ products, onFilter }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  
  const allTags = Array.from(new Set(products.flatMap(p => p.tags))).sort();
  const pricingOptions = ['free', 'freemium', 'paid'];
  
  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    applyFilters(newTags, selectedPricing);
  };
  
  const handlePricingChange = (pricing: string) => {
    const newPricing = selectedPricing.includes(pricing)
      ? selectedPricing.filter(p => p !== pricing)
      : [...selectedPricing, pricing];
    setSelectedPricing(newPricing);
    applyFilters(selectedTags, newPricing);
  };
  
  const applyFilters = (tags: string[], pricing: string[]) => {
    let results = products;
    
    if (tags.length > 0) {
      results = results.filter(p => tags.some(t => p.tags.includes(t)));
    }
    
    if (pricing.length > 0) {
      results = results.filter(p => pricing.includes(p.pricing));
    }
    
    onFilter(results);
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedPricing([]);
    onFilter(products);
  };
  
  const hasFilters = selectedTags.length > 0 || selectedPricing.length > 0;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">标签:</span>
        {allTags.slice(0, 12).map(tag => (
          <button
            key={tag}
            onClick={() => handleTagChange(tag)}
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
            onClick={() => handlePricingChange(pricing)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedPricing.includes(pricing)
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {pricing === 'free' ? '免费' : pricing === 'freemium' ? '免费增值' : '付费'}
          </button>
        ))}
        
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
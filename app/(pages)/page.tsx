'use client';
import WelcomeBanner from '@/components/dashboard/banner';
import StatsCards from '@/components/dashboard/stats-card';
import ActiveFilters from '@/components/materials/active-filter';
import CategorySidebar from '@/components/materials/category-sidebar';
import TabsSection from '@/components/materials/tab-section';
import { materials } from '@/constants/type';
import { useFilter } from '@/context/filter-context';
import { useSearch } from '@/context/search-context';
import { useFilteredMaterials, useSortedMaterials } from '@/hooks/useMaterials';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { searchQuery } = useSearch();
  const {
    selectedCategory,
    selectedDifficulties,
    selectedDurations,
    sortBy
  } = useFilter();

  const [bookmarkedMaterials, setBookmarkedMaterials] = useState<string[]>(
    materials.filter(m => m.isBookmarked).map(m => m.id)
  );

  const filteredMaterials = useFilteredMaterials(
    materials,
    searchQuery,
    selectedCategory,
    selectedDifficulties,
    selectedDurations
  );

  const sortedMaterials = useSortedMaterials(filteredMaterials, sortBy);

  const handleBookmarkToggle = (materialId: string) => {
    setBookmarkedMaterials(prev =>
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleMaterialClick = (materialId: string) => {
    router.push(`/detail/${materialId}`);
  };

  const handleContinueLearning = () => {
    if (bookmarkedMaterials.length > 0) {
      router.push(`/detail/${bookmarkedMaterials[0]}`);
    } else if (filteredMaterials.length > 0) {
      router.push(`/detail/${filteredMaterials[0].id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 lg:py-6">
      <WelcomeBanner onContinueLearning={handleContinueLearning} />
      <StatsCards />
      <ActiveFilters />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-6">
        <CategorySidebar
          bookmarkedIds={bookmarkedMaterials}
          onMaterialClick={handleMaterialClick}
        />

        <div className="lg:w-3/4">
          <TabsSection
            materials={sortedMaterials}
            bookmarkedIds={bookmarkedMaterials}
            onBookmarkToggle={handleBookmarkToggle}
          />
        </div>
      </div>
    </div>
  );
}
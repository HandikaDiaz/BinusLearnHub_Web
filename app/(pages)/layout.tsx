import MainLayout from "@/components/layouts/main-layout";
import { FilterProvider } from "@/context/filter-context";
import { SearchProvider } from "@/context/search-context";


interface Props {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <SearchProvider>
            <FilterProvider>
                <MainLayout>
                    {children}
                </MainLayout>
            </FilterProvider>
        </SearchProvider>
    );
}
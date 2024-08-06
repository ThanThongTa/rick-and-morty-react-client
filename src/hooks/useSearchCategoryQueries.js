import { useSearchCategoryStore } from './useSearchCategoryStore';

export function useSearchCategoryQueries() {
	const setSearchCategory = useSearchCategoryStore(
		(state) => state.setSearchCategory
	);
	const currentSearchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);
	const changeCategory = (category) => {
		setSearchCategory(category);
		console.log(`changeCategory: ${category}`);
	};
	return { currentSearchCategory, changeCategory };
}

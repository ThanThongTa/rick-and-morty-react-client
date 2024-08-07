import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';
import { SearchCategories } from '../globals/SearchCategories';

/* Custom Hook für die Verwendung von Zustand und Immer
 * speichert den Zustand in LocalStorage und lädt ihn wieder
 */
export const useSearchCategoryStore = create()(
	immer((set) => ({
		searchCategory: getInitialSearchCategory(),
		/* speichert die aktuelle Kategorie im Zustand und im LocalStorage */
		setSearchCategory: (newSearchCategory) =>
			set((state) => {
				state.searchCategory = newSearchCategory;
				localStorage.setItem(LocalStorageKeys.Category, JSON.stringify(state));
			}),
	}))
);

/* Lädt die aktuelle Suchkategorie aus dem LocalStorage */
function getInitialSearchCategory() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.searchCategory ?? SearchCategories.Characters;
	} catch (error) {
		console.log(error);
		return SearchCategories.Characters;
	}
}

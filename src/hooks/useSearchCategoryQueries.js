import { SearchCategories } from '../globals/SearchCategories';
import { useCharactersStore } from './useCharactersStore';
import { useEpisodesStore } from './useEpisodesStore';
import { useLocationsStore } from './useLocationsStore';
import { useSearchCategoryStore } from './useSearchCategoryStore';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useSearchCategoryQueries() {
	/* Funktionen für den Zustand */
	const setSearchCategory = useSearchCategoryStore(
		(state) => state.setSearchCategory
	);

	/* Werte aus dem Zustand */
	const currentSearchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	/* Rule of Hooks, jeder Hook muss immer geladen werden
	 * keine Conditionals erlaubt */
	const LocPages = useLocationsStore((state) => state.pages);
	const LocCount = useLocationsStore((state) => state.count);
	const LocCurrentPage = useLocationsStore((state) => state.currentPage);
	const EpiPages = useEpisodesStore((state) => state.pages);
	const EpiCount = useEpisodesStore((state) => state.count);
	const EpiCurrentPage = useEpisodesStore((state) => state.currentPage);
	const CharPages = useCharactersStore((state) => state.pages);
	const CharCount = useCharactersStore((state) => state.count);
	const CharCurrentPage = useCharactersStore((state) => state.currentPage);

	/* Lokale Werte, um zu ermitteln, welche aktuell
	 * zurück gegeben werden sollen, abhängig von der
	 * aktuell ausgewählten Kategorie */
	let pages = 0;
	let count = 0;
	let currentPage = 0;
	/* conditional, um zu ermitteln, welche aktuell relevant sind */
	switch (currentSearchCategory) {
		case SearchCategories.Characters:
			pages = CharPages;
			count = CharCount;
			currentPage = CharCurrentPage;
			break;
		case SearchCategories.Episodes:
			pages = EpiPages;
			count = EpiCount;
			currentPage = EpiCurrentPage;
			break;
		case SearchCategories.Locations:
			pages = LocPages;
			count = LocCount;
			currentPage = LocCurrentPage;
			break;
		default:
			break;
	}

	/* Funktion zum Ändern der Kategorie */
	const changeCategory = (category) => {
		setSearchCategory(category);
		console.log(`changeCategory: ${category}`);
	};

	return {
		currentSearchCategory,
		changeCategory,
		pages,
		count,
		currentPage,
	};
}

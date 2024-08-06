import { SearchCategories } from '../globals/SearchCategories';
import { useCharactersQueries } from './useCharactersQueries';
import { useEpisodesQueries } from './useEpisodesQueries';
import { useLocationsQueries } from './useLocationsQueries';
import { useSearchCategoryStore } from './useSearchCategoryStore';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager */
export function useSelectInputs() {
	/* Funktionen für den Zustand */

	/* Werte aus dem Zustand */
	const currentSearchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	/* Hooks der Queries */
	const {
		search: searchEpisodes,
		setSearch: setSearchEpisodes,
		queryAllEpisodes,
		filterEpisodes,
	} = useEpisodesQueries();
	const {
		search: searchLocations,
		setSearch: setSearchLocations,
		queryAllLocations,
		filterLocations,
	} = useLocationsQueries();
	const {
		search: searchCharacters,
		setSearch: setSearchCharacters,
		queryAllCharacters,
		filterCharacters,
	} = useCharactersQueries();

	/* Je nach ausgewählter Kategorie wird der entsprechende Query aufgerufen */
	const query = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				queryAllEpisodes();
				break;
			case SearchCategories.Characters:
				queryAllCharacters();
				break;
			case SearchCategories.Locations:
				queryAllLocations();
				break;
			default:
				break;
		}
	};

	/* Filtern der Daten je nach ausgewählter Kategorie */
	const filter = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				filterEpisodes();
				break;
			case SearchCategories.Characters:
				filterCharacters();
				break;
			case SearchCategories.Locations:
				filterLocations();
				break;
			default:
				break;
		}
	};

	/* Aktualisieren des Suchbegriffs je nach Kategorie */
	const updateSearchTerm = (e) => {
		const term = e.target.value;
		if (term.length < 2) return;
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				setSearchEpisodes(term);
				break;
			case SearchCategories.Characters:
				setSearchCharacters(term);
				break;
			case SearchCategories.Locations:
				setSearchLocations(term);
				break;
			default:
				break;
		}
	};

	/* Auslesen des Suchbegriffs je nach Kategorie */
	const getSearchTerm = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				return searchEpisodes;
			case SearchCategories.Characters:
				return searchCharacters;
			case SearchCategories.Locations:
				return searchLocations;
			default:
				break;
		}
	};

	return {
		getSearchTerm,
		updateSearchTerm,
		query,
		filter,
	};
}

import { useSearchStore } from './useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useLazyQuery } from '@apollo/client';
import { filterCharactersQuery } from '../data/filterCharactersQuery';
import { filterLocationsQuery } from '../data/filterLocationsQuery';
import { filterEpisodesQuery } from '../data/filterEpisodesQuery';
import { SearchCommands } from '../globals/SearchCommands';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useSearchQueries() {
	/* Funktionen für den Zustand */
	const setSearch = useSearchStore((state) => state.setSearch);
	const setStoredEpisodes = useSearchStore((state) => state.setStoredEpisodes);
	const setSearchCategory = useSearchStore((state) => state.setSearchCategory);
	const setPages = useSearchStore((state) => state.setPages);
	const setCount = useSearchStore((state) => state.setCount);
	const currentSearchCategory = useSearchStore((state) => state.searchCategory);
	const search = useSearchStore((state) => state.search);
	const setCurrentPage = useSearchStore((state) => state.setCurrentPage);

	const setStoredCharacters = useSearchStore(
		(state) => state.setStoredCharacters
	);
	const setStoredLocations = useSearchStore(
		(state) => state.setStoredLocations
	);
	const setCurrentSearchCommand = useSearchStore(
		(state) => state.setCurrentSearchCommand
	);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useSearchStore((state) => state.currentPage);

	/* LazyLoading der Queries */
	const [, { refetch: refetchCharacters }] = useLazyQuery(
		filterCharactersQuery,
		{
			variables: { page: currentPage, name: search },
		}
	);
	const [, { refetch: refetchLocations }] = useLazyQuery(filterLocationsQuery, {
		variables: { page: currentPage, name: search },
	});

	const [, { refetch: refetchEpisodes }] = useLazyQuery(filterEpisodesQuery, {
		variables: { page: currentPage, name: search },
	});

	/* Lädt die Lazy Queries und speichert die Werte im Zustand */
	const queryAllCharacters = async () => {
		const res = await refetchCharacters({ page: currentPage });
		setStoredCharacters(res.data.characters.results);
		setCurrentPage(currentPage);
		setCount(res.data.characters.info.count);
		setPages(res.data.characters.info.pages);
	};
	const queryAllLocations = async () => {
		const res = await refetchLocations({ page: currentPage });
		setStoredLocations(res.data.locations.results);
		setCurrentPage(currentPage);
		setCount(res.data.locations.info.count);
		setPages(res.data.locations.info.pages);
	};
	const queryAllEpisodes = async () => {
		const res = await refetchEpisodes({ page: currentPage });
		setStoredEpisodes(res.data.episodes.results);
		setCurrentPage(currentPage);
		setCount(res.data.episodes.info.count);
		setPages(res.data.episodes.info.pages);
	};

	const queryFilterCharacters = async () => {
		const res = await refetchCharacters({ page: currentPage, name: search });
		setStoredCharacters(res.data.characters.results);
	};
	const queryFilterLocations = async () => {
		const res = await refetchLocations({ page: currentPage, name: search });
		setStoredLocations(res.data.locations.results);
	};
	const queryFilterEpisodes = async () => {
		const res = await refetchEpisodes({ page: currentPage, name: search });
		setStoredEpisodes(res.data.episodes.results);
	};

	/* schaut in den currentSearchCategory und lädt dann die entsprechende Query */
	const queryAll = () => {
		console.log(`queryAll: ${currentSearchCategory}`);
		switch (currentSearchCategory) {
			case SearchCategories.Characters:
				queryAllCharacters();
				break;
			case SearchCategories.Locations:
				queryAllLocations();
				break;
			case SearchCategories.Episodes:
				queryAllEpisodes();
				break;
			default:
				break;
		}
	};

	/* schaut in die currentSearchCategory und filtert dann die entsprechende Query */
	const filterAll = () => {
		console.log(`filterAll: ${currentSearchCategory}`);
		const term = document.querySelector('.search-input').value;
		if (term.length < 2) return;
		switch (currentSearchCategory) {
			case SearchCategories.Characters: {
				setCurrentSearchCommand(SearchCommands.FilterCharacters);
				setSearch(term);
				queryFilterCharacters();
				break;
			}
			case SearchCategories.Locations:
				setCurrentSearchCommand(SearchCommands.FilterLocations);
				setSearch(term);
				queryFilterLocations();
				break;
			case SearchCategories.Episodes:
				setCurrentSearchCommand(SearchCommands.FilterEpisodes);
				setSearch(term);
				queryFilterEpisodes();
				break;
			default:
				console.log(currentSearchCategory);
				break;
		}
	};

	/* Ändert den currentSearchCategory */
	const changeCategory = (category) => {
		setSearchCategory(category);
		console.log(`changeCategory: ${category}`);
	};

	/* Ändert den currentPage */
	const changePage = (page) => {
		currentPage = page;
		console.log(`changePage: ${currentPage}`);
	};

	return {
		search,
		setSearch,
		changeCategory,
		changePage,
		queryAll,
		filterAll,
	};
}

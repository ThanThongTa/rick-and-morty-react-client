import { useSearchStore } from './useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useLazyQuery } from '@apollo/client';
import { filterCharactersQuery } from '../data/filterCharactersQuery';
import { filterLocationsQuery } from '../data/filterLocationsQuery';
import { filterEpisodesQuery } from '../data/filterEpisodesQuery';
import { SearchCommands } from '../globals/SearchCommands';
import { useEffect } from 'react';

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
	const status = useSearchStore((state) => state.currentlySelectedStatus);
	const species = useSearchStore((state) => state.currentlySelectedSpecies);
	const characterType = useSearchStore(
		(state) => state.currentlySelectedCharacterType
	);
	const locationType = useSearchStore(
		(state) => state.currentlySelectedLocationType
	);
	const gender = useSearchStore((state) => state.currentlySelectedGender);
	const dimension = useSearchStore((state) => state.currentlySelectedDimension);

	const setStoredCharacters = useSearchStore(
		(state) => state.setStoredCharacters
	);
	const setStoredLocations = useSearchStore(
		(state) => state.setStoredLocations
	);
	const setCurrentSearchCommand = useSearchStore(
		(state) => state.setCurrentSearchCommand
	);

	const characters = useSearchStore((state) => state.characters);
	const locations = useSearchStore((state) => state.locations);
	const episodes = useSearchStore((state) => state.episodes);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useSearchStore((state) => state.currentPage);

	useEffect(() => {
		saveFetchedCharacters();
	}, [search, status, species, characterType, gender]);

	useEffect(() => {
		saveFetchedLocations();
	}, [search, locationType, dimension]);

	const saveFetchedCharacters = async function () {
		const res = await refetchCharacters({
			page: currentPage,
			name: search,
			status: status === 'all' ? null : status,
			species: species === 'all' ? null : species,
			type: characterType === 'all' ? null : characterType,
			gender: gender === 'all' ? null : gender,
		});
		setStoredCharacters(res.data.characters.results);
		setCurrentPage(currentPage);
		setCount(res.data.characters.info.count);
		setPages(res.data.characters.info.pages);
	};

	const saveFetchedLocations = async function () {
		const res = await refetchLocations({
			page: currentPage,
			name: search,
			type: locationType === 'all' ? null : locationType,
			dimension: dimension === 'all' ? null : dimension,
		});
		setStoredLocations(res.data.locations.results);
		setCurrentPage(currentPage);
		setCount(res.data.locations.info.count);
		setPages(res.data.locations.info.pages);
	};

	/* LazyLoading der Queries */
	const [, { refetch: refetchCharacters }] = useLazyQuery(
		filterCharactersQuery,
		{
			variables: {
				page: currentPage,
				name: search ?? null,
				status: status === 'all' ? null : status,
				species: species === 'all' ? null : species,
				type: characterType === 'all' ? null : characterType,
				gender: gender === 'all' ? null : gender,
			},
		}
	);
	const [, { refetch: refetchLocations }] = useLazyQuery(filterLocationsQuery, {
		variables: {
			page: currentPage,
			name: search,
			type: locationType === 'all' ? null : locationType,
			dimension: dimension === 'all' ? null : dimension,
		},
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
		if (term.length < 2 && !species && !status && !type && !gender) return;
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

	const hasResults = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Characters:
				return characters.length > 0;
			case SearchCategories.Locations:
				return locations.length > 0;
			case SearchCategories.Episodes:
				return episodes.length > 0;
			default:
				return false;
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
		hasResults,
	};
}

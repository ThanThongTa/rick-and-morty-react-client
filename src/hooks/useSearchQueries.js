import { useEffect } from 'react';
import { useSearchStore } from './useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useLazyQuery } from '@apollo/client';
import { filterCharactersQuery } from '../data/filterCharactersQuery';
import { filterLocationsQuery } from '../data/filterLocationsQuery';
import { filterEpisodesQuery } from '../data/filterEpisodesQuery';
import { SearchCommands } from '../globals/SearchCommands';

export function useSearchQueries() {
	let currentSearchCommand = useSearchStore(
		(state) => state.currentSearchCommand
	);
	let search = useSearchStore((state) => state.search);
	const setSearch = useSearchStore((state) => state.setSearch);
	const currentPage = useSearchStore((state) => state.currentPage);
	let currentSearchCategory = useSearchStore((state) => state.searchCategory);
	const setStoredCharacters = useSearchStore(
		(state) => state.setStoredCharacters
	);
	const setStoredLocations = useSearchStore(
		(state) => state.setStoredLocations
	);
	const setStoredEpisodes = useSearchStore((state) => state.setStoredEpisodes);

	const [getCharacters, { refetch: refetchCharacters }] = useLazyQuery(
		filterCharactersQuery,
		{
			variables: { page: currentPage, name: search },
		}
	);

	const [getLocations, { refetch: refetchLocations }] = useLazyQuery(
		filterLocationsQuery,
		{
			variables: { page: currentPage, name: search },
		}
	);

	const [getEpisodes, { refetch: refetchEpisodes }] = useLazyQuery(
		filterEpisodesQuery,
		{
			variables: { page: currentPage, name: search },
		}
	);

	const queryAllCharacters = async () => {
		const res = await getCharacters({ page: currentPage, name: search });
		setStoredCharacters(res.data.characters.results);
	};

	const queryAllLocations = async () => {
		const res = await getLocations({ page: currentPage, name: search });
		setStoredLocations(res.data.locations.results);
	};

	const queryAllEpisodes = async () => {
		const res = await getEpisodes({ page: currentPage, name: search });
		setStoredEpisodes(res.data.episodes.results);
	};

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

	const filterAll = () => {
		console.log(`filterAll: ${currentSearchCategory}`);
		switch (currentSearchCategory) {
			case SearchCategories.Characters:
				currentSearchCommand = SearchCommands.FilterCharacters;
				search = document.querySelector('.search-input').value;
				break;
			case SearchCategories.Locations:
				currentSearchCommand = SearchCommands.FilterLocations;
				search = document.querySelector('.search-input').value;
				break;
			case SearchCategories.Episodes:
				currentSearchCommand = SearchCommands.FilterEpisodes;
				search = document.querySelector('.search-input').value;
				break;
			default:
				console.log(currentSearchCategory);
				break;
		}
	};

	const changeCategory = (category) => {
		currentSearchCategory = category;
		console.log(`changeCategory: ${currentSearchCategory}`);
	};

	useEffect(() => {
		switch (currentSearchCommand) {
			case SearchCommands.FilterCharacters:
				refetchCharacters({ page: currentPage, name: search });
				break;
			case SearchCommands.FilterLocations:
				refetchLocations({ page: currentPage, name: search });
				break;
			case SearchCommands.FilterEpisodes:
				refetchEpisodes({ page: currentPage, name: search });
				break;
			default:
				console.log(
					'no command',
					search,
					currentSearchCategory,
					currentPage,
					currentSearchCommand
				);
				break;
		}
	}, [
		search,
		currentSearchCategory,
		currentPage,
		currentSearchCommand,
		refetchCharacters,
		refetchLocations,
		refetchEpisodes,
	]);

	return {
		search,
		setSearch,
		changeCategory,
		queryAll,
		filterAll,
	};
}

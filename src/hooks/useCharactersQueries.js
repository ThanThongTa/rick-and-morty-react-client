import { useLazyQuery } from '@apollo/client';
import { filterCharactersQuery } from '../data/filterCharactersQuery';
import { useEffect } from 'react';
import { useCharactersStore } from '../hooks/useCharactersStore';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useCharactersQueries() {
	/* Funktionen für den Zustand */
	const setSearch = useCharactersStore((state) => state.setSearch);
	const setPages = useCharactersStore((state) => state.setPages);
	const setCount = useCharactersStore((state) => state.setCount);
	const setCurrentPage = useCharactersStore((state) => state.setCurrentPage);
	const setStoredCharacters = useCharactersStore(
		(state) => state.setStoredCharacters
	);
	/* Werte aus dem Zustand */
	const search = useCharactersStore((state) => state.search);
	const status = useCharactersStore((state) => state.currentlySelectedStatus);
	const species = useCharactersStore((state) => state.currentlySelectedSpecies);
	const type = useCharactersStore((state) => state.currentlySelectedType);
	const gender = useCharactersStore((state) => state.currentlySelectedGender);
	const characters = useCharactersStore((state) => state.characters);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useCharactersStore((state) => state.currentPage);

	/* Hook, damit die Suche neu ausgeführt wird, wenn sich ein Filter ändert */
	useEffect(() => {
		saveFetchedCharacters();
	}, [search, status, species, type, gender]);

	/* Lädt die Daten neu und speichert die Werte im Zustand */
	const saveFetchedCharacters = async function () {
		const res = await refetchCharacters({
			page: currentPage,
			name: search,
			status: status === 'all' ? null : status,
			species: species === 'all' ? null : species,
			type: type === 'all' ? null : type,
			gender: gender === 'all' ? null : gender,
		});
		setStoredCharacters(res.data.characters.results);
		setCurrentPage(currentPage);
		setCount(res.data.characters.info.count);
		setPages(res.data.characters.info.pages);
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
				type: type === 'all' ? null : type,
				gender: gender === 'all' ? null : gender,
			},
		}
	);

	/* Laden der Queries und speichern der Werte im Zustand */
	const queryAllCharacters = async () => {
		const res = await refetchCharacters({ page: currentPage });
		setStoredCharacters(res.data.characters.results);
		setCurrentPage(currentPage);
		setCount(res.data.characters.info.count);
		setPages(res.data.characters.info.pages);
	};

	const queryFilterCharacters = async () => {
		const res = await refetchCharacters({ page: currentPage, name: search });
		setStoredCharacters(res.data.characters.results);
	};

	/* filtert die Characters */
	const filterCharacters = () => {
		console.log(`filterCharacters`);
		const term = document.querySelector('.search-input').value;
		if (term.length < 2 && !species && !status && !type && !gender) return;
		setSearch(term);
		queryFilterCharacters();
	};

	/* prüft, ob Ergebnisse vorhanden sind */
	const hasResults = () => {
		return characters.length > 0;
	};

	/* Ändert den currentPage */
	const changePage = (page) => {
		currentPage = page;
		console.log(`changePage: ${currentPage}`);
	};

	return {
		search,
		setSearch,
		changePage,
		queryAllCharacters,
		filterCharacters,
		hasResults,
	};
}

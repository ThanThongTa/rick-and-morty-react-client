import { useLazyQuery } from '@apollo/client';
import { filterCharactersQuery } from '../data/filterCharactersQuery';
import { useEffect, useState } from 'react';
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
	const updateFilteredCharacters = useCharactersStore(
		(state) => state.updateFilteredCharacters
	);
	const addToStoredCharacters = useCharactersStore(
		(state) => state.addToStoredCharacters
	);
	/* Werte aus dem Zustand */
	const search = useCharactersStore((state) => state.search);
	const status = useCharactersStore((state) => state.currentlySelectedStatus);
	const species = useCharactersStore((state) => state.currentlySelectedSpecies);
	const type = useCharactersStore((state) => state.currentlySelectedType);
	const gender = useCharactersStore((state) => state.currentlySelectedGender);
	const characters = useCharactersStore((state) => state.characters);
	const count = useCharactersStore((state) => state.count);
	const pages = useCharactersStore((state) => state.pages);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useCharactersStore((state) => state.currentPage);

	/* Hook zum Laden aller Characters */
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		/* Am Ende, setze currentPage auf den Maximalwert zurück */
		if (count != 0 && characters.length === count) {
			setCurrentPage(pages);
			updateFilteredCharacters();
		}
		/* Wenn es einen Count gibt, prüfe ob alle Characters geladen wurden */
		if ((count != 0 && characters.length >= count) || loading) return;
		setLoading(true);
		/* verwendet den Apollo Client, um die Characters der aktuellen Seite zu laden */
		(async () => {
			if (loading) return;
			const res = await refetch({
				page: currentPage,
				name: search,
			});
			const newCharacters = res.data.characters.results;
			addToStoredCharacters(newCharacters);
			setLoading(false);
			/* setzt die aktuelle Seite einen vor */
			setCurrentPage(currentPage + 1);
			/* count ist wichtig, um zu wissen, wann wir alle Episoden geladen haben */
			/* startet auch den Hook neu */
			setCount(res.data.characters.info.count);
			/* setzt die Gesamtanzahl der Seiten */
			setPages(res.data.characters.info.pages);
		})();
	}, [currentPage, count]);

	/* Hook, damit die Suche neu ausgeführt wird, wenn sich ein Filter ändert */
	useEffect(() => {
		query();
	}, [search, status, species, type, gender]);

	/* Lädt die Daten neu und speichert die Werte im Zustand */
	const query = function () {
		updateFilteredCharacters();
	};

	/* LazyLoading der Queries */
	const [, { refetch }] = useLazyQuery(filterCharactersQuery, {
		variables: {
			page: currentPage,
			name: search ?? null,
			status: status === 'all' ? null : status,
			species: species === 'all' ? null : species,
			type: type === 'all' ? null : type,
			gender: gender === 'all' ? null : gender,
		},
	});

	return {
		search,
		setSearch,
		query,
	};
}

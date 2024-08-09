import { useEpisodesStore } from './useEpisodesStore';
import { useLazyQuery } from '@apollo/client';
import { filterEpisodesQuery } from '../data/filterEpisodesQuery';
import { useEffect, useState } from 'react';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useEpisodesQueries() {
	/* Funktionen für den Zustand */
	const setSearch = useEpisodesStore((state) => state.setSearch);
	const updateFilteredEpisodes = useEpisodesStore(
		(state) => state.updateFilteredEpisodes
	);
	const addToStoredEpisodes = useEpisodesStore(
		(state) => state.addToStoredEpisodes
	);
	const setPages = useEpisodesStore((state) => state.setPages);
	const setCount = useEpisodesStore((state) => state.setCount);
	const setCurrentPage = useEpisodesStore((state) => state.setCurrentPage);

	/* Werte aus dem Zustand */
	const search = useEpisodesStore((state) => state.search);
	const pages = useEpisodesStore((state) => state.pages);
	const episodes = useEpisodesStore((state) => state.episodes);
	const count = useEpisodesStore((state) => state.count);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useEpisodesStore((state) => state.currentPage);

	/* Hook zum Laden aller Episoden */
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		/* Am Ende, setze currentPage auf den Maximalwert zurück */
		if (count != 0 && episodes.length === count) {
			setCurrentPage(pages);
			updateFilteredEpisodes();
		}
		/* Wenn es einen Count gibt, prüfe ob alle Episoden geladen wurden */
		if ((count != 0 && episodes.length >= count) || loading) return;
		setLoading(true);
		/* verwendet den Apollo Client, um die Episoden der aktuellen Seite zu laden */
		(async () => {
			if (loading) return;
			const res = await refetch({
				page: currentPage,
				name: search,
			});
			const newEpisodes = res.data.episodes.results;
			addToStoredEpisodes(newEpisodes);
			setLoading(false);
			/* setzt die aktuelle Seite einen vor */
			setCurrentPage(currentPage + 1);
			/* count ist wichtig, um zu wissen, wann wir alle Episoden geladen haben */
			/* startet auch den Hook neu */
			setCount(res.data.episodes.info.count);
			/* setzt die Gesamtanzahl der Seiten */
			setPages(res.data.episodes.info.pages);
		})();
	}, [currentPage, count]);

	/* Hook führt die Suche durch, wenn sich der Suchbegriff ändert */
	useEffect(() => {
		query();
	}, [search]);

	/* Lädt die Daten neu und speichert die Werte im Zustand */
	const query = function () {
		updateFilteredEpisodes();
	};

	/* LazyLoading der Query */
	const [, { refetch }] = useLazyQuery(filterEpisodesQuery, {
		variables: { page: currentPage, name: search },
	});

	return {
		search,
		setSearch,
		query,
	};
}

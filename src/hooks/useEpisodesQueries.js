import { useEpisodesStore } from './useEpisodesStore';
import { useLazyQuery } from '@apollo/client';
import { filterEpisodesQuery } from '../data/filterEpisodesQuery';
import { useEffect } from 'react';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useEpisodesQueries() {
	/* Funktionen für den Zustand */
	const setSearch = useEpisodesStore((state) => state.setSearch);
	const setStoredEpisodes = useEpisodesStore(
		(state) => state.setStoredEpisodes
	);
	const setPages = useEpisodesStore((state) => state.setPages);
	const setCount = useEpisodesStore((state) => state.setCount);
	const setCurrentPage = useEpisodesStore((state) => state.setCurrentPage);

	/* Werte aus dem Zustand */
	const search = useEpisodesStore((state) => state.search);
	const episodes = useEpisodesStore((state) => state.episodes);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useEpisodesStore((state) => state.currentPage);

	/* Hook, damit die Suche neu ausgeführt wird, wenn
	 * sich der Suchbegriff ändert */
	useEffect(() => {
		saveFetchedEpisodes();
	}, [search]);

	/* Lädt die Daten neu und speichert die Werte im Zustand */
	const saveFetchedEpisodes = async function () {
		const res = await refetchEpisodes({
			page: currentPage,
			name: search,
		});
		setStoredEpisodes(res.data.episodes.results);
		setCurrentPage(currentPage);
		setCount(res.data.episodes.info.count);
		setPages(res.data.episodes.info.pages);
	};

	/* LazyLoading der Queries */
	const [, { refetch: refetchEpisodes }] = useLazyQuery(filterEpisodesQuery, {
		variables: { page: currentPage, name: search },
	});

	/* Lädt die Lazy Queries und speichert die Werte im Zustand */
	const queryAllEpisodes = async () => {
		const res = await refetchEpisodes({ page: currentPage });
		setStoredEpisodes(res.data.episodes.results);
		setCurrentPage(currentPage);
		setCount(res.data.episodes.info.count);
		setPages(res.data.episodes.info.pages);
	};
	const queryFilterEpisodes = async () => {
		const res = await refetchEpisodes({ page: currentPage, name: search });
		setStoredEpisodes(res.data.episodes.results);
	};

	/* filtert die Episodes entsprechend des Suchbegriffs */
	const filterEpisodes = () => {
		const term = document.querySelector('.search-input').value;
		if (term.length < 2) return;
		setSearch(term);
		queryFilterEpisodes();
	};

	/* prüft, ob Ergebnisse vorhanden sind */
	const hasResults = () => {
		return episodes.length > 0;
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
		queryAllEpisodes,
		filterEpisodes,
		hasResults,
	};
}

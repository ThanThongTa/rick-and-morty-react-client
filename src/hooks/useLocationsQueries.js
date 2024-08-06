import { useLazyQuery } from '@apollo/client';
import { filterLocationsQuery } from '../data/filterLocationsQuery';
import { useEffect } from 'react';
import { useLocationsStore } from './useLocationsStore';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useLocationsQueries() {
	/* Funktionen für den Zustand */
	const setSearch = useLocationsStore((state) => state.setSearch);
	const setPages = useLocationsStore((state) => state.setPages);
	const setCount = useLocationsStore((state) => state.setCount);
	const search = useLocationsStore((state) => state.search);
	const setCurrentPage = useLocationsStore((state) => state.setCurrentPage);
	const type = useLocationsStore((state) => state.currentlySelectedType);
	const dimension = useLocationsStore(
		(state) => state.currentlySelectedDimension
	);
	const setStoredLocations = useLocationsStore(
		(state) => state.setStoredLocations
	);
	const locations = useLocationsStore((state) => state.locations);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useLocationsStore((state) => state.currentPage);

	useEffect(() => {
		saveFetchedLocations();
	}, [search, type, dimension]);

	const saveFetchedLocations = async function () {
		const res = await refetchLocations({
			page: currentPage,
			name: search,
			type: type === 'all' ? null : type,
			dimension: dimension === 'all' ? null : dimension,
		});
		setStoredLocations(res.data.locations.results);
		setCurrentPage(currentPage);
		setCount(res.data.locations.info.count);
		setPages(res.data.locations.info.pages);
	};

	/* LazyLoading der Queries */
	const [, { refetch: refetchLocations }] = useLazyQuery(filterLocationsQuery, {
		variables: {
			page: currentPage,
			name: search,
			type: type === 'all' ? null : type,
			dimension: dimension === 'all' ? null : dimension,
		},
	});

	/* Lädt die Lazy Queries und speichert die Werte im Zustand */
	const queryAllLocations = async () => {
		const res = await refetchLocations({ page: currentPage });
		setStoredLocations(res.data.locations.results);
		setCurrentPage(currentPage);
		setCount(res.data.locations.info.count);
		setPages(res.data.locations.info.pages);
	};
	const queryFilterLocations = async () => {
		const res = await refetchLocations({ page: currentPage, name: search });
		setStoredLocations(res.data.locations.results);
	};

	/* schaut in die currentSearchCategory und filtert dann die entsprechende Query */
	const filterLocations = () => {
		console.log(`filterLocations`);
		const term = document.querySelector('.search-input').value;
		if (term.length < 2) return;
		setSearch(term);
		queryFilterLocations();
	};

	const hasResults = () => {
		return locations.length > 0;
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
		queryAllLocations,
		filterLocations,
		hasResults,
	};
}

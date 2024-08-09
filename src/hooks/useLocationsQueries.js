import { useLazyQuery } from '@apollo/client';
import { filterLocationsQuery } from '../data/filterLocationsQuery';
import { useEffect, useState } from 'react';
import { useLocationsStore } from './useLocationsStore';

/* Custom Hook für die Verwendung des Apollo Clients
 * verwendet den Hook für den Zustand als State Manager
 */
export function useLocationsQueries() {
	/* Funktionen für den Zustand */
	const setSearch = useLocationsStore((state) => state.setSearch);
	const setPages = useLocationsStore((state) => state.setPages);
	const setCount = useLocationsStore((state) => state.setCount);
	const setCurrentPage = useLocationsStore((state) => state.setCurrentPage);
	const updateFilteredLocations = useLocationsStore(
		(state) => state.updateFilteredLocations
	);
	const addToStoredLocations = useLocationsStore(
		(state) => state.addToStoredLocations
	);

	/* Werte aus dem Zustand */
	const search = useLocationsStore((state) => state.search);
	const count = useLocationsStore((state) => state.count);
	const pages = useLocationsStore((state) => state.pages);
	const locations = useLocationsStore((state) => state.locations);
	const type = useLocationsStore((state) => state.currentlySelectedType);
	const dimension = useLocationsStore(
		(state) => state.currentlySelectedDimension
	);

	/* Diese Werte werden im Hook geändert */
	let currentPage = useLocationsStore((state) => state.currentPage);

	/* Hook zum Laden aller Locations */
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		/* Am Ende, setze currentPage auf den Maximalwert zurück */
		if (count != 0 && locations.length === count) {
			setCurrentPage(pages);
			updateFilteredLocations();
		}
		/* Wenn es einen Count gibt, prüfe ob alle Locations geladen wurden */
		if ((count != 0 && locations.length >= count) || loading) return;
		setLoading(true);
		/* verwendet den Apollo Client, um die Locations der aktuellen Seite zu laden */
		(async () => {
			if (loading) return;
			const res = await refetch({
				page: currentPage,
				name: search,
			});
			const newLocations = res.data.locations.results;
			addToStoredLocations(newLocations);
			setLoading(false);
			/* setzt die aktuelle Seite einen vor */
			setCurrentPage(currentPage + 1);
			/* count ist wichtig, um zu wissen, wann wir alle Episoden geladen haben */
			/* startet auch den Hook neu */
			setCount(res.data.locations.info.count);
			/* setzt die Gesamtanzahl der Seiten */
			setPages(res.data.locations.info.pages);
		})();
	}, [currentPage, count]);

	/* Hook führt die Suche durch, wenn sich der Suchbegriff oder ein Filter ändert */
	useEffect(() => {
		query();
	}, [search, type, dimension]);

	/* Lädt die Daten neu und speichert die Werte im Zustand */
	const query = function () {
		updateFilteredLocations();
	};

	/* LazyLoading der Queries */
	const [, { refetch }] = useLazyQuery(filterLocationsQuery, {
		variables: {
			page: currentPage,
			name: search,
			type: type === 'all' ? null : type,
			dimension: dimension === 'all' ? null : dimension,
		},
	});

	return {
		search,
		setSearch,
		query,
	};
}

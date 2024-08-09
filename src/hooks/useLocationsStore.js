import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';

/* Custom Hook für die Verwendung von Zustand und Immer
 * speichert den Zustand in LocalStorage und lädt ihn wieder
 */
export const useLocationsStore = create()(
	immer((set) => ({
		search: getInitialSearch(),
		count: getInitialCount(),
		pages: getInitialPages(),
		currentPage: getInitialPage(),
		currentlySelectedType: getInitialCurrentlySelectedType(),
		currentlySelectedLocation: getInitialCurrentlySelectedLocation(),
		currentlySelectedDimension: getInitialCurrentlySelectedDimension(),
		locations: getInitialLocations(),
		filteredLocations: getFilteredLocations(),
		/* filtered die Locations noch mal und speichert das Ergebnis im Zustand */
		updateFilteredLocations: () =>
			set((state) => {
				state.filteredLocations = getFilteredLocations();
				updateLocaleStorage(state);
			}),
		/* speichert neue Locations im Zustand und im LocalStorage */
		addToStoredLocations: (newLocations) =>
			set((state) => {
				const currentIds = state.locations.map((location) => location.id);
				for (const newLocation of newLocations) {
					if (currentIds.includes(newLocation.id)) continue;
					state.locations.push(newLocation);
				}
				updateLocaleStorage(state);
			}),
		/* speichert neue Locations im Zustand und im LocalStorage */
		setStoredLocations: (newLocations) =>
			set((state) => {
				state.locations = newLocations;
				updateLocaleStorage(state);
			}),
		/* speichert die Suche im Zustand und im LocalStorage */
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				updateLocaleStorage(state);
			}),
		/* speichert die aktuelle Page im Zustand und im LocalStorage */
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				updateLocaleStorage(state);
			}),
		/* speichert die Anzahl der Locations im Zustand und im LocalStorage */
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				updateLocaleStorage(state);
			}),
		/* speichert die Anzahl der Pages im Zustand und im LocalStorage */
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				updateLocaleStorage(state);
			}),
		/* speichert den Type der aktuellen Location im Zustand und im LocalStorage */
		setCurrentlySelectedType: (newCurrentlySelectedType) =>
			set((state) => {
				state.currentlySelectedType = newCurrentlySelectedType;
				updateLocaleStorage(state);
			}),
		/* speichert die ID der aktuellen Location im Zustand und im LocalStorage */
		setCurrentlySelectedLocation: (newCurrentlySelectedLocation) =>
			set((state) => {
				state.currentlySelectedLocation = newCurrentlySelectedLocation;
				updateLocaleStorage(state);
			}),
		/* speichert die Dimension der aktuellen Location im Zustand und im LocalStorage */
		setCurrentlySelectedDimension: (newCurrentlySelectedDimension) =>
			set((state) => {
				state.currentlySelectedDimension = newCurrentlySelectedDimension;
				updateLocaleStorage(state);
			}),
	}))
);

function updateLocaleStorage(state) {
	localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
}

function loadLocaleStorage() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search;
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt die gespeicherten Locations aus dem LocalStorage
 */
function getInitialLocations() {
	return loadLocaleStorage().locations ?? [];
}

/* Lädt den gespeicherten Suchbegriff aus dem LocalStorage */
function getInitialSearch() {
	return loadLocaleStorage().search ?? '';
}

/* Lädt die gespeicherte aktuelle Page aus dem LocalStorage */
function getInitialPage() {
	return loadLocaleStorage().currentPage ?? 1;
}

/* Lädt die gespeicherte Anzahl der Locations aus dem LocalStorage */
function getInitialCount() {
	return loadLocaleStorage().count ?? 0;
}

/* Lädt die gespeicherte Anzahl der gesamten Pages aus dem LocalStorage */
function getInitialPages() {
	return loadLocaleStorage().pages ?? 1;
}

/* Lädt den ausgewählten Type aus dem LocalStorage */
function getInitialCurrentlySelectedType() {
	return loadLocaleStorage().currentlySelectedType ?? 'all';
}

/* Lädt die ausgewählte ID aus dem LocalStorage */
function getInitialCurrentlySelectedLocation() {
	return loadLocaleStorage().currentlySelectedLocation ?? null;
}

/* Lädt die ausgewählte Dimension aus dem LocalStorage */
function getInitialCurrentlySelectedDimension() {
	return loadLocaleStorage().currentlySelectedDimension ?? 'all';
}

/* Filtert die Episoden nach dem gespeicherten Suchbegriff */
function getFilteredLocations() {
	const search = loadLocaleStorage();
	const noSearchTerm = !search.search || search.search === '';
	const noTypeFilter =
		!search.currentlySelectedType || search.currentlySelectedType === 'all';
	const noDimensionFilter =
		!search.currentlySelectedDimension ||
		search.currentlySelectedDimension === 'all';

	if (!search.locations) return [];

	return search.locations
		.filter(
			(location) =>
				noSearchTerm ||
				location.name.toLowerCase().includes(search.search.toLowerCase())
		)
		.filter(
			(location) =>
				noTypeFilter || location.type === search.currentlySelectedType
		)
		.filter(
			(location) =>
				noDimensionFilter ||
				location.dimension === search.currentlySelectedDimension
		);
}

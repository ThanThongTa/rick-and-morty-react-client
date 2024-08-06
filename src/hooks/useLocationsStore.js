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
		/* speichert neue Locations im Zustand und im LocalStorage */
		setStoredLocations: (newLocations) =>
			set((state) => {
				state.locations = newLocations;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert die Suche im Zustand und im LocalStorage */
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert die aktuelle Page im Zustand und im LocalStorage */
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert die Anzahl der Locations im Zustand und im LocalStorage */
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert die Anzahl der Pages im Zustand und im LocalStorage */
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert den Type der aktuellen Location im Zustand und im LocalStorage */
		setCurrentlySelectedType: (newCurrentlySelectedType) =>
			set((state) => {
				state.currentlySelectedType = newCurrentlySelectedType;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert die ID der aktuellen Location im Zustand und im LocalStorage */
		setCurrentlySelectedLocation: (newCurrentlySelectedLocation) =>
			set((state) => {
				state.currentlySelectedLocation = newCurrentlySelectedLocation;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		/* speichert die Dimension der aktuellen Location im Zustand und im LocalStorage */
		setCurrentlySelectedDimension: (newCurrentlySelectedDimension) =>
			set((state) => {
				state.currentlySelectedDimension = newCurrentlySelectedDimension;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
	}))
);

/* Lädt die gespeicherten Locations aus dem LocalStorage
 */
function getInitialLocations() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.locations ?? [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt den gespeicherten Suchbegriff aus dem LocalStorage */
function getInitialSearch() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.search ?? '';
	} catch (error) {
		console.log(error);
		return '';
	}
}

/* Lädt die gespeicherte aktuelle Page aus dem LocalStorage */
function getInitialPage() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.currentPage ?? 1;
	} catch (error) {
		console.log(error);
		return 1;
	}
}

/* Lädt die gespeicherte Anzahl der Locations aus dem LocalStorage */
function getInitialCount() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.count ?? 0;
	} catch (error) {
		console.log(error);
		return 0;
	}
}

/* Lädt die gespeicherte Anzahl der gesamten Pages aus dem LocalStorage */
function getInitialPages() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.pages ?? 1;
	} catch (error) {
		console.log(error);
		return 1;
	}
}

/* Lädt den ausgewählten Type aus dem LocalStorage */
function getInitialCurrentlySelectedType() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.currentlySelectedType ?? 'all';
	} catch (error) {
		console.log(error);
		return null;
	}
}

/* Lädt die ausgewählte ID aus dem LocalStorage */
function getInitialCurrentlySelectedLocation() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.currentlySelectedLocation ?? null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

/* Lädt die ausgewählte Dimension aus dem LocalStorage */
function getInitialCurrentlySelectedDimension() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Location) || '[]'
		);
		return search.currentlySelectedDimension ?? 'all';
	} catch (error) {
		console.log(error);
		return 'all';
	}
}

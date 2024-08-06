import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';

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
		setStoredLocations: (newLocations) =>
			set((state) => {
				state.locations = newLocations;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		setCurrentlySelectedType: (newCurrentlySelectedType) =>
			set((state) => {
				state.currentlySelectedType = newCurrentlySelectedType;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
		setCurrentlySelectedLocation: (newCurrentlySelectedLocation) =>
			set((state) => {
				state.currentlySelectedLocation = newCurrentlySelectedLocation;
				localStorage.setItem(LocalStorageKeys.Location, JSON.stringify(state));
			}),
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

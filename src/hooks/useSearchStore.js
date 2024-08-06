import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';
import { SearchCategories } from '../globals/SearchCategories';
import { SearchCommands } from '../globals/SearchCommands';

/* Custom Hook für die Verwendung von Zustand und Immer
 * speichert den Zustand in LocalStorage und lädt ihn wieder
 */
export const useSearchStore = create()(
	immer((set) => ({
		search: getInitialSearch(),
		count: getInitialCount(),
		pages: getInitialPages(),
		currentPage: getInitialPage(),
		searchCategory: getInitialSearchCategory(),
		currentSearchCommand: getInitialCurrentSearchCommand(),
		currentlySelectedCharacter: getInitialCurrentlySelectedCharacter(),
		characters: getInitialCharacters(),
		locations: getInitialLocations(),
		episodes: getInitialEpisodes(),
		dispatch: (args) => set((state) => searchReducer(state, args)),
		setStoredCharacters: (newCharacters) =>
			set((state) => {
				state.characters = newCharacters;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setStoredLocations: (newLocations) =>
			set((state) => {
				state.locations = newLocations;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setStoredEpisodes: (newEpisodes) =>
			set((state) => {
				state.episodes = newEpisodes;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setSearchCategory: (newSearchCategory) =>
			set((state) => {
				state.searchCategory = newSearchCategory;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setCurrentSearchCommand: (newCurrentSearchCommand) =>
			set((state) => {
				state.currentSearchCommand = newCurrentSearchCommand;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
		setCurrentlySelectedCharacter: (newCurrentlySelectedCharacter) =>
			set((state) => {
				state.currentlySelectedCharacter = newCurrentlySelectedCharacter;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}),
	}))
);

/* Lädt die gespeicherten Characters aus dem LocalStorage
 */
function getInitialCharacters() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.characters ?? [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt die gespeicherten Locations aus dem LocalStorage
 */
function getInitialLocations() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.locations ?? [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt die gespeicherten Episodes aus dem LocalStorage
 */
function getInitialEpisodes() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.episodes ?? [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

function getInitialSearch() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.pages ?? 1;
	} catch (error) {
		console.log(error);
		return 1;
	}
}

function getInitialCurrentSearchCommand() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.currentSearchCommand ?? '';
	} catch (error) {
		console.log(error);
		return '';
	}
}

function getInitialSearchCategory() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.searchCategory ?? SearchCategories.Characters;
	} catch (error) {
		console.log(error);
		return SearchCategories.Characters;
	}
}

function getInitialCurrentlySelectedCharacter() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Search) || '[]'
		);
		return search.currentlySelectedCharacter ?? null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

/* Reducer für die Zustandsaenderung
 */
function searchReducer(state, { type, data }) {
	switch (type) {
		case SearchCommands.GetAllCharacters:
			if (data && data.characters) {
				state.characters = data.characters.results;
				state.searchCategory = SearchCategories.Characters;
				state.count = data.characters.info.count;
				state.pages = data.characters.info.pages;
				state.currentPage = data.page;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}
			return state;
		case SearchCommands.FilterCharacters:
			if (data && data.characters) {
				state.characters = data.characters.results;
				state.searchCategory = SearchCategories.Characters;
				state.search = data.search;
				state.count = data.characters.info.count;
				state.pages = data.characters.info.pages;
				state.currentPage = data.page;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}
			return state;
		default:
			return state;
	}
}

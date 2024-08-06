import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';

/* Custom Hook für die Verwendung von Zustand und Immer
 * speichert den Zustand in LocalStorage und lädt ihn wieder
 */
export const useCharactersStore = create()(
	immer((set) => ({
		search: getInitialSearch(),
		count: getInitialCount(),
		pages: getInitialPages(),
		currentPage: getInitialPage(),
		currentlySelectedCharacter: getInitialCurrentlySelectedCharacter(),
		currentlySelectedSpecies: getInitialCurrentlySelectedSpecies(),
		currentlySelectedType: getInitialCurrentlySelectedType(),
		currentlySelectedGender: getInitialCurrentlySelectedGender(),
		currentlySelectedStatus: getInitialCurrentlySelectedStatus(),
		characters: getInitialCharacters(),
		setStoredCharacters: (newCharacters) =>
			set((state) => {
				state.characters = newCharacters;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCurrentlySelectedCharacter: (newCurrentlySelectedCharacter) =>
			set((state) => {
				state.currentlySelectedCharacter = newCurrentlySelectedCharacter;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCurrentlySelectedSpecies: (newCurrentlySelectedSpecies) =>
			set((state) => {
				state.currentlySelectedSpecies = newCurrentlySelectedSpecies;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCurrentlySelectedType: (newCurrentlySelectedType) =>
			set((state) => {
				state.currentlySelectedType = newCurrentlySelectedType;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCurrentlySelectedGender: (newCurrentlySelectedGender) =>
			set((state) => {
				state.currentlySelectedGender = newCurrentlySelectedGender;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		setCurrentlySelectedStatus: (newCurrentlySelectedStatus) =>
			set((state) => {
				state.currentlySelectedStatus = newCurrentlySelectedStatus;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
	}))
);

/* Lädt die gespeicherten Characters aus dem LocalStorage
 */
function getInitialCharacters() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.characters ?? [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

function getInitialSearch() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.pages ?? 1;
	} catch (error) {
		console.log(error);
		return 1;
	}
}

function getInitialCurrentlySelectedCharacter() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.currentlySelectedCharacter ?? null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

function getInitialCurrentlySelectedSpecies() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.currentlySelectedSpecies ?? 'all';
	} catch (error) {
		console.log(error);
		return null;
	}
}

function getInitialCurrentlySelectedType() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.currentlySelectedType ?? 'all';
	} catch (error) {
		console.log(error);
		return null;
	}
}

function getInitialCurrentlySelectedGender() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.currentlySelectedGender ?? 'all';
	} catch (error) {
		console.log(error);
		return null;
	}
}

function getInitialCurrentlySelectedStatus() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search.currentlySelectedStatus ?? 'all';
	} catch (error) {
		console.log(error);
		return null;
	}
}

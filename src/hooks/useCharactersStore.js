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
		/* speichert die Characters im Zustand und im LocalStorage */
		setStoredCharacters: (newCharacters) =>
			set((state) => {
				state.characters = newCharacters;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert die Suche im Zustand und im LocalStorage */
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert die aktuelle Page im Zustand und im LocalStorage */
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert die Anzahl der Characters im Zustand und im LocalStorage */
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert die Anzahl der Pages im Zustand und im LocalStorage */
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert die ID des aktuell ausgewählten Characters im Zustand und im LocalStorage */
		setCurrentlySelectedCharacter: (newCurrentlySelectedCharacter) =>
			set((state) => {
				state.currentlySelectedCharacter = newCurrentlySelectedCharacter;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert den ausgewählten Species im Zustand und im LocalStorage */
		setCurrentlySelectedSpecies: (newCurrentlySelectedSpecies) =>
			set((state) => {
				state.currentlySelectedSpecies = newCurrentlySelectedSpecies;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert den ausgewählten Type im Zustand und im LocalStorage */
		setCurrentlySelectedType: (newCurrentlySelectedType) =>
			set((state) => {
				state.currentlySelectedType = newCurrentlySelectedType;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert den ausgewählten Gender im Zustand und im LocalStorage */
		setCurrentlySelectedGender: (newCurrentlySelectedGender) =>
			set((state) => {
				state.currentlySelectedGender = newCurrentlySelectedGender;
				localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
			}),
		/* speichert den ausgewählten Status im Zustand und im LocalStorage */
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

/* Lädt den gespeicherten Suchbegriff aus dem LocalStorage */
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

/* Lädt die gespeicherte aktuelle Page aus dem LocalStorage */
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

/* Lädt die gespeicherte Anzahl der Characters aus dem LocalStorage */
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

/* Lädt die gespeicherte Anzahl der gesamten Pages aus dem LocalStorage */
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

/* Lädt die ID des aktuell ausgewählten Characters aus dem LocalStorage */
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

/* Lädt den ausgewählten Species aus dem LocalStorage */
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

/* Lädt den ausgewählten Type aus dem LocalStorage */
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

/* Lädt den ausgewählten Gender aus dem LocalStorage */
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

/* Lädt den ausgewählten Status aus dem LocalStorage */
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

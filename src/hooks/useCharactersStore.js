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
		filteredCharacters: getFilteredCharacters(),
		/* filtered die Characters noch mal und speichert das Ergebnis im Zustand */
		updateFilteredCharacters: () =>
			set((state) => {
				state.filteredCharacters = getFilteredCharacters();
				updateLocaleStorage(state);
			}),
		/* speichert neue Characters im Zustand und im LocalStorage */
		addToStoredCharacters: (newCharacters) =>
			set((state) => {
				const currentIds = state.characters.map((character) => character.id);
				for (const newCharacter of newCharacters) {
					if (currentIds.includes(newCharacter.id)) continue;
					state.characters.push(newCharacter);
				}
				updateLocaleStorage(state);
			}),
		/* speichert die Characters im Zustand und im LocalStorage */
		setStoredCharacters: (newCharacters) =>
			set((state) => {
				state.characters = newCharacters;
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
		/* speichert die Anzahl der Characters im Zustand und im LocalStorage */
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
		/* speichert die ID des aktuell ausgewählten Characters im Zustand und im LocalStorage */
		setCurrentlySelectedCharacter: (newCurrentlySelectedCharacter) =>
			set((state) => {
				state.currentlySelectedCharacter = newCurrentlySelectedCharacter;
				updateLocaleStorage(state);
			}),
		/* speichert den ausgewählten Species im Zustand und im LocalStorage */
		setCurrentlySelectedSpecies: (newCurrentlySelectedSpecies) =>
			set((state) => {
				state.currentlySelectedSpecies = newCurrentlySelectedSpecies;
				updateLocaleStorage(state);
			}),
		/* speichert den ausgewählten Type im Zustand und im LocalStorage */
		setCurrentlySelectedType: (newCurrentlySelectedType) =>
			set((state) => {
				state.currentlySelectedType = newCurrentlySelectedType;
				updateLocaleStorage(state);
			}),
		/* speichert den ausgewählten Gender im Zustand und im LocalStorage */
		setCurrentlySelectedGender: (newCurrentlySelectedGender) =>
			set((state) => {
				state.currentlySelectedGender = newCurrentlySelectedGender;
				updateLocaleStorage(state);
			}),
		/* speichert den ausgewählten Status im Zustand und im LocalStorage */
		setCurrentlySelectedStatus: (newCurrentlySelectedStatus) =>
			set((state) => {
				state.currentlySelectedStatus = newCurrentlySelectedStatus;
				updateLocaleStorage(state);
			}),
	}))
);

function updateLocaleStorage(state) {
	localStorage.setItem(LocalStorageKeys.Character, JSON.stringify(state));
}

function loadLocaleStorage() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Character) || '[]'
		);
		return search;
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt die gespeicherten Characters aus dem LocalStorage
 */
function getInitialCharacters() {
	return loadLocaleStorage().characters ?? [];
}

/* Lädt den gespeicherten Suchbegriff aus dem LocalStorage */
function getInitialSearch() {
	return loadLocaleStorage().search ?? '';
}

/* Lädt die gespeicherte aktuelle Page aus dem LocalStorage */
function getInitialPage() {
	return loadLocaleStorage().currentPage ?? 1;
}

/* Lädt die gespeicherte Anzahl der Characters aus dem LocalStorage */
function getInitialCount() {
	return loadLocaleStorage().count ?? 0;
}

/* Lädt die gespeicherte Anzahl der gesamten Pages aus dem LocalStorage */
function getInitialPages() {
	return loadLocaleStorage().pages ?? 1;
}

/* Lädt die ID des aktuell ausgewählten Characters aus dem LocalStorage */
function getInitialCurrentlySelectedCharacter() {
	return loadLocaleStorage().currentlySelectedCharacter ?? null;
}

/* Lädt den ausgewählten Species aus dem LocalStorage */
function getInitialCurrentlySelectedSpecies() {
	return loadLocaleStorage().currentlySelectedSpecies ?? 'all';
}

/* Lädt den ausgewählten Type aus dem LocalStorage */
function getInitialCurrentlySelectedType() {
	return loadLocaleStorage().currentlySelectedType ?? 'all';
}

/* Lädt den ausgewählten Gender aus dem LocalStorage */
function getInitialCurrentlySelectedGender() {
	return loadLocaleStorage().currentlySelectedGender ?? 'all';
}

/* Lädt den ausgewählten Status aus dem LocalStorage */
function getInitialCurrentlySelectedStatus() {
	return loadLocaleStorage().currentlySelectedStatus ?? 'all';
}

/* Filtert die Episoden nach dem gespeicherten Suchbegriff */
function getFilteredCharacters() {
	const search = loadLocaleStorage();
	const noSearchTerm = !search.search || search.search === '';
	const noTypeFilter =
		!search.currentlySelectedType || search.currentlySelectedType === 'all';
	const noSpeciesFilter =
		!search.currentlySelectedSpecies ||
		search.currentlySelectedSpecies === 'all';
	const noGenderFilter =
		!search.currentlySelectedGender || search.currentlySelectedGender === 'all';
	const noStatusFilter =
		!search.currentlySelectedStatus || search.currentlySelectedStatus === 'all';

	if (!search.characters) return [];

	return search.characters
		.filter(
			(character) =>
				noSearchTerm ||
				character.name.toLowerCase().includes(search.search.toLowerCase())
		)
		.filter(
			(character) =>
				noTypeFilter || character.type === search.currentlySelectedType
		)
		.filter(
			(character) =>
				noSpeciesFilter || character.species === search.currentlySelectedSpecies
		)
		.filter(
			(character) =>
				noGenderFilter || character.gender === search.currentlySelectedGender
		)
		.filter(
			(character) =>
				noStatusFilter || character.status === search.currentlySelectedStatus
		);
}

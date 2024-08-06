import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';

/* Custom Hook für die Verwendung von Zustand und Immer
 * speichert den Zustand in LocalStorage und lädt ihn wieder
 */
export const useEpisodesStore = create()(
	immer((set) => ({
		search: getInitialSearch(),
		count: getInitialCount(),
		pages: getInitialPages(),
		currentPage: getInitialPage(),
		currentlySelectedEpisode: getInitialCurrentlySelectedEpisode(),
		episodes: getInitialEpisodes(),
		/* speichert neue Episodes im Zustand und im LocalStorage */
		setStoredEpisodes: (newEpisodes) =>
			set((state) => {
				state.episodes = newEpisodes;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		/* speichert die Suche im Zustand und im LocalStorage */
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		/* speichert die aktuelle Page im Zustand und im LocalStorage */
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		/* speichert die Anzahl der Episodes im Zustand und im LocalStorage */
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		/* speichert die Anzahl der Pages im Zustand und im LocalStorage */
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		/* speichert die ID der aktuellen Episode im Zustand und im LocalStorage */
		setCurrentlySelectedEpisode: (newCurrentlySelectedEpisode) =>
			set((state) => {
				state.currentlySelectedEpisode = newCurrentlySelectedEpisode;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
	}))
);

/* Lädt die gespeicherten Episodes aus dem LocalStorage
 */
function getInitialEpisodes() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
		);
		return search.episodes ?? [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt den gespeicherten Suchbegriff aus dem LocalStorage */
function getInitialSearch() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
		);
		return search.currentPage ?? 1;
	} catch (error) {
		console.log(error);
		return 1;
	}
}

/* Lädt die gespeicherte Anzahl der Episodes aus dem LocalStorage */
function getInitialCount() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
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
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
		);
		return search.pages ?? 1;
	} catch (error) {
		console.log(error);
		return 1;
	}
}

/* Lädt die ID der aktuellen Episode aus dem LocalStorage */
function getInitialCurrentlySelectedEpisode() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
		);
		return search.currentlySelectedEpisode ?? null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

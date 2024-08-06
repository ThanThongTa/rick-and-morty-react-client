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
		setStoredEpisodes: (newEpisodes) =>
			set((state) => {
				state.episodes = newEpisodes;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		setCurrentSearchCommand: (newCurrentSearchCommand) =>
			set((state) => {
				state.currentSearchCommand = newCurrentSearchCommand;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		setCount: (newCount) =>
			set((state) => {
				state.count = newCount;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
		setPages: (newPages) =>
			set((state) => {
				state.pages = newPages;
				localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
			}),
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

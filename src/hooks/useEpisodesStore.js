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
		filteredEpisodes: getFilteredEpisodes(),
		/* filtered die Episoden noch mal und speichert das Ergebnis im Zustand */
		updateFilteredEpisodes: () =>
			set((state) => {
				state.filteredEpisodes = getFilteredEpisodes();
				updateLocaleStorage(state);
			}),
		/* speichert neue Episodes im Zustand und im LocalStorage */
		setStoredEpisodes: (newEpisodes) =>
			set((state) => {
				state.episodes = newEpisodes;
				updateLocaleStorage(state);
			}),
		addToStoredEpisodes: (newEpisodes) =>
			set((state) => {
				const currentIds = state.episodes.map((episode) => episode.id);
				for (const newEpisode of newEpisodes) {
					if (currentIds.includes(newEpisode.id)) continue;
					state.episodes.push(newEpisode);
				}
				updateLocaleStorage(state);
			}),
		/* speichert die Suche im Zustand und im LocalStorage */
		setSearch: (newSearch) =>
			set((state) => {
				state.search = newSearch;
				state.currentPage = 1;
				updateLocaleStorage(state);
			}),
		/* speichert die aktuelle Page im Zustand und im LocalStorage */
		setCurrentPage: (newCurrentPage) =>
			set((state) => {
				state.currentPage = newCurrentPage;
				updateLocaleStorage(state);
			}),
		/* speichert die Anzahl der Episodes im Zustand und im LocalStorage */
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
		/* speichert die ID der aktuellen Episode im Zustand und im LocalStorage */
		setCurrentlySelectedEpisode: (newCurrentlySelectedEpisode) =>
			set((state) => {
				state.currentlySelectedEpisode = newCurrentlySelectedEpisode;
				updateLocaleStorage(state);
			}),
	}))
);

function updateLocaleStorage(state) {
	localStorage.setItem(LocalStorageKeys.Episode, JSON.stringify(state));
}

function loadLocaleStorage() {
	try {
		const search = JSON.parse(
			localStorage.getItem(LocalStorageKeys.Episode) || '[]'
		);
		return search;
	} catch (error) {
		console.log(error);
		return [];
	}
}

/* Lädt die gespeicherten Episodes aus dem LocalStorage
 */
function getInitialEpisodes() {
	return loadLocaleStorage().episodes ?? [];
}

/* Lädt den gespeicherten Suchbegriff aus dem LocalStorage */
function getInitialSearch() {
	return loadLocaleStorage().search ?? '';
}

/* Lädt die gespeicherte aktuelle Page aus dem LocalStorage */
function getInitialPage() {
	return loadLocaleStorage().currentPage ?? 1;
}

/* Lädt die gespeicherte Anzahl der Episodes aus dem LocalStorage */
function getInitialCount() {
	return loadLocaleStorage().count ?? 0;
}

/* Lädt die gespeicherte Anzahl der gesamten Pages aus dem LocalStorage */
function getInitialPages() {
	return loadLocaleStorage().pages ?? 1;
}

/* Lädt die ID der aktuellen Episode aus dem LocalStorage */
function getInitialCurrentlySelectedEpisode() {
	return loadLocaleStorage().currentlySelectedEpisode ?? null;
}

/* Filtert die Episoden nach dem gespeicherten Suchbegriff */
function getFilteredEpisodes() {
	const search = loadLocaleStorage();

	if (!search.episodes) return [];
	if (!search.search) return search.episodes;

	return search.episodes.filter((episode) =>
		episode.name.toLowerCase().includes(search.search.toLowerCase())
	);
}

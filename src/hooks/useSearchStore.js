import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LocalStorageKeys } from '../globals/LocalStorageKeys';
import { SearchCategories } from '../globals/SearchCategories';
import { SearchCommands } from '../globals/SearchCommands';

export const useSearchStore = create()(
	immer((set) => ({
		search: '',
		count: 0,
		pages: 1,
		currentPage: 1,
		searchCategory: SearchCategories.Characters,
		currentSearchCommand: '',
		characters: getInitialCharacters(),
		locations: getInitialLocations(),
		episodes: getInitialEpisodes(),
		dispatch: (args) => set((state) => searchReducer(state, args)),
	}))
);

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

function searchReducer(state, { type, data }) {
	switch (type) {
		case SearchCommands.GetAllCharacters:
			if (data && data.characters) {
				state.characters = data.characters.results;
				state.searchCategory = SearchCategories.Characters;
				state.count = data.characters.info.count;
				state.pages = data.characters.info.pages;
				state.currentPage = 1;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}
			return state;
		case SearchCommands.FilterCharacters:
			if (data && data.characters) {
				state.searchCategory = SearchCategories.Characters;
				state.search = data.search;
				state.count = data.characters.info.count;
				state.pages = data.characters.info.pages;
				// state.characters = data.characters.results;
				state.currentPage = data.page;
				localStorage.setItem(LocalStorageKeys.Search, JSON.stringify(state));
			}
			return state;
		default:
			return state;
	}
}

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ThemeCategories } from '../globals/ThemeCategories';

/* Custom Hook für die Verwendung von Zustand und Immer
 * speichert den Zustand in LocalStorage und lädt ihn wieder */
export const useThemeStore = create()(
	immer((set) => ({
		theme: ThemeCategories.Dark,
		dispatch: (args) => set((state) => themeReducer(state, args)),
	}))
);

function themeReducer(state, { type }) {
	switch (type) {
		default:
			return state;
	}
}

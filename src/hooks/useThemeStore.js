import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ThemeCategories } from '../globals/ThemeCategories';

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

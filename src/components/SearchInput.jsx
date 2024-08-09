import { Input, SearchField } from 'react-aria-components';
import { useState } from 'react';

import { useEpisodesQueries } from '../hooks/useEpisodesQueries';
import { useSearchCategoryQueries } from '../hooks/useSearchCategoryQueries';
import { useCharactersQueries } from '../hooks/useCharactersQueries';
import { useLocationsQueries } from '../hooks/useLocationsQueries';
import { SearchCategories } from '../globals/SearchCategories';

/* Komponente für die Eingabe des Suchbegriffs */
export default function SearchInput() {
	const { currentSearchCategory } = useSearchCategoryQueries();
	const { setSearch: setSearchEpisode, search: searchEpisode } =
		useEpisodesQueries();
	const { setSearch: setSearchCharacter, search: searchCharacter } =
		useCharactersQueries();
	const { setSearch: setSearchLocation, search: searchLocation } =
		useLocationsQueries();

	const getInitialSearch = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				return searchEpisode;
			case SearchCategories.Characters:
				return searchCharacter;
			case SearchCategories.Locations:
				return searchLocation;
			default:
				return '';
		}
	};

	const [search, setSearch] = useState(getInitialSearch());

	const setSearchTerm = (e) => {
		const term = e.target.value;
		setSearch(term);
		switch (currentSearchCategory) {
			case SearchCategories.Characters:
				setSearchCharacter(term);
				break;
			case SearchCategories.Episodes:
				setSearchEpisode(term);
				break;
			case SearchCategories.Locations:
				setSearchLocation(term);
				break;
		}
	};

	return (
		<section className="search-inputs search-parameters-section section-wrapper">
			<SearchField className="search-inputs__search-field" aria-label="Search">
				<span className="search-inputs__label">Search Input</span>
				<Input
					className="search-input"
					placeholder="Search"
					value={search}
					onChange={setSearchTerm}
				/>
			</SearchField>
		</section>
	);
}

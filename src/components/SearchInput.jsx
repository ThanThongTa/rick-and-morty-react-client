import { Button, Input, Label } from 'react-aria-components';
import { useEpisodesQueries } from '../hooks/useEpisodesQueries';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useLocationsQueries } from '../hooks/useLocationsQueries';
import { useCharactersQueries } from '../hooks/useCharactersQueries';

/* Komponente für die Eingabe des Suchbegriffs */
export default function SearchInput() {
	const {
		search: searchEpisodes,
		setSearch: setSearchEpisodes,
		queryAllEpisodes,
		filterEpisodes,
	} = useEpisodesQueries();
	const {
		search: searchLocations,
		setSearch: setSearchLocations,
		queryAllLocations,
		filterLocations,
	} = useLocationsQueries();
	const {
		search: searchCharacters,
		setSearch: setSearchCharacters,
		queryAllCharacters,
		filterCharacters,
	} = useCharactersQueries();
	const currentSearchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	const query = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				queryAllEpisodes();
				break;
			case SearchCategories.Characters:
				queryAllCharacters();
				break;
			case SearchCategories.Locations:
				queryAllLocations();
				break;
			default:
				break;
		}
	};

	const filter = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				filterEpisodes();
				break;
			case SearchCategories.Characters:
				filterCharacters();
				break;
			case SearchCategories.Locations:
				filterLocations();
				break;
			default:
				break;
		}
	};

	const updateSearchTerm = (e) => {
		const term = e.target.value;
		if (term.length < 2) return;
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				setSearchEpisodes(term);
				break;
			case SearchCategories.Characters:
				setSearchCharacters(term);
				break;
			case SearchCategories.Locations:
				setSearchLocations(term);
				break;
			default:
				break;
		}
	};

	const getSearchTerm = () => {
		switch (currentSearchCategory) {
			case SearchCategories.Episodes:
				return searchEpisodes;
			case SearchCategories.Characters:
				return searchCharacters;
			case SearchCategories.Locations:
				return searchLocations;
			default:
				break;
		}
	};

	return (
		<section className="search-inputs search-parameters-section">
			<Label className="Search Input">Search Input</Label>
			<Button
				aria-label="Show all"
				className="show-all-button button--ghost"
				excludeFromTabOrder={false}
				onPress={() => query()}
			>
				Show all
			</Button>
			<Input
				className="search-input"
				placeholder="Search"
				value={getSearchTerm()}
				onChange={updateSearchTerm}
			/>
			<Button
				type="button"
				aria-label="Search"
				className="search-button button--ghost"
				excludeFromTabOrder={false}
				onPress={() => filter()}
			>
				Search
			</Button>
		</section>
	);
}

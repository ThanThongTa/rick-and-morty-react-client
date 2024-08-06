import { Button, Input, Label } from 'react-aria-components';
import { useSearchQueries } from '../hooks/useSearchQueries';
import { useEpisodesQueries } from '../hooks/useEpisodesQueries';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { SearchCategories } from '../globals/SearchCategories';

/* Komponente für die Eingabe des Suchbegriffs */
export default function SearchInput() {
	const { search, setSearch, queryAll, filterAll } = useSearchQueries();
	const {
		setSearch: setSearchEpisodes,
		queryAllEpisodes,
		filterEpisodes,
	} = useEpisodesQueries();
	const currentSearchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	const query = () => {
		if (currentSearchCategory === SearchCategories.Episodes) {
			queryAllEpisodes();
			console.log('queryAllEpisodes');
		} else {
			queryAll();
		}
	};

	const filter = () => {
		if (currentSearchCategory === SearchCategories.Episodes) {
			filterEpisodes();
			console.log('filterEpisodes');
		} else {
			filterAll();
		}
	};

	const updateSearchTerm = (e) => {
		const term = e.target.value;
		if (term.length < 2) return;
		if (currentSearchCategory === SearchCategories.Episodes) {
			setSearchEpisodes(term);
		} else {
			setSearch(term);
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
				value={search}
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

import { useEffect } from 'react';
import { Button, Input, Label } from 'react-aria-components';
import { useSearchQueries } from '../hooks/useSearchQueries';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

/* Komponente für die Eingabe des Suchbegriffs */
export default function SearchInput() {
	const { search, setSearch, queryAll, filterAll } = useSearchQueries();

	const debouncedSearchTerm = useDebouncedValue(search, 600);

	useEffect(() => {
		if (debouncedSearchTerm.length < 2) return;
		filterAll(debouncedSearchTerm);
	}, [debouncedSearchTerm, filterAll]);

	return (
		<section className="search-inputs search-parameters-section">
			<Label className="Search Input">Search Input</Label>
			<Button
				aria-label="Show all"
				className="show-all-button button--ghost"
				excludeFromTabOrder={false}
				onPress={() => queryAll()}
			>
				Show all
			</Button>
			<Input
				className="search-input"
				placeholder="Search"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<Button
				type="button"
				aria-label="Search"
				className="search-button button--ghost"
				excludeFromTabOrder={false}
				onPress={() => filterAll()}
			>
				Search
			</Button>
		</section>
	);
}

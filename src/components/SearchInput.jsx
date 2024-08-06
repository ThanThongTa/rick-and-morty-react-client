import { Button, Input, Label } from 'react-aria-components';
import { useSearchCategoryQueries } from '../hooks/useSelectInputs';

/* Komponente für die Eingabe des Suchbegriffs */
export default function SearchInput() {
	const { getSearchTerm, updateSearchTerm, query, filter } =
		useSearchCategoryQueries();

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

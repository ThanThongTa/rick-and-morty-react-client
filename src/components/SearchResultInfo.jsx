import { Heading } from 'react-aria-components';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { useSearchCategoryQueries } from '../hooks/useSelectInputs';

/* Komponente für die Anzeige von Basic Infos der Suchergebnisse */
export default function SearchResultInfo() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);
	const { currentPage, pages, count } = useSearchCategoryQueries();

	return (
		<section className="search-results__info search-results__section">
			<Heading level="4">Search Results Info</Heading>
			<p>{`${searchCategory} Page ${currentPage} of ${pages} with ${count} results`}</p>
			<p>ProgressBar</p>
			<p>Pagination</p>
		</section>
	);
}

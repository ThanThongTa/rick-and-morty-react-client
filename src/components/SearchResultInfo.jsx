import { Heading } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { useEpisodesStore } from '../hooks/useEpisodesStore';
import { SearchCategories } from '../globals/SearchCategories';

/* Komponente für die Anzeige von Basic Infos der Suchergebnisse */
export default function SearchResultInfo() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);
	let pages = useSearchStore((state) => state.pages);
	let count = useSearchStore((state) => state.count);
	let currentPage = useSearchStore((state) => state.currentPage);
	if (searchCategory === SearchCategories.Episodes) {
		pages = useEpisodesStore((state) => state.pages);
		count = useEpisodesStore((state) => state.count);
		currentPage = useEpisodesStore((state) => state.currentPage);
	}

	return (
		<section className="search-results__info search-results__section">
			<Heading level="4">Search Results Info</Heading>
			<p>{`${searchCategory} Page ${currentPage} of ${pages} with ${count} results`}</p>
			<p>ProgressBar</p>
			<p>Pagination</p>
		</section>
	);
}

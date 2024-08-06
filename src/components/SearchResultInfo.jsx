import { Heading } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';

/* Komponente für die Anzeige von Basic Infos der Suchergebnisse */
export default function SearchResultInfo() {
	const pages = useSearchStore((state) => state.pages);
	const count = useSearchStore((state) => state.count);
	const currentPage = useSearchStore((state) => state.currentPage);

	return (
		<section className="search-results__info search-results__section">
			<Heading level="4">Search Results Info</Heading>
			<p>{`Page ${currentPage} of ${pages} with ${count} results`}</p>
			<p>ProgressBar</p>
			<p>Pagination</p>
		</section>
	);
}

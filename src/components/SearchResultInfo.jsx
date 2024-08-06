import { Heading } from 'react-aria-components';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { useEpisodesStore } from '../hooks/useEpisodesStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useLocationsStore } from '../hooks/useLocationsStore';
import { useCharactersStore } from '../hooks/useCharactersStore';

/* Komponente für die Anzeige von Basic Infos der Suchergebnisse */
export default function SearchResultInfo() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);
	let pages = 0;
	let count = 0;
	let currentPage = 0;
	const LocPages = useLocationsStore((state) => state.pages);
	const LocCount = useLocationsStore((state) => state.count);
	const LocCurrentPage = useLocationsStore((state) => state.currentPage);
	const EpiPages = useEpisodesStore((state) => state.pages);
	const EpiCount = useEpisodesStore((state) => state.count);
	const EpiCurrentPage = useEpisodesStore((state) => state.currentPage);
	const CharPages = useCharactersStore((state) => state.pages);
	const CharCount = useCharactersStore((state) => state.count);
	const CharCurrentPage = useCharactersStore((state) => state.currentPage);
	switch (searchCategory) {
		case SearchCategories.Characters:
			pages = CharPages;
			count = CharCount;
			currentPage = CharCurrentPage;
			break;
		case SearchCategories.Episodes:
			pages = EpiPages;
			count = EpiCount;
			currentPage = EpiCurrentPage;
			break;
		case SearchCategories.Locations:
			pages = LocPages;
			count = LocCount;
			currentPage = LocCurrentPage;
			break;
		default:
			break;
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

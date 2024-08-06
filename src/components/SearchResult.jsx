import { useSearchQueries } from '../hooks/useSearchQueries';
import SearchResultDetails from './SearchResultDetails';
import SearchResultFilter from './SearchResultFilter';
import SearchResultImages from './SearchResultImages';
import SearchResultInfo from './SearchResultInfo';
import SearchResultList from './SearchResultList';

/* Komponente für die Anzeige der Suchergebnisse */
export default function SearchResult() {
	const { hasResults } = useSearchQueries();
	return (
		<section className="search-results">
			<SearchResultFilter />
			<SearchResultInfo />
			<SearchResultList />
			{hasResults() && (
				<section>
					<SearchResultDetails />
					<SearchResultImages />
				</section>
			)}
		</section>
	);
}

import SearchResultDetails from './SearchResultDetails';
import SearchResultFilter from './SearchResultFilter';
import SearchResultImages from './SearchResultImages';
import SearchResultList from './SearchResultList';

/* Komponente für die Anzeige der Suchergebnisse */
export default function SearchResult() {
	return (
		<section className="search-results">
			<SearchResultFilter />
			<SearchResultList />
			<SearchResultDetails />
			<SearchResultImages />
		</section>
	);
}

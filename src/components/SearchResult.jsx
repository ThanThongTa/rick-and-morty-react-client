import { useSearchStore } from '../hooks/useSearchStore';
import SearchResultDetails from './SearchResultDetails';
import SearchResultFilter from './SearchResultFilter';
import SearchResultImages from './SearchResultImages';
import SearchResultInfo from './SearchResultInfo';
import SearchResultList from './SearchResultList';

/* Komponente für die Anzeige der Suchergebnisse */
export default function SearchResult() {
	const characters = useSearchStore((state) => state.characters);

	return (
		<section className="search-results">
			<SearchResultFilter />
			<SearchResultInfo />
			<SearchResultList />
			{characters && characters.length > 0 && (
				<section>
					<SearchResultDetails />
					<SearchResultImages />
				</section>
			)}
		</section>
	);
}

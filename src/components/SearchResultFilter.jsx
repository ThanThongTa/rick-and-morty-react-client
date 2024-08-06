/* Komponente für die Anzeige der Filter für die Suchergebnisse */
import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import CharacterResultFilters from './CharacterResultFilters';
import LocationResultFilters from './LocationResultFilters';

export default function SearchResultFilter() {
	const searchCategory = useSearchStore((state) => state.searchCategory);

	//Strategy für Filter nach Kategorien
	return (
		<>
			<section className="search-results__filters search-results__section">
				{searchCategory === SearchCategories.Characters && (
					<CharacterResultFilters />
				)}
				{searchCategory === SearchCategories.Episodes &&
					` Episodes: No special filters for episodes `}
				{searchCategory === SearchCategories.Locations && (
					<LocationResultFilters />
				)}
				<br />
			</section>
		</>
	);
}

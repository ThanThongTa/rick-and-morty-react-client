import { SearchCategories } from '../globals/SearchCategories';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import CharacterResultFilters from './CharacterResultFilters';
import LocationResultFilters from './LocationResultFilters';

/* Komponente für die Anzeige der Filter für die Suchergebnisse */
export default function SearchResultFilter() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	return (
		<>
			{(searchCategory === SearchCategories.Characters ||
				searchCategory === SearchCategories.Locations) && (
				<section className="search-results__filters search-results__section">
					{searchCategory === SearchCategories.Characters && (
						<CharacterResultFilters />
					)}
					{searchCategory === SearchCategories.Locations && (
						<LocationResultFilters />
					)}
					<br />
				</section>
			)}
		</>
	);
}

/* Komponente für die Anzeige der Filter für die Suchergebnisse */
import { SearchCategories } from '../globals/SearchCategories';
import CharacterResultFilters from './CharacterResultFilters';
import LocationResultFilters from './LocationResultFilters';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { Heading } from 'react-aria-components';

/* Komponente für die Anzeige der Filter für die Suchergebnisse */
export default function SearchResultFilter() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	return (
		<>
			<section className="search-results__filters search-results__section">
				{searchCategory === SearchCategories.Characters && (
					<CharacterResultFilters />
				)}
				{searchCategory === SearchCategories.Episodes && (
					<section className="location-filters-wrapper">
						<Heading level="4">Location Filters</Heading>
						Episodes: No special filters for episodes
					</section>
				)}
				{searchCategory === SearchCategories.Locations && (
					<LocationResultFilters />
				)}
				<br />
			</section>
		</>
	);
}

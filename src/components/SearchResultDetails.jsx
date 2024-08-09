import { SearchCategories } from '../globals/SearchCategories';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import CharacterResultDetails from './CharacterResultDetails';
import LocationResultDetails from './LocationResultDetails';
import EpisodeResultDetails from './EpisodeResultDetails';

/* Komponente für die Anzeige von Details der Suchergebnisse */
export default function SearchResultDetails() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	return (
		<section className="search-results__details search-results__section">
			{searchCategory === SearchCategories.Characters && (
				<CharacterResultDetails />
			)}
			{searchCategory === SearchCategories.Locations && (
				<LocationResultDetails />
			)}
			{searchCategory === SearchCategories.Episodes && <EpisodeResultDetails />}
		</section>
	);
}

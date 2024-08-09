import { SearchCategories } from '../globals/SearchCategories';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import LocationResultImages from './LocationResultImages';
import EpisodeResultImages from './EpisodeResultImages';

/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);

	return (
		(searchCategory === SearchCategories.Locations ||
			searchCategory === SearchCategories.Episodes) && (
			<section className="search-results__images search-results__section">
				{searchCategory === SearchCategories.Locations && (
					<LocationResultImages />
				)}
				{searchCategory === SearchCategories.Episodes && (
					<EpisodeResultImages />
				)}
			</section>
		)
	);
}

import { SearchCategories } from '../globals/SearchCategories';
import CharacterResultList from './CharacterResultList';
import LocationResultList from './LocationResultList';
import EpisodeResultList from './EpisodeResultList';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';

/* Komponente für die Anzeige der Suchergebnisse als Liste */
export default function SearchResultList() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);
	return (
		<section className="search-results__list search-results__section">
			{searchCategory === SearchCategories.Characters && (
				<CharacterResultList />
			)}
			{searchCategory === SearchCategories.Locations && <LocationResultList />}
			{searchCategory === SearchCategories.Episodes && <EpisodeResultList />}
		</section>
	);
}

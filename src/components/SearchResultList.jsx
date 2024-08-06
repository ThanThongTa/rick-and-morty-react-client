import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import CharacterResultList from './CharacterResultList';
import LocationResultList from './LocationResultList';
import EpisodeResultList from './EpisodeResultList';
import { useSearchQueries } from '../hooks/useSearchQueries';

/* Komponente für die Anzeige der Suchergebnisse als Liste */
export default function SearchResultList() {
	const searchCategory = useSearchStore((state) => state.searchCategory);
	const { hasResults } = useSearchQueries();
	return (
		<>
			{hasResults() && (
				<section className="search-results__list search-results__section">
					{searchCategory === SearchCategories.Characters && (
						<CharacterResultList />
					)}
					{searchCategory === SearchCategories.Locations && (
						<LocationResultList />
					)}
					{searchCategory === SearchCategories.Episodes && (
						<EpisodeResultList />
					)}
				</section>
			)}
		</>
	);
}

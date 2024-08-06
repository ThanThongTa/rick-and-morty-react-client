/* Komponente für die Anzeige von Details der Suchergebnisse */
import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import CharacterResultDetails from './CharacterResultDetails';
import LocationResultDetails from './LocationResultDetails';
import EpisodeResultDetails from './EpisodeResultDetails';

export default function SearchResultDetails() {
	const searchCategory = useSearchStore((state) => state.searchCategory);

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

import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useSearchQueries } from '../hooks/useSearchQueries';
import { Button } from 'react-aria-components';
import { useEpisodesStore } from '../hooks/useEpisodesStore';

/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	const searchCategory = useSearchStore((state) => state.searchCategory);
	const characters = useSearchStore((state) => state.characters);
	const setSelected = useSearchStore(
		(state) => state.setCurrentlySelectedCharacter
	);

	const selectedLocationId = useSearchStore(
		(state) => state.currentlySelectedLocation
	);
	const locations = useSearchStore((state) => state.locations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);

	const selectedEpisodeId = useSearchStore(
		(state) => state.currentlySelectedEpisode
	);
	const episodes = useEpisodesStore((state) => state.episodes);
	const selectedEpisode = episodes.find(
		(location) => location.id === selectedEpisodeId
	);
	const { hasResults } = useSearchQueries();
	//Visitor für GetImages
	return (
		<>
			{hasResults() && (
				<section className="search-results__images search-results__section">
					{searchCategory === SearchCategories.Characters &&
						characters.map((character) => (
							<Button
								key={character.id}
								onPress={() => setSelected(character.id)}
								onFocus={() => setSelected(character.id)}
							>
								<img
									src={character.image}
									alt={character.name}
									width={40}
									height={40}
								/>
							</Button>
						))}
					{searchCategory === SearchCategories.Locations &&
						selectedLocation &&
						selectedLocation.residents &&
						selectedLocation.residents.map((character) => (
							<img
								key={character.id}
								src={character.image}
								alt={character.name}
								width={40}
								height={40}
							/>
						))}
					{searchCategory === SearchCategories.Episodes &&
						selectedEpisode &&
						selectedEpisode.characters &&
						selectedEpisode.characters.map((character) => (
							<img
								key={character.id}
								src={character.image}
								alt={character.name}
								width={40}
								height={40}
							/>
						))}
				</section>
			)}
		</>
	);
}

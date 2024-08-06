import { SearchCategories } from '../globals/SearchCategories';
import { Button } from 'react-aria-components';
import { useEpisodesStore } from '../hooks/useEpisodesStore';
import { useLocationsStore } from '../hooks/useLocationsStore';
import { useSearchCategoryStore } from '../hooks/useSearchCategoryStore';
import { useCharactersStore } from '../hooks/useCharactersStore';

/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	const searchCategory = useSearchCategoryStore(
		(state) => state.searchCategory
	);
	const characters = useCharactersStore((state) => state.characters);
	const setSelected = useCharactersStore(
		(state) => state.setCurrentlySelectedCharacter
	);

	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);
	const locations = useLocationsStore((state) => state.locations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);

	const selectedEpisodeId = useEpisodesStore(
		(state) => state.currentlySelectedEpisode
	);
	const episodes = useEpisodesStore((state) => state.episodes);
	const selectedEpisode = episodes.find(
		(location) => location.id === selectedEpisodeId
	);
	//Visitor für GetImages
	return (
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
	);
}

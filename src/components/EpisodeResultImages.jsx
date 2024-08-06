import React from 'react';
import { useEpisodesStore } from '../hooks/useEpisodesStore';
import { Heading } from 'react-aria-components';

/* Komponente für die Anzeige der Bilder der ausgewählten Episode */
export default function EpisodeResultImages() {
	const selectedEpisodeId = useEpisodesStore(
		(state) => state.currentlySelectedEpisode
	);
	const episodes = useEpisodesStore((state) => state.episodes);
	const selectedEpisode = episodes.find(
		(location) => location.id === selectedEpisodeId
	);
	return (
		selectedEpisode && (
			<section className="episode-images">
				<Heading level="4">
					Characters in Episode {selectedEpisode.episode}
				</Heading>
				{selectedEpisode.characters &&
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
		)
	);
}

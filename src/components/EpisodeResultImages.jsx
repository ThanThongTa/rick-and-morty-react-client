import { useEpisodesStore } from '../hooks/useEpisodesStore';

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
			<section className="episode-images section-wrapper">
				<span className="episode-images__heading section-label">
					Characters in Episode{' '}
					<span className="episode__label">{selectedEpisode.episode}</span>
				</span>
				<section className="episode-images__wrapper">
					{selectedEpisode.characters &&
						selectedEpisode.characters.map((character) => (
							<section key={character.id} className="episode-images__item">
								<img
									className="episode-image"
									key={character.id}
									src={character.image}
									alt={character.name}
								/>
								{character.name}
							</section>
						))}
				</section>
			</section>
		)
	);
}

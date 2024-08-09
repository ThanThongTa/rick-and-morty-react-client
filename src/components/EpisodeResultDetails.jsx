import { useEpisodesStore } from '../hooks/useEpisodesStore';

/* Komponente für die Anzeige der Episode Details */
export default function EpisodeResultDetails() {
	/* ermitteln der ID der aktuell ausgewählten Episode */
	const selectedEpisodeId = useEpisodesStore(
		(state) => state.currentlySelectedEpisode
	);
	/* ermitteln der ausgewählten Episode */
	const episodes = useEpisodesStore((state) => state.episodes);
	const selectedEpisode = episodes.find(
		(episode) => episode.id === selectedEpisodeId
	);

	return (
		selectedEpisode && (
			<section className="episode-details-wrapper section-wrapper">
				<span className="episode-details__heading section-label">
					Episode Details
				</span>
				<section className="episode-details">
					<p>
						<span className={'episode-details__label'}>Name: </span>
						<span className={'episode-details__value'}>
							{selectedEpisode.name}
						</span>
					</p>
					<p>
						<span className={'episode-details__label'}>Air Date: </span>
						<span className={'episode-details__value'}>
							{selectedEpisode.air_date}
						</span>
					</p>
					<p>
						<span className={'episode-details__label'}>Episode: </span>
						<span className={'episode-details__value'}>
							{selectedEpisode.episode}
						</span>
					</p>
				</section>
			</section>
		)
	);
}

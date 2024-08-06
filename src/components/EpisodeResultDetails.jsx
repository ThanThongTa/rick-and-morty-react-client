import { Heading, Label } from 'react-aria-components';
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
			<section className="episode-details-wrapper">
				<Heading level="4">Episode Details</Heading>
				<section className="episode-details">
					<p>
						<Label>Name: </Label>
						{selectedEpisode.name}
					</p>
					<p>
						<Label>Air Date: </Label>
						{selectedEpisode.air_date}
					</p>
					<p>
						<Label>Episode: </Label>
						{selectedEpisode.episode}
					</p>
				</section>
			</section>
		)
	);
}

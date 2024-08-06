import { Heading, Label } from 'react-aria-components';
import { useEpisodesStore } from '../hooks/useEpisodesStore';

export default function EpisodeResultDetails() {
	const selectedEpisodeId = useEpisodesStore(
		(state) => state.currentlySelectedEpisode
	);
	const episodes = useEpisodesStore((state) => state.episodes);
	const selectedEpisode = episodes.find(
		(location) => location.id === selectedEpisodeId
	);

	return (
		<>
			{selectedEpisode && (
				<div>
					<Heading level="4">Episode Details</Heading>
					<div>
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
					</div>
				</div>
			)}
		</>
	);
}

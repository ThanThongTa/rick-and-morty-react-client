import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useEpisodesStore } from '../hooks/useEpisodesStore';

/* Komponente für die Anzeige der Episoden Liste */
export default function EpisodeResultList() {
	/* Laden der Episoden */
	const episodes = useEpisodesStore((state) => state.episodes);
	/* Funktion zum Auswählen einer Episode */
	const setSelected = useEpisodesStore(
		(state) => state.setCurrentlySelectedEpisode
	);

	return (
		episodes &&
		episodes.length > 0 && (
			<section className="episode-list episode-list__section">
				<Heading level="4" className="episode-list__heading">
					Episode List{' '}
				</Heading>
				<ListBox
					aria-label="Episodes List"
					selectionMode="single"
					onSelectionChange={(event) => {
						setSelected(event.currentKey);
					}}
				>
					{episodes.map((episode) => (
						<ListBoxItem
							key={episode.id}
							textValue={episode.name}
							id={episode.id}
						>
							{episode.episode}: {episode.name}
						</ListBoxItem>
					))}
				</ListBox>
			</section>
		)
	);
}

import { useEpisodesStore } from '../hooks/useEpisodesStore';
import TextRadioGroup from './TextRadioGroup';

/* Komponente für die Anzeige der Episoden Liste */
export default function EpisodeResultList() {
	/* Laden der Episoden */
	const episodes = useEpisodesStore((state) => state.filteredEpisodes);
	/* Funktion zum Auswählen einer Episode */
	const setSelected = useEpisodesStore(
		(state) => state.setCurrentlySelectedEpisode
	);
	/* ermitteln der ID der aktuell ausgewählten Episode */
	const selectedEpisodeId = useEpisodesStore(
		(state) => state.currentlySelectedEpisode
	);

	return (
		episodes &&
		episodes.length > 0 && (
			<section className="episode-list episode-list__section section-wrapper">
				<TextRadioGroup
					sectionName="Episodes"
					defaultValue={selectedEpisodeId}
					onChange={setSelected}
					list={episodes}
					isEpisode={true}
				/>
			</section>
		)
	);
}

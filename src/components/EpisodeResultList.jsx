import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useEpisodesStore } from '../hooks/useEpisodesStore';

export default function EpisodeResultList() {
	const episodes = useEpisodesStore((state) => state.episodes);
	const setSelected = useEpisodesStore(
		(state) => state.setCurrentlySelectedEpisode
	);
	const changeSelected = (event) => {
		setSelected(event.currentKey);
	};
	//Paging for episodes
	return (
		<>
			{episodes && episodes.length > 0 && (
				<section className="episode-list episode-list__section">
					<Heading level="4" className="episode-list__heading">
						Episode List{' '}
					</Heading>
					{!episodes && 'No episodes found'}
					{episodes && (
						<>
							<ListBox
								aria-label="Episodes List"
								selectionMode="single"
								onSelectionChange={changeSelected}
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
						</>
					)}
				</section>
			)}
		</>
	);
}
